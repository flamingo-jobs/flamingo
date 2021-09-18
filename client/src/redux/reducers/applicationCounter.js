const applicationCounter = (state = 0, action) => {
    switch (action.type) {
      case "UPDATE_APPLICATION_COUNT":
        return action.payload;
      default:
        return state;
    }
  };

export default applicationCounter;