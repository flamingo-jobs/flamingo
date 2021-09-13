const newNotifications = (state = 0, action) => {
    switch (action.type) {
      case "NEW_NOTIFICATION":
        return action.payload;
      default:
        return state;
    }
  };
  
export default newNotifications;