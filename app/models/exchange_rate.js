import Ember from "ember";

var ExchangeRate = Ember.Object.extend({
    isLoading: false,
    isError: false
});

ExchangeRate.reopenClass({
    QUERY: "SELECT * FROM nbp.tables WHERE id IN (SELECT id FROM nbp.dir WHERE typ = 'A' AND data_publikacji >= '%@' | SORT(field='data_publikacji') | TRUNCATE(count=1))",

    find: function (issueDate) {
        var model = this.create({ isLoading: true });
        Ember.$.ajax({
            url: "https://query.yahooapis.com/v1/public/yql",
            data: {
                format: "json",
                q: this.QUERY.fmt(issueDate),
                env: "store://datatables.org/alltableswithkeys"
            }
        })
            .then(function (response) {
                if (response.query.results) {
                    return response.query.results.tabela_kursow;
                } else {
                    return Ember.$.Deferred().reject(response);
                }
            })
            .done(function (response) {
                model.setProperties(response);
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
