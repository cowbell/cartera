import Ember from "ember";

export default Ember.Controller.extend({
    ratesDidChange: (function () {
        var rate,
            symbol = this.get("form.symbol"),
            rates = this.get("rates.content");

        if (symbol && rates) {
            rate = rates.findBy("symbol", symbol);

            if (rate) {
                this.set("form.boughtPrice", rate.get("price"));
            }
        }
    }).observes("rates.content", "form.symbol"),

    actions: {
        fetch: function () {
            var boughtOn = this.get("form.boughtOn");

            if (boughtOn) {
                this.set("rates", this.store.find("rate", {
                    q: "SELECT * FROM money.nbp_rates WHERE date = @date",
                    date: boughtOn
                }));
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
