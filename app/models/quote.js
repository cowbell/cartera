import DS from "ember-data";

export default DS.Model.extend({
    symbol: DS.attr("string"),
    name: DS.attr("string"),
    ticker: DS.attr("string"),
    date: DS.attr("string"),
    price: DS.attr("number")
});
