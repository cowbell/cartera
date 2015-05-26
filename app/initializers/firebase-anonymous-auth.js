import Firebase from "firebase";
import config from "../config/environment";

export default {
    name: "firebase-anonymous-auth",

    initialize: function (registry, application) {
        var ref = new Firebase(config.firebase);

        if (!ref.getAuth()) {
            application.deferReadiness();

            ref.authAnonymously(function (error) {
                if (error) {
                    throw error;
                }

                application.advanceReadiness();
            });
        }
    }
};
