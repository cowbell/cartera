import Ember from "ember";
import DS from "ember-data";

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
    attrs: {
        quotes: { embedded: "always" }
    },

    normalizePayload: function (payload) {
        var quotesTables = Ember.makeArray(payload).map(function (result) {
            return {
                id: result.id,
                date: result.date,
                type: result.type,
                quotes: result.quotes.map(function (quote) {
                    return {
                        id: `${result.date}-${quote.isin}`,
                        c_val: quote.c_val,
                        c_vol: quote.c_vol,
                        change: quote.change,
                        currency: quote.currency,
                        date: result.date,
                        high: quote.high,
                        isin: quote.isin,
                        low: quote.low,
                        name: quote.name,
                        numberOfTrades: quote.number_of_trades,
                        open: quote.open,
                        price: quote.price
                    };
                })
            };
        });

        return {quotesTables};
    }
});
