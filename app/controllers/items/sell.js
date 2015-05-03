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
            },
            numericality: {
                if: "isSubmitted",
                greaterThan: 0,
                lessThanOrEqualTo: "maxQuantity",
                messages: {
                    lessThanOrEqualTo: "must be less than or equal to max quantity"
                }
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

    maxQuantity: function () {
        return this.get("assets")
            .filterBy("symbol", this.get("symbol"))
            .filterBy("isSold", false)
            .reduce(function (result, asset) {
                return result + asset.get("quantity");
            }, 0);
    }.property("symbol"),

    actions: {
        fetch: function () {
            if (this.get("soldOn")) {
                this.set("assetTypes", this.store.find("assetType", { date: this.get("soldOn") }));
            }
        },

        sellAssets: function () {
            var controller = this;

            this.set("isSubmitted", true);
            this.validate()
                .then(function () {
                    var assets = controller.get("assets").sortBy("boughtPrice");

                    
                });
        }
    }
});
