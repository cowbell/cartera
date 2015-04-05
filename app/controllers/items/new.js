import Ember from "ember";

export default Ember.Controller.extend({
    actions: {
        saveItem: function () {
            var controller = this,
                form = this.get("form");

            form.set("isSubmitted", true);

            form.validate()
                .then(function () {
                    return controller.store.createRecord("item", form.toModel()).save();
                }).then(function () {
                    controller.transitionToRoute("items");
                });
        }
    }
});
