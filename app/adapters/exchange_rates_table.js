import Ember from "ember";
import ajax from "ic-ajax";

export default Ember.Object.extend({
    yql: function (query, variables) {
        return ajax({
            url: "https://query.yahooapis.com/v1/public/yql",
            cache: true,
            data: Ember.merge({
                format: "json",
                q: query,
                env: "store://datatables.org/alltableswithkeys"
            }, variables)
        });
    },

    find: function (store, type, id) {
        return this.yql("SELECT * FROM nbp.tables WHERE id IN (SELECT id FROM nbp.dir WHERE typ = @type AND data_publikacji = @date)", {
            date: id.substr(0, 10),
            type: id.substr(11)
        }).then(function (response) {
            if (response.query.results) {
                return response.query.results;
            } else {
                return Ember.RSVP.reject();
            }
        });
    },

    findQuery: function (store, type, query) {
        return this.yql(`SELECT * FROM nbp.tables WHERE id IN (SELECT id FROM nbp.dir WHERE ${query})`).then(function (response) {
            if (response.query.results) {
                return response.query.results;
            } else {
                return [];
            }
        });
    }
});
