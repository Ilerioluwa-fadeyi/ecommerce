const BASE_URL = {
  production: "http://127.0.0.1:8000",
  staging: "http://127.0.0.1:8000",
  dev: "http://127.0.0.1:8000",
};
  
export const MIXPANEL_KEY = {
  dev: process.env.REACT_APP_MIXPANEL_KEY_DEV,
  staging: process.env.REACT_APP_MIXPANEL_KEY_STAGING,
  production: process.env.REACT_APP_MIXPANEL_KEY_PRODUCTION
};
  
export default BASE_URL;