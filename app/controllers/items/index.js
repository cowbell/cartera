import Ember from "ember";

export default Ember.ArrayController.extend({
    needs: ["asset"],
    itemController: "asset",

    sortProperties: ["boughtOn"],
    sortAscending: true,
    exchangeRatesTable: Ember.computed.alias("exchangeRatesTables.firstObject"),
    soldValues: Ember.computed.mapBy("", "soldValue"),
    soldValue: Ember.computed.sum("soldValues"),
    profits: Ember.computed.mapBy("", "profit"),
    profit: Ember.computed.sum("profits"),

    actions: {
        destroyAsset: function (asset) {
            asset.destroyRecord();
        }
    }
});
