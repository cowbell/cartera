import Ember from "ember";

export default Ember.Object.extend({
    user: null,

    uid: function () {
        return this.get("user").uid;
    }.property("user")
});
