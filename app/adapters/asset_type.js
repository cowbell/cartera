import Ember from "ember";
import ajax from "ic-ajax";

export default Ember.Object.extend({
    cache: {},

    yql: function (query) {
        var cacheKey,
            cache = this.get("cache");

        cacheKey = JSON.stringify(query);

        if (cache[cacheKey]) {
            return Ember.RSVP.resolve(cache[cacheKey]);
        } else {
            return ajax({
                url: "https://query.yahooapis.com/v1/public/yql",
                data: Ember.merge({
                    format: "json",
                    env: "https://cartera.firebaseapp.com/yql/cartera.env"
                }, query)
            }).then(function (result) {
                return cache[cacheKey] = result;
            });
        }
    },

    findQuery: function (store, type, query) {
        if (query.date) {
            query.q = `SELECT * FROM yql.query.multi WHERE queries = "SELECT * FROM money.nbp_rates WHERE date = '${query.date}'; SELECT * FROM money.gpw_quotes WHERE date = '${query.date}'";`;
        }

        return this.yql(query).then(function (response) {
            if (response.query.results) {
                if (response.query.results.results) {
                    var assetTypes = [];

                    response.query.results.results.forEach(function (result) {
                        assetTypes = assetTypes.concat(result.assetTypes);
                    });

                    return {assetTypes};
                } else {
                    return response.query.results;
                }
            } else {
                return [];
            }
        });
    }
});
