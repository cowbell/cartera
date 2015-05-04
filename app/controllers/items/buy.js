import Ember from "ember";
import EmberValidations from "ember-validations";

export default Ember.Controller.extend(EmberValidations.Mixin, {
    validations: {
        symbol: {
            presence: {
                if: "isSubmitted"
            }
        },

        quantity: {
            presence: {
                if: "isSubmitted"
            }
        },

        boughtOn: {
            presence: {
                if: "isSubmitted"
            }
        },

        boughtPrice: {
            presence: {
                if: "isSubmitted"
            }
        }
    },

    assetTypesDidChange: function () {
        var assetType = Ember.makeArray(this.get("assetTypes")).findBy("symbol", this.get("symbol"));

        if (assetType) {
            this.set("boughtPrice", assetType.get("price"));
        }
    }.observes("assetTypes.@each", "symbol"),

    actions: {
        fetch: function () {
            if (this.get("boughtOn")) {
                this.set("assetTypes", this.store.find("assetType", { date: this.get("boughtOn") }));
            }
        },

        saveAsset: function () {
            var controller = this,
                properties = this.getProperties("symbol", "quantity", "boughtOn", "boughtPrice");

            this.set("isSubmitted", true);

            this.validate()
                .then(function () {
                    return controller.store.createRecord("asset", properties).save();
                })
                .then(function () {
                    controller.transitionToRoute("items");
                });
        }
    }
});
