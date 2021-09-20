import { combineReducers } from "redux";
import favoriteOrgCounter from "./favoriteOrgCounter";
import savedJobCounter from "./savedJobCounter";
import applicationCounter from './applicationCounter';
import favoriteOrgIds from "./favoriteOrgs";
import newNotifications from "./Notifications";
import profilePicReload from "./profilePicReload";

const combinedReducers = combineReducers({
    favoriteOrgCounter,
    savedJobCounter,
    favoriteOrgIds,
    newNotifications,
    profilePicReload,
    applicationCounter
});

export default combinedReducers;