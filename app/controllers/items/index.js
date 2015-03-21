import Ember from "ember";

export default Ember.ArrayController.extend({
    actions: {
        destroyItem: function (item) {
            item.destroyRecord();
        }
    }
});
