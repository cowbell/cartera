import Ember from "ember";
import ItemForm from "cartera/forms/item";

export default Ember.Route.extend({
    model: function () {
        window.STORE = this.store;

        return Ember.RSVP.hash({
            form: ItemForm.create({
                container: this.get("container")
            }),
            exchange_rate: this.store.find("exchange_rate", "2015-03-28-EUR")
        });
    }
});
