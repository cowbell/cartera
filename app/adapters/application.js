/*global Firebase*/

import DS from "ember-data";
import config from "../config/environment";

var url = config.APP.FIREBASE_URL,
    ref = new Firebase(url);

export default DS.FirebaseAdapter.extend({
    firebase: ref.child(ref.getAuth().uid)
});
