/* eslint-disable import/no-mutable-exports */
import BASE_URL, { MIXPANEL_KEY } from "./constants";

let url;
let environment;
let mixpanelKey;

if (window.location.href.includes("localhost")) {
  environment = "dev";
  mixpanelKey = MIXPANEL_KEY.dev;
  url = BASE_URL.dev;
} else if (window.location.href.includes("http://dev-api.myfurward.com")) {
  environment = "staging";
  mixpanelKey = MIXPANEL_KEY.staging;
  url = BASE_URL.staging;
} else {
  mixpanelKey = MIXPANEL_KEY.production;
  environment = "production";
  url = BASE_URL.production;
}
export default url;

export { environment, mixpanelKey };
