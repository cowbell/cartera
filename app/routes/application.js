import Ember from "ember";

export default Ember.Route.extend({
    actions: {
        signOut: function () {
            var route = this,
                ref = this.store.adapterFor("application").get("firebase");

            ref.authAnonymously(function (error) {
                if (error) {
                    throw error;
                }

                route.store.init();
                route.transitionTo("index");
            });
        }
    }
});
