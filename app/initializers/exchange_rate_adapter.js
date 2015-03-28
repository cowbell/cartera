import ExchangeRateAdapter from "cartera/adapters/exchange_rate";

export default {
    name: "generic-adapter",
    initialize: function (container, application) {
        // application.register("adapter:exchange_rate", ExchangeRateAdapter);
        // application.inject("store:main", "adapter", "adapter:exchange_rate");
    }
};
