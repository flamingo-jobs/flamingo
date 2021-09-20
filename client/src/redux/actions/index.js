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

export const setApplicationCount = (newValue) => {
    return {
        type: "UPDATE_APPLICATION_COUNT",
        payload: newValue
    };
}

export const setReduxFavoriteOrgIds = (newIds) => {
    return {
        type: "UPDATE_ORG_IDS",
        payload: newIds
    };
}

export const setNewNotifications = (newNotifications) => {
    return {
        type: "NEW_NOTIFICATION",
        payload: newNotifications
    };
}

export const setProfilePicReload = (profilePicReload) => {
    return {
        type: "RELOAD_PROFILE_PIC",
        payload: profilePicReload
    };
}