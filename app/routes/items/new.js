import Ember from "ember";
import AssetForm from "cartera/forms/asset";

export default Ember.Route.extend({
    model: function () {
        var today = new Date().toISOString().substr(0, 10);

        return Ember.RSVP.hash({
            asset: this.modelFor("asset"),
            form: AssetForm.create({
                container: this.get("container"),
                boughtOn: today
            }),
            assetTypes: this.store.find("assetType", { date: today })
        });
    },

    setupController: function (controller, models) {
        controller.setProperties(models);
    }
});
