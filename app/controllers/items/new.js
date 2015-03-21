import Ember from "ember";
// import ExchangeRate from "cartera/models/exchange_rate";

export default Ember.Controller.extend({
    form: Ember.computed.alias("model.form"),

    // exchangeRate: (function () {
    //     var date = this.get("form.date");

    //     return ExchangeRate.find(date);
    // }).property("form.name", "form.date"),

    actions: {
        saveItem: function () {
            var controller = this,
                form = this.get("form");

            form.set("isSubmitted", true);

            form.validate().then(function () {
                return controller.store.createRecord("item", form.toModel()).save();
            }).then(function () {
                controller.transitionToRoute("items");
            });
        }
    }
});
