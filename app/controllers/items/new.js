import Ember from "ember";

export default Ember.Controller.extend({
    exchangeRates: Ember.computed.alias("exchangeRatesTables.firstObject.exchangeRates"),

    exchangeRatesDidChange: (function () {
        var exchangeRate,
            symbol = this.get("form.symbol"),
            exchangeRates = this.get("exchangeRates");

        if (symbol && exchangeRates) {
            exchangeRate = exchangeRates.findBy("symbol", symbol);

            this.set("form.boughtPrice", exchangeRate.get("average"));
        }
    }).observes("exchangeRates", "form.symbol"),

    actions: {
        fetch: function () {
            var boughtOn = this.get("form.boughtOn");

            if (boughtOn) {
                this.set("exchangeRatesTables", this.store.find("exchangeRatesTable", { mostRecentOn: boughtOn }));
            }
        },

        saveAsset: function () {
            var controller = this,
                form = this.get("form");

            form.set("isSubmitted", true);

            form.validate()
                .then(function () {
                    return controller.store.createRecord("asset", form.toModel()).save();
                }).then(function () {
                    controller.transitionToRoute("items");
                });
        }
    }
});
