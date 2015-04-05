import Ember from "ember";

export default Ember.ArrayController.extend({
    sortProperties: ["date"],
    sortAscending: true,
    exchangeRatesTable: Ember.computed.alias("exchangeRatesTables.firstObject"),

    actions: {
        destroyItem: function (item) {
            item.destroyRecord();
        }
    }
});
