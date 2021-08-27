import { combineReducers } from "redux";
import favoriteOrgCounter from "./favoriteOrgCounter";
import savedJobCounter from "./savedJobCounter";

const combinedReducers = combineReducers({
    favoriteOrgCounter,
    savedJobCounter,
});

export default combinedReducers;