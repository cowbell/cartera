import DS from "ember-data";

export default DS.Model.extend({
    symbol: DS.attr("string"),
    divisor: DS.attr("number"),
    name: DS.attr("string"),
    average: DS.attr("number"),
    buy: DS.attr("number"),
    sell: DS.attr("number")
});
