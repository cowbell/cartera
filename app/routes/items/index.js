import Ember from "ember";

export default Ember.Route.extend({
    model: function () {
        return Ember.RSVP.hash({
            model: this.store.find("asset"),
            exchangeRatesTables: this.store.find("exchangeRatesTable", { mostRecentOn: new Date().toISOString().substr(0, 10) })
        });
    },

    setupController: function (controller, models) {
        controller.setProperties(models);
    }
});
