import Ember from "ember";
import Session from "cartera/models/session";

export default {
    name: "session",

    initialize: function (registry, application) {
        application.register("session:main", Session);
        application.inject("controller", "session", "session:main");
        application.inject("route", "session", "session:main");
    }
};
