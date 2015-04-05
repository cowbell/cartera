import Ember from "ember";

export default Ember.Route.extend({
    model: function () {
        var q, today;

        today = new Date().toISOString().substr(0, 10);
        q = "typ = 'A' AND data_publikacji <= @today | SORT(field='data_publikacji') | TAIL(count=1)";

        return Ember.RSVP.hash({
            model: this.store.find("item"),
            exchangeRatesTable: this.store.find("exchangeRatesTable", { q, today })
        });
    },

    setupController: function (controller, models) {
        controller.setProperties(models);
    }
});
