import Ember from "ember";

export default Ember.Controller.extend({
    assetTypesDidChange: (function () {
        var assetType,
            symbol = this.get("form.symbol"),
            assetTypes = this.get("assetTypes.content");

        if (symbol && assetTypes) {
            assetType = assetTypes.findBy("symbol", symbol);

            if (assetType) {
                this.set("form.boughtPrice", assetType.get("price"));
            }
        }
    }).observes("assetTypes.content", "form.symbol"),

    actions: {
        fetch: function () {
            var boughtOn = this.get("form.boughtOn");

            if (boughtOn) {
                this.set("assetTypes", this.store.find("assetType", { date: boughtOn }));
            }
        },

        saveAsset: function () {
            var controller = this,
                form = this.get("form");

            form.set("isSubmitted", true);

            form.validate()
                .then(function () {
                    return controller.store.createRecord("asset", form.toModel()).save();
                }).then(function () {
                    controller.transitionToRoute("items");
                });
        }
    }
});
