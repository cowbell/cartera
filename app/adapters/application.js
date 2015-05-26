import config from "../config/environment";
import Firebase from "firebase";
import FirebaseAdapter from "emberfire/adapters/firebase";

export default FirebaseAdapter.extend({
    session: function () {
        return this.container.lookup("session:main");
    }.property(),

    firebase: new Firebase(config.firebase),
    // firebase: function () {
    //     return new Firebase(config.firebase);
    // }.property("session.uid"),

    sessionUidDidChange: function () {
        console.log(this.get("session.uid"));
    }.observes("session.uid")
});
