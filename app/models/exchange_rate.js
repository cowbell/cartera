import DS from "ember-data";

export default DS.Model.extend({
    symbol: DS.attr("string"),
    divisor: DS.attr("number"),
    date: DS.attr("string"),
    name: DS.attr("string"),
    average: DS.attr("number")
});
