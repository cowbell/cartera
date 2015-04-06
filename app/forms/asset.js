import Ember from "ember";
import EmberValidations from "ember-validations";

export default Ember.Object.extend(EmberValidations.Mixin, {
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

    isSubmitted: false,

    toModel: function () {
        return this.getProperties("symbol", "quantity", "boughtOn", "boughtPrice", "soldOn", "soldPrice");
    }
});
