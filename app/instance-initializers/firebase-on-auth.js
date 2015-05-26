import Firebase from "firebase";
import config from "../config/environment";

export default {
    name: "firebase-on-auth",

    initialize: function (instance) {
        var ref = new Firebase(config.firebase);

        ref.onAuth(function (auth) {
            var session = instance.container.lookup("session:main");

            session.set("user", auth);
        });
    }
};
