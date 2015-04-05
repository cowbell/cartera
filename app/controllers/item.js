import Ember from "ember";

export default Ember.Controller.extend({
    symbol: Ember.computed.alias("model.symbol"),
    date: Ember.computed.alias("model.date"),
    quantity: Ember.computed.alias("model.quantity"),
    price: Ember.computed.alias("model.price"),

    zomg: (function () {
        console.log(this.get("parentController"));
        return this.get("parentController.exchangeRatesTable.id");
    }).property("parentController.exchangeRatesTable.id"),

    value: (function () {
        var price = this.get("model.price"),
            quantity = this.get("model.quantity");

        return Math.round(price * quantity);
    }).property("model.price", "model.quantity")
});
