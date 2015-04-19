import DS from "ember-data";

export default DS.Model.extend({
    name: DS.attr("string"),
    c_val: DS.attr("number"),
    c_vol: DS.attr("number"),
    change: DS.attr("number"),
    currency: DS.attr("string"),
    high: DS.attr("number"),
    isin: DS.attr("string"),
    low: DS.attr("number"),
    numberOfTrades: DS.attr("number"),
    open: DS.attr("number"),
    price: DS.attr("number")
});
