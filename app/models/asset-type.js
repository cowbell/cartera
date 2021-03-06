import DS from "ember-data";

export default DS.Model.extend({
    date: DS.attr("day"),
    symbol: DS.attr("string"),
    divisor: DS.attr("number"),
    price: DS.attr("number")
});
