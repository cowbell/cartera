import DS from "ember-data";

export default DS.Model.extend({
    name: DS.attr("string"),
    date: DS.attr("string"),
    amount: DS.attr("number"),
    price: DS.attr("number")
});
