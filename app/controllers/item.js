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

    currentPrice: (function () {
        var exchangeRate,
            symbol = this.get("symbol");

        exchangeRate = this.get("parentController.exchangeRatesTable.exchangeRates").findBy("symbol", symbol);

        return exchangeRate && exchangeRate.get("average");
    }).property("parentController.exchangeRatesTable.@each", "symbol"),

    currentValue: (function () {
        var currentPrice = this.get("currentPrice"),
            quantity = this.get("model.quantity");

        return Math.round(currentPrice * quantity);
    }).property("model.quantity", "currentPrice"),

    gain: (function () {
        return this.get("currentValue") - this.get("value");
    }).property("value", "currentValue")
});
