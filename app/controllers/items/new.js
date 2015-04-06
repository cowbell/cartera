import Ember from "ember";

export default Ember.Controller.extend({
    isFetching: true,

    exchangeRatesTables: (function () {
        var boughtOn = this.get("form.boughtOn");

        if (boughtOn) {
            return this.store.find("exchangeRatesTable", { mostRecentOn: boughtOn });
        } else {
            return undefined;
        }
    }).property("form.boughtOn"),

    exchangeRates: Ember.computed.alias("exchangeRatesTables.firstObject.exchangeRates"),

    exchangeRate: (function () {
        var symbol = this.get("form.symbol"),
            exchangeRates = this.get("exchangeRates");

        if (symbol && exchangeRates) {
            return exchangeRates.findBy("symbol", symbol);
        } else {
            return undefined;
        }
    }).property("exchangeRates", "form.symbol"),

    exchangeRateDidChange: (function () {
        if (this.get("isFetching")) {
            this.set("form.boughtPrice", this.get("exchangeRate.average"));
        }
    }).observes("exchangeRate.average", "isFetching"),

    actions: {
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
