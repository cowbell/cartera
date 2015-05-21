import Ember from "ember";
import EmberValidations from "ember-validations";
import config from "../config/environment";
import Firebase from "firebase";

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

    emailDidChange: function () {
        this.set("serverError", undefined);
    }.observes("email"),

    actions: {
        signUp: function () {
            var controller = this,
                ref = new Firebase(config.firebase);

            this.set("isSubmitted", true);
            this.validate()
                .then(function () {
                    return new Ember.RSVP.Promise(function (resolve, reject) {
                        ref.createUser(controller.getProperties("email", "password"), function (error, user) {
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
