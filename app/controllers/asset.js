import Ember from "ember";

export default Ember.Controller.extend({
    symbol: Ember.computed.alias("model.symbol"),
    quantity: Ember.computed.alias("model.quantity"),
    boughtOn: Ember.computed.alias("model.boughtOn"),
    boughtPrice: Ember.computed.alias("model.boughtPrice"),

    boughtValue: function () {
        var boughtPrice = this.get("model.boughtPrice"),
            quantity = this.get("model.quantity");

        return Math.round(boughtPrice * quantity);
    }.property("model.boughtPrice", "model.quantity"),

    assetType: function () {
        return this.get("parentController.assetTypes").findBy("symbol", this.get("model.symbol"));
    }.property("parentController.assetTypes.@each", "model.symbol"),

    soldPrice: function () {
        return this.get("model.isSold") ? this.get("model.soldPrice") : this.get("assetType.price");
    }.property("model.isSold", "model.soldPrice", "assetType.price"),

    soldValue: function () {
        var soldPrice = this.get("soldPrice"),
            quantity = this.get("model.quantity");

        return Math.round(soldPrice * quantity);
    }.property("model.quantity", "soldPrice"),

    profit: function () {
        return this.get("soldValue") - this.get("boughtValue");
    }.property("soldValue", "boughtValue"),

    isProfit: function () {
        return this.get("profit") > 0;
    }.property("profit"),

    isLoss: function () {
        return this.get("profit") < 0;
    }.property("profit")
});
