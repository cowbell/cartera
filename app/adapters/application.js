import config from "../config/environment";
import Firebase from "firebase";
import FirebaseAdapter from "emberfire/adapters/firebase";

export default FirebaseAdapter.extend({
    firebase: function () {
        var ref = new Firebase(config.firebase),
            uid = ref.getAuth().uid;

        return uid ? ref.child(uid) : ref;
    }.property().volatile(),

    _getRef: function (type, id) {
        this._ref = this.get("firebase").ref();
        return this._super.apply(this, arguments);
    }
});
