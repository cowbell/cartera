import Ember from "ember";
import ajax from "ic-ajax";

export default Ember.Object.extend({
    find: function(item, type, id) {
        var q, date, symbol;

        date = id.toString().substr(0, 10);
        symbol = id.toString().substr(11);

        q = `SELECT * FROM nbp.tables WHERE id IN (SELECT id FROM nbp.dir WHERE typ = 'A' AND data_publikacji <= '${date}' | SORT(field='data_publikacji') | TAIL(count=1))`;

        return ajax({
            url: "https://query.yahooapis.com/v1/public/yql",
            cache: true,
            data: {
                format: "json",
                q: q,
                env: "store://datatables.org/alltableswithkeys"
            }
        }).then(function (response) {
            var pozycja = response.query.results.tabela_kursow.pozycja.find(function (pozycja) {
                return pozycja.kod_waluty === symbol;
            });

            return {
                id: id,
                date: response.query.results.tabela_kursow.data_publikacji,
                symbol: pozycja.kod_waluty,
                divisor: parseInt(pozycja.przelicznik, 10),
                name: pozycja.nazwa_waluty,
                average: parseFloat(pozycja.kurs_sredni.replace(",", "."))
            };
        });
    }
});
