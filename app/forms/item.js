import Ember from "ember";
import EmberValidations from "ember-validations";

export default Ember.Object.extend(EmberValidations.Mixin, {
    validations: {
        name: {
            presence: {
                if: "isSubmitted"
            }
        },
        date: {
            presence: {
                if: "isSubmitted"
            }
        },
        amount: {
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
        return this.getProperties("name", "date", "amount", "price");
    }
});
