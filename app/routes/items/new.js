import Ember from "ember";
import ItemForm from "cartera/forms/item";

export default Ember.Route.extend({
    model: function () {
        return Ember.RSVP.hash({
            form: ItemForm.create({
                container: this.get("container")
            })
        });
    },

    setupController: function (controller, models) {
        controller.setProperties(models);
    }
});
