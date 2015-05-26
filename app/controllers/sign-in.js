import Ember from "ember";
import EmberValidations from "ember-validations";

export default Ember.Controller.extend(EmberValidations.Mixin, {
    validations: {
        email: {
            presence: {
                if: "isSubmitted"
            }
        },

        password: {
            presence: {
                if: "isSubmitted"
            }
        }
    },

    emailOrPasswordDidChange: function () {
        this.set("serverError", undefined);
    }.observes("email", "password"),

    actions: {
        signUp: function () {
            var controller = this,
                properties = this.getProperties("email", "password"),
                ref = this.store.adapterFor("application").get("firebase");

            this.setProperties({
                isSubmitted: true,
                serverError: undefined
            });

            this.validate()
                .then(function () {
                    return new Ember.RSVP.Promise(function (resolve, reject) {
                        ref.authWithPassword(properties, function (error, user) {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(user);
                            }
                        });
                    });
                })
                .then(function () {
                    controller.transitionToRoute("index");
                }, function (error) {
                    controller.set("serverError", error);
                });
        }
    }
});
