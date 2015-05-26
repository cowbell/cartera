import Firebase from "firebase";
import config from "../config/environment";

export default {
    name: "firebase-ref",

    initialize: function (registry, application) {
        var ref = new Firebase(config.firebase);

        application.register("firebase:main", ref, { instantiate: false });
        application.inject("controller", "firebase", "firebase:main");
    }
};
