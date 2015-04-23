import Ember from "ember";

export default Ember.TextField.extend({
    // FIXME: https://github.com/emberjs/ember.js/issues/10908
    didInsertElement: function () {
        this.listNameDidChange();
    },

    listNameDidChange: function () {
        this.$().attr("list", this.get("listName"));
    }.observes("listName")
});
