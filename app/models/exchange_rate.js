import Ember from "ember";

var ExchangeRate = Ember.Object.extend({
    isLoading: false,
    isError: false
});

ExchangeRate.reopenClass({
    find: function (date, code) {
        var query,
            model = this.create({ isLoading: true });

        query = `SELECT * FROM nbp.tables WHERE id IN (SELECT id FROM nbp.dir WHERE typ = 'A' AND data_publikacji <= '${date}' | SORT(field='data_publikacji') | TAIL(count=1))`;

        Ember.$.ajax({
            url: "https://query.yahooapis.com/v1/public/yql",
            data: {
                format: "json",
                q: query,
                env: "store://datatables.org/alltableswithkeys"
            }
        })
            .then(function (response) {
                if (response.query.results) {
                    return response.query.results.tabela_kursow.pozycja.find(function (pozycja) {
                        return pozycja.kod_waluty === code;
                    });
                } else {
                    return Ember.$.Deferred().reject(response);
                }
            })
            .done(function (pozycja) {
                model.setProperties({
                    name: pozycja.nazwa_waluty,
                    divisor: parseInt(pozycja.przelicznik, 10),
                    code: pozycja.kod_waluty,
                    average: parseFloat(pozycja.kurs_sredni.replace(",", "."))
                });
            })
            .fail(function () {
                model.set("isError", true);
            })
            .always(function () {
                model.set("isLoading", false);
            });

        return model;
    }
});

export default ExchangeRate;
