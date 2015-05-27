import Ember from "ember";

export default Ember.ArrayController.extend({
    needs: ["asset"],
    itemController: "asset",

    sortProperties: ["boughtOn"],
    sortAscending: true,
    soldValues: Ember.computed.mapBy("", "soldValue"),
    soldValue: Ember.computed.sum("soldValues"),
    profits: Ember.computed.mapBy("", "profit"),
    profit: Ember.computed.sum("profits"),

    unsoldAssets: Ember.computed.filterBy("", "isSold", false),
    soldAssets: Ember.computed.filterBy("", "isSold", true),

    isShowingSold: false,

    actions: {
        destroyAsset: function (asset) {
            asset.destroyRecord();
        },

        showSold: function () {
            this.set("isShowingSold", true);
        },

        hideSold: function () {
            this.set("isShowingSold", false);
        }
    }
});
