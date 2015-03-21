import Ember from "ember";
import EmberValidations from "ember-validations";

export default Ember.Object.extend(EmberValidations.Mixin, {
    validations: {
        name: {
            presence: true
        }
    },

    toModel: function () {
        return this.getProperties("name");
    }
});
