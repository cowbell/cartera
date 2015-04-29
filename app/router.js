import Ember from "ember";
import config from "./config/environment";

var Router = Ember.Router.extend({
    location: config.locationType
});

Router.map(function () {
    this.resource("items", function () {
        this.route("new");
        this.resource("item", { path: "/:asset_id" }, function () {
            this.route("edit");
        });
    });
});

export default Router;
