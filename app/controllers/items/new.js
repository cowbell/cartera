import Ember from "ember";

export default Ember.Controller.extend({
    actions: {
        saveItem: function () {
            var item,
                controller = this,
                model = this.get("model");

            item = this.store.createRecord("item", model);

            item.save().then(function () {
                controller.transitionToRoute("items");
            });
        }
    }
});
