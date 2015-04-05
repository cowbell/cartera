import Ember from "ember";
import DS from "ember-data";

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
    attrs: {
        exchangeRates: { embedded: "always" }
    },

    normalizePayload: function (payload) {
        var exchangeRatesTables = Ember.makeArray(payload.tabela_kursow).map(function (result) {
            return {
                id: `${result.data_publikacji}-${result.typ}`,
                uid: result.uid,
                type: result.typ,
                number: result.numer_tabeli,
                date: result.data_publikacji,
                exchangeRates: result.pozycja.map(function (pozycja) {
                    return {
                        id: `${result.data_publikacji}-${result.typ}-${pozycja.kod_waluty || pozycja.symbol_waluty}`,
                        symbol: pozycja.kod_waluty || pozycja.symbol_waluty,
                        divisor: parseInt(pozycja.przelicznik, 10),
                        name: pozycja.nazwa_waluty,
                        sell: parseFloat(String(pozycja.kurs_sprzedazy).replace(",", ".")),
                        buy: parseFloat(String(pozycja.kurs_kupna).replace(",", ".")),
                        average: parseFloat(String(pozycja.kurs_sredni).replace(",", "."))
                    };
                })
            };
        });

        return {exchangeRatesTables};
    }
});
