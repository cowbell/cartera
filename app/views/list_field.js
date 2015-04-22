import Ember from "ember";

export default Ember.TextField.extend({
    type: null,

    didInsertElement: function () {
        this.listDidChange();
    },

    listDidChange: (function () {
        this.$().attr("list", this.get("list"));
    }).observes("list")
});
