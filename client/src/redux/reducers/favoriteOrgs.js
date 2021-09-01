const favoriteOrgIds = (state = "empty", action) => {
    switch (action.type) {
      case "UPDATE_ORG_IDS":
        return action.payload;
      default:
        return state;
    }
  };
  
export default favoriteOrgIds;