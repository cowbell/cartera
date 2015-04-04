import DS from "ember-data";

export default DS.Model.extend({
    uid: DS.attr("string"),
    type: DS.attr("string"),
    number: DS.attr("string"),
    date: DS.attr("string"),
    exchangeRates: DS.hasMany("exchangeRate")
});
