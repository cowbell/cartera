import Ember from "ember";
import ItemForm from "cartera/forms/item";

export default Ember.Route.extend({
    model: function () {
        window.STORE = this.store;

        return Ember.RSVP.hash({
            form: ItemForm.create({
                container: this.get("container")
            })
        });
    }
});
