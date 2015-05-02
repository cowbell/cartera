import Ember from "ember";
import EmberValidations from "ember-validations";

export default Ember.Controller.extend(EmberValidations.Mixin, {
    quantity: Ember.computed.oneWay("asset.quantity"),

    isSubmitted: false,

    assetTypesDidChange: function () {
        var assetType = Ember.makeArray(this.get("assetTypes")).findBy("symbol", this.get("asset.symbol"));

        if (assetType) {
            this.set("soldPrice", assetType.get("price"));
        }
    }.observes("assetTypes.@each"),

    validations: {
        quantity: {
            presence: {
                if: "isSubmitted"
            }
        },

        soldOn: {
            presence: {
                if: "isSubmitted"
            }
        },

        soldPrice: {
            presence: {
                if: "isSubmitted"
            }
        }
    },

    actions: {
        fetch: function () {
            if (this.get("soldOn")) {
                this.set("assetTypes", this.store.find("assetType", { date: this.get("soldOn") }));
            }
        }

        // destroyAsset: function () {
        //     this.get("asset").destroyRecord();
        //     this.transitionToRoute("items");
        // }
    }
});
