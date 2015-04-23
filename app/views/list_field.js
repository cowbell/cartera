import Ember from "ember";

export default Ember.TextField.extend({
    didInsertElement: function () {
        this.listDidChange();
    },

    listDidChange: (function () {
        this.$().attr("list", this.get("list"));
    }).observes("list")
});
