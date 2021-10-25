import * as apis from "./api";
import * as routes from "./route";

export const ROUTE_NAMES = {
  ...routes,
};
export const API_URL = {
  ...apis,
};

export const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const DEFAULT_LATLNG = {
  latitude: 21.05113180001943,
  longitude: 105.82025917733947,
};
export const AUTH_TOKEN = "AuthToken";
export const USER_PROFILE = "UserProfile";
export const USER_ROLE = "UserRole";

export const ROLE_USER = "ROLE_USER";
export const ROLE_ADMIN = "ROLE_ADMIn";
