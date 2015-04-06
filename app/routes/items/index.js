import Ember from "ember";

export default Ember.Route.extend({
    model: function () {
        var query = {
            today: new Date().toISOString().substr(0, 10),
            q: "typ = 'A' AND data_publikacji <= @today | SORT(field='data_publikacji') | TAIL(count=1)"
        };

        return Ember.RSVP.hash({
            model: this.store.find("asset"),
            exchangeRatesTables: this.store.find("exchangeRatesTable", query)
        });
    },

    setupController: function (controller, models) {
        controller.setProperties(models);
    }
});
