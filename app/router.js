import Ember from "ember";
import config from "./config/environment";

var Router = Ember.Router.extend({
    location: config.locationType
});

Router.map(function () {
    this.resource("items", function () {
        this.route("buy");
        this.route("sell");
        this.resource("item", { path: "/:asset_id" }, function () {
            this.route("sell");
        });
    });
});

export default Router;
