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

    isSubmitted: false,

    assetTypesDidChange: function () {
        var assetType = Ember.makeArray(this.get("assetTypes")).findBy("symbol", this.get("symbol"));

        if (assetType) {
            this.set("soldPrice", assetType.get("price"));
        }
    }.observes("assetTypes.@each", "symbol"),

    actions: {
        fetch: function () {
            if (this.get("soldOn")) {
                this.set("assetTypes", this.store.find("assetType", { date: this.get("soldOn") }));
            }
        }
    }
});
