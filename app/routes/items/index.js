import Ember from "ember";

export default Ember.Route.extend({
    model: function () {
        return Ember.RSVP.hash({
            model: this.store.find("asset"),
            rates: this.store.find("rate", {
                q: "SELECT * FROM money.nbp_rates WHERE date = @today",
                today: new Date().toISOString().substr(0, 10)
            })
        });
    },

    setupController: function (controller, models) {
        controller.setProperties(models);
    }
});
