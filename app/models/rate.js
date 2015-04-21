import DS from "ember-data";

export default DS.Model.extend({
    date: DS.attr("string"),
    symbol: DS.attr("string"),
    divisor: DS.attr("number"),
    buy: DS.attr("number"),
    sell: DS.attr("number"),
    price: (function () {
        return (this.get("buy") + this.get("sell")) / 2;
    }).property("buy", "sell")
});
