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
        },

        soldOn: {
            presence: {
                if: function (controller) {
                    return controller.get("isSubmitted") && controller.get("soldPrice");
                }
            }
        },

        soldPrice: {
            presence: {
                if: function (controller) {
                    return controller.get("isSubmitted") && controller.get("soldOn");
                }
            }
        }
    },

    actions: {
        destroyAsset: function () {
            var controller = this;

            this.get("asset").destroyRecord()
                .then(function () {
                    controller.transitionToRoute("items");
                });
        },

        saveAsset: function () {
            var controller = this,
                properties = this.getProperties("symbol", "quantity", "boughtOn", "boughtPrice", "soldOn", "soldPrice");

            this.set("isSubmitted", true);

            this.validate()
                .then(function () {
                    return controller.get("asset").setProperties(properties).save();
                })
                .then(function () {
                    controller.transitionToRoute("items");
                });
        }
    }
});
