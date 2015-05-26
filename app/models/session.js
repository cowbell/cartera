import Ember from "ember";

export default Ember.Object.extend({
    user: null,

    uid: function () {
        return this.get("user").uid;
    }.property("user"),

    email: function () {
        if (this.get("isAnonymous")) {
            return "anonymous";
        } else {
            return this.get("user").password.email;
        }
    }.property("user", "isAnonymous"),

    isAnonymous: function () {
        return this.get("user").auth.provider === "anonymous";
    }.property("user")
});
