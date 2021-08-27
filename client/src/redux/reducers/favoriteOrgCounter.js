const favoriteOrgCount = (state = 0, action) => {
  switch (action.type) {
    case "UPDATE_ORG_COUNT":
      return action.payload;
    default:
      return state;
  }
};

export default favoriteOrgCount;
