import Ember from "ember";

export default Ember.Object.extend({
    user: null,

    uid: function () {
        return this.get("user").uid;
    }.property("user"),

    email: function () {
        if (this.get("isAnonymous")) {
            return undefined;
        } else {
            return this.get("user").password.email;
        }
    }.property("user", "isAnonymous"),

    emailMD5: function () {
        return md5(this.getWithDefault("email", ""));
    }.property("email"),

    gravatarURL: function () {
        return "//www.gravatar.com/avatar/" + this.get("emailMD5") + "?d=mm";
    }.property("emailMD5"),

    isAnonymous: function () {
        return this.get("user").auth.provider === "anonymous";
    }.property("user")
});
