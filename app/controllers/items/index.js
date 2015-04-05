import Ember from "ember";

export default Ember.ArrayController.extend({
    needs: ["item"],

    itemController: "item",
    sortProperties: ["date"],
    sortAscending: true,
    exchangeRatesTable: Ember.computed.alias("exchangeRatesTables.firstObject"),
    currentValues: Ember.computed.mapBy("", "currentValue"),
    currentValue: Ember.computed.sum("currentValues"),
    gains: Ember.computed.mapBy("", "gain"),
    gain: Ember.computed.sum("gains"),

    actions: {
        destroyItem: function (item) {
            item.destroyRecord();
        }
    }
});
