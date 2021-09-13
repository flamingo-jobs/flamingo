import { combineReducers } from "redux";
import favoriteOrgCounter from "./favoriteOrgCounter";
import savedJobCounter from "./savedJobCounter";
import favoriteOrgIds from "./favoriteOrgs";
import newNotifications from "./Notifications";

const combinedReducers = combineReducers({
    favoriteOrgCounter,
    savedJobCounter,
    favoriteOrgIds,
    newNotifications
});

export default combinedReducers;