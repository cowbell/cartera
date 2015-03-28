import Ember from "ember";
import EmberValidations from "ember-validations";

export default Ember.Object.extend(EmberValidations.Mixin, {
    validations: {
        symbol: {
            presence: {
                if: "isSubmitted"
            }
        },
        date: {
            presence: {
                if: "isSubmitted"
            }
        },
        quantity: {
            presence: {
                if: "isSubmitted"
            }
        },
        price: {
            presence: {
                if: "isSubmitted"
            }
        }
    },

    isSubmitted: false,

    toModel: function () {
        return this.getProperties("symbol", "date", "quantity", "price");
    }
});
