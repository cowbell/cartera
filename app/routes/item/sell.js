import Ember from "ember";

export default Ember.Route.extend({
    model: function () {
        var today = new Date().toISOString().substr(0, 10);

        return Ember.RSVP.hash({
            isSubmitted: false,
            errors: {},
            asset: this.modelFor("item"),
            assetTypes: this.store.find("assetType", { date: today }),
            soldOn: today
        });
    },

    setupController: function (controller, models) {
        controller.setProperties(models);
    }
});
