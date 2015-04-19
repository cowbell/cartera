import Ember from "ember";
import ajax from "ic-ajax";

export default Ember.Object.extend({
    yql: function (query) {
        return ajax({
            url: "https://query.yahooapis.com/v1/public/yql",
            cache: true,
            data: Ember.merge({ format: "json" }, query)
        });
    },

    find: function (store, _, id) {
        var date = id.substr(0, 10),
            type = id.substr(11);

        return this.yql({
            q: "USE 'store://voBhSCQtIC1LHtT40bie07' as gpw.quotes; SELECT * FROM gpw.quotes WHERE type = @type AND date = @date",
            date: date,
            type: type
        }).then(function (response) {
            if (response.query.results) {
                return {
                    id: id,
                    date: date,
                    type: type,
                    quotes: response.query.results.quotes
                };
            } else {
                return Ember.RSVP.reject();
            }
        });
    }
});
