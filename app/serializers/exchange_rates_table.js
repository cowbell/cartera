import Ember from "ember";
import DS from "ember-data";

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
    attrs: {
        exchangeRates: { embedded: "always" }
    },

    normalizePayload: function (payload) {
        var results, exchangeRatesTables;

        results = Ember.makeArray(payload.query.results && payload.query.results.tabela_kursow);

        exchangeRatesTables = results.map(function (result) {
            return {
                id: result.data_publikacji,
                uid: result.uid,
                type: result.typ,
                number: result.numer_tabeli,
                date: result.data_publikacji,
                exchangeRates: result.pozycja.map(function (pozycja) {
                    return {
                        id: `${result.data_publikacji}-${pozycja.kod_waluty}`,
                        symbol: pozycja.kod_waluty,
                        divisor: parseInt(pozycja.przelicznik, 10),
                        name: pozycja.nazwa_waluty,
                        average: parseFloat(pozycja.kurs_sredni.replace(",", "."))
                    };
                })
            };
        });

        return {exchangeRatesTables};
    }
});
