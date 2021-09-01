export const setFavoriteOrgCount = (newValue) => {
    return {
        type: "UPDATE_ORG_COUNT",
        payload: newValue
    };
}

export const setSavedJobCount = (newValue) => {
    return {
        type: "UPDATE_JOB_COUNT",
        payload: newValue
    };
}

export const setReduxFavoriteOrgIds = (newIds) => {
    return {
        type: "UPDATE_ORG_IDS",
        payload: newIds
    };
}