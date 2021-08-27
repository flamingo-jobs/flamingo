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