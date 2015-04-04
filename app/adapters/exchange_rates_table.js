import Ember from "ember";
import ajax from "ic-ajax";

export default Ember.Object.extend({
    find: function(store, type, id) {
        var q;

        // q = `SELECT * FROM nbp.tables WHERE id IN (SELECT id FROM nbp.dir WHERE typ = 'A' AND data_publikacji <= '${id}' | SORT(field='data_publikacji') | TAIL(count=1))`;
        q = `SELECT * FROM nbp.tables WHERE id IN (SELECT id FROM nbp.dir WHERE typ = 'A' AND data_publikacji = '${id}')`;

        return ajax({
            url: "https://query.yahooapis.com/v1/public/yql",
            cache: true,
            data: {
                format: "json",
                q: q,
                env: "store://datatables.org/alltableswithkeys"
            }
        });
    },

    findQuery: function (store, type, query) {

    }
});
