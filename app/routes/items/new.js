import Ember from "ember";
import AssetForm from "cartera/forms/asset";

export default Ember.Route.extend({
    model: function () {
        var today = new Date().toISOString().substr(0, 10);

        return Ember.RSVP.hash({
            form: AssetForm.create({
                boughtOn: today,
                container: this.get("container")
            }),
            assetTypes: this.store.find("assetType", { date: today })
        });
    },

    setupController: function (controller, models) {
        controller.setProperties(models);
        window.STORE = this.store;
    }
});
