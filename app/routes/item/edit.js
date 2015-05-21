import Ember from "ember";

export default Ember.Route.extend({
    model: function () {
        return Ember.RSVP.hash({
            asset: this.modelFor("item"),
            isSubmitted: false,
            errors: {}
        });
    },

    setupController: function (controller, models) {
        controller.setProperties(models);
        controller.setProperties(models.asset.getProperties("symbol", "quantity", "boughtPrice", "boughtOn", "soldPrice", "soldOn"));
    }
});
