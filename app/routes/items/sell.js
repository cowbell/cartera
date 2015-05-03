import Ember from "ember";

export default Ember.Route.extend({
    model: function () {
        var today = new Date().toISOString().substr(0, 10);

        return Ember.RSVP.hash({
            assets: this.store.find("asset"),
            soldOn: today,
            assetTypes: this.store.find("assetType", { date: today })
        });
    },

    setupController: function (controller, models) {
        controller.setProperties(models);
    }
});
