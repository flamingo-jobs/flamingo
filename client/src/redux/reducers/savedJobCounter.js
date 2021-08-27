const savedJobCounter = (state = 0, action) => {
    switch (action.type) {
      case "UPDATE_JOB_COUNT":
        return action.payload;
      default:
        return state;
    }
  };
  
export default savedJobCounter;