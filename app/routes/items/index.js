import Ember from "ember";

export default Ember.Route.extend({
    model: function () {
        var today = new Date().toISOString().substr(0, 10);

        return Ember.RSVP.hash({
            model: this.store.find("asset"),
            rates: this.store.find("rate", {
                q: "SELECT * FROM money.nbp_rates WHERE date = @today",
                today: today
            })
        });
    },

    setupController: function (controller, models) {
        controller.setProperties(models);
    }
});
