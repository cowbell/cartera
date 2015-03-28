import Ember from "ember";

export default Ember.Object.extend({
    find: function(type, id) {
        return this.adapter.find(type, id);
    }
});
