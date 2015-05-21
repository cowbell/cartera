import DS from "ember-data";

export default DS.Model.extend({
    symbol: DS.attr("string"),
    quantity: DS.attr("number"),
    boughtOn: DS.attr("day"),
    boughtPrice: DS.attr("number"),
    soldOn: DS.attr("day"),
    soldPrice: DS.attr("number"),

    isSold: function () {
        return !isNaN(this.get("soldPrice"));
    }.property("soldPrice")
});
