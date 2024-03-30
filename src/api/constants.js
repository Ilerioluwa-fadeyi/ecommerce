const BASE_URL = {
  production: "https://dev-api.myfurward.com",
  staging: "https://dev-api.myfurward.com",
  dev: "http://18.116.87.67:8000",
};
  
export const MIXPANEL_KEY = {
  dev: process.env.REACT_APP_MIXPANEL_KEY_DEV,
  staging: process.env.REACT_APP_MIXPANEL_KEY_STAGING,
  production: process.env.REACT_APP_MIXPANEL_KEY_PRODUCTION
};
  
export default BASE_URL;