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

    find: function (store, type, id) {
        return this.yql({
            q: `USE 'store://voBhSCQtIC1LHtT40bie07' AS gpw.quotes;
                SELECT * FROM gpw.quotes WHERE type IN ('10', '13', '241') AND date = @date`,
            date: id
        }).then(function (response) {
            if (response.query.results) {
                return {
                    id: id,
                    date: id,
                    quotes: response.query.results.quotes
                };
            } else {
                return Ember.RSVP.reject();
            }
        });
    },

    findQuery: function (store, type, query) {
        if (query.mostRecentOn) {
            query.q = "date <= @mostRecentOn | SORT(field='date') | TAIL(count=1)";
        }

        return this.yql(Ember.merge(query, {
            q: `USE "store://CdHaTWxWSo2a8r7CqMbdGR" AS gpw.dir;
                USE 'store://voBhSCQtIC1LHtT40bie07' AS gpw.quotes;
                SELECT * FROM gpw.quotes WHERE type IN ('10', '13', '241') AND date IN (SELECT date FROM gpw.dir WHERE ${query.q})`
        })).then(function (response) {
            if (response.query.results) {
                return {
                    id: response.query.results.quotes[0].date,
                    date: response.query.results.quotes[0].date,
                    quotes: response.query.results.quotes
                };
            } else {
                return [];
            }
        });
    }
});
