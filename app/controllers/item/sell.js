import Ember from "ember";
import EmberValidations from "ember-validations";

export default Ember.Controller.extend(EmberValidations.Mixin, {
    isSubmitted: false,

    assetTypesDidChange: function () {
        var assetType = Ember.makeArray(this.get("assetTypes")).findBy("symbol", this.get("asset.symbol"));

        if (assetType) {
            this.set("soldPrice", assetType.get("price"));
        }
    }.observes("assetTypes.@each"),

    assetQuantityDidChange: function () {
        this.set("quantity", this.get("asset.quantity"));
    }.observes("asset.quantity"),

    validations: {
        quantity: {
            presence: {
                if: "isSubmitted"
            },
            numericality: {
                if: "isSubmitted",
                greaterThan: 0,
                lessThanOrEqualTo: "asset.quantity",
                messages: {
                    lessThanOrEqualTo: "must be less than or equal to bought quantity"
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

    actions: {
        fetch: function () {
            if (this.get("soldOn")) {
                this.set("assetTypes", this.store.find("assetType", { date: this.get("soldOn") }));
            }
        },

        saveAsset: function () {
            var properties,
                controller = this,
                asset = this.get("asset");

            controller.set("isSubmitted", true);
            properties = controller.getProperties("soldOn", "soldPrice", "quantity");

            this.validate()
                .then(function () {
                    var remainingProperties = asset.getProperties("symbol", "boughtOn", "boughtPrice");

                    remainingProperties.quantity = asset.get("quantity") - properties.quantity;

                    if (remainingProperties.quantity > 0) {
                        return controller.store.createRecord("asset", remainingProperties).save();
                    } else {
                        return Ember.RSVP.resolve();
                    }
                })
                .then(function () {
                    return asset.setProperties(properties).save();
                })
                .then(function () {
                    controller.transitionToRoute("items");
                });
        }
    }
});
