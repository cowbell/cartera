import Ember from "ember";
import AssetForm from "cartera/forms/asset";

export default Ember.Route.extend({
    model: function () {
        return Ember.RSVP.hash({
            asset: this.modelFor("asset"),
            form: AssetForm.create({
                container: this.get("container")
            })
        });
    },

    setupController: function (controller, models) {
        controller.setProperties(models);
    }
});