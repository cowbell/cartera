import Ember from "ember";

export default Ember.Controller.extend({
    form: Ember.computed.alias("model.form"),

    actions: {
        saveItem: function () {
            var controller = this,
                form = this.get("form");

            form.validate().then(function () {
                return controller.store.createRecord("item", form.toModel()).save();
            }).then(function () {
                controller.transitionToRoute("items");
            });
        }
    }
});
