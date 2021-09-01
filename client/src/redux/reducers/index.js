import { combineReducers } from "redux";
import favoriteOrgCounter from "./favoriteOrgCounter";
import savedJobCounter from "./savedJobCounter";
import favoriteOrgIds from "./favoriteOrgs";

const combinedReducers = combineReducers({
    favoriteOrgCounter,
    savedJobCounter,
    favoriteOrgIds,
});

export default combinedReducers;