import DS from "ember-data";

export default DS.Model.extend({
    name: DS.attr("string"),
    date: DS.attr("string"),
    quantity: DS.attr("number"),
    price: DS.attr("number")
});
