import Ember from "ember";

export default Ember.Route.extend({
    model: function () {
        return Ember.RSVP.hash({
            email: undefined,
            password: undefined,
            isSubmitted: false,
            errors: {},
            serverError: undefined
        });
    },

    setupController: function (controller, models) {
        controller.setProperties(models);
    }
});
