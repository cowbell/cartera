import Ember from "ember";
import ajax from "ic-ajax";

export default Ember.Object.extend({
    yql: function (query) {
        return ajax({
            url: "https://query.yahooapis.com/v1/public/yql",
            cache: true,
            data: Ember.merge({
                format: "json",
                env: "https://cartera.firebaseapp.com/yql/cartera.env"
            }, query)
        });
    },

    findQuery: function (store, type, query) {
        return this.yql(query).then(function (response) {
            if (response.query.results) {
                return response.query.results;
            } else {
                return [];
            }
        });
    }
});
