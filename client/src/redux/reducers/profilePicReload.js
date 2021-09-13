const profilePicReload = (state = false, action) => {
  switch (action.type) {
    case "RELOAD_PROFILE_PIC":
      return action.payload;
    default:
      return state;
  }
};

export default profilePicReload;
