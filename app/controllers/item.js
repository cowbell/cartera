import Ember from "ember";

export default Ember.Controller.extend({
    symbol: Ember.computed.alias("model.symbol"),
    date: Ember.computed.alias("model.date"),
    quantity: Ember.computed.alias("model.quantity"),
    price: Ember.computed.alias("model.price"),

    value: (function () {
        var price = this.get("model.price"),
            quantity = this.get("model.quantity");

        return Math.round(price * quantity);
    }).property("model.price", "model.quantity"),

    exchangeRate: (function () {
        return this.get("parentController.exchangeRatesTable.exchangeRates").findBy("symbol", this.get("symbol"));
    }).property("parentController.exchangeRatesTable.@each", "symbol"),

    name: Ember.computed.alias("exchangeRate.name"),

    currentPrice: Ember.computed.alias("exchangeRate.average"),

    currentValue: (function () {
        var currentPrice = this.get("currentPrice"),
            quantity = this.get("model.quantity");

        return Math.round(currentPrice * quantity);
    }).property("model.quantity", "currentPrice"),

    gain: (function () {
        return this.get("currentValue") - this.get("value");
    }).property("value", "currentValue"),

    isGain: (function () {
        return this.get("gain") > 0;
    }).property("gain"),

    isLoss: (function () {
        return this.get("gain") < 0;
    }).property("gain")
});
