import Ember from "ember";

export default Ember.ObjectController.extend({
    value: (function () {
        var price = this.get("price"),
            quantity = this.get("quantity");

        return Math.round(price * quantity);
    }).property("price", "quantity")
});
