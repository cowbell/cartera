import DS from "ember-data";

export default DS.Transform.extend({
    deserialize: function (serialized) {
        if (serialized) {
            return serialized;
        } else {
            return undefined;
        }
    },

    serialize: function (deserialized) {
        if (/^\d{4}-\d{2}-\d{2}$/.test(deserialized)) {
            return deserialized;
        } else {
            return null;
        }
    }
});
