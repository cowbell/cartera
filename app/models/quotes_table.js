import DS from "ember-data";

export default DS.Model.extend({
    type: DS.attr("string"),
    date: DS.attr("string"),
    quotes: DS.hasMany("quote")
});
