import { userService } from "../services/user.service.local.js";

// export const INCREMENT = "INCREMENT";
// export const DECREMENT = "DECREMENT";
// export const CHANGE_COUNT = "CHANGE_COUNT";
export const SET_USER = "SET_USER";
// export const SET_WATCHED_USER = "SET_WATCHED_USER";
// export const REMOVE_USER = "REMOVE_USER";
export const SET_USERS = "SET_USERS";
// export const SET_SCORE = "SET_SCORE";

// export const SET_USER_STORIES = "SET_USER_STORIES";
// export const SET_FOLLOWING = "SET_FOLLOWING";
// export const SET_FOLLOWERS = "SET_FOLLOWER";
// export const SET_SAVED = "SET_SAVED";
// export const SET_FOLLOW = "SET_FOLLOW";
// export const SET_COMMENT = "SET_COMMENT";
// export const SET_LIKE = "SET_LIKE";

const initialState = {
  // user: userService.getLoggedinUser(),
  user: "",
  users: [],
};

export function userReducer(state = initialState, action) {
  var newState = state;
  switch (action.type) {
    // case INCREMENT:
    //   newState = { ...state, count: state.count + 1 };
    //   break;
    // case DECREMENT:
    //   newState = { ...state, count: state.count - 1 };
    //   break;
    // case CHANGE_COUNT:
    //   newState = { ...state, count: state.count + action.diff };
    //   break;
    case SET_USER:
      newState = { ...state, user: action.user };
      break;
    // case SET_WATCHED_USER:
    //   newState = { ...state, watchedUser: action.user };
    //   break;
    // case REMOVE_USER:
    //   newState = {
    //     ...state,
    //     users: state.users.filter((user) => user._id !== action.userId),
    //   };
    //   break;
    case SET_USERS:
      newState = { ...state, users: action.users };
      break;
    // case SET_SCORE:
    //   newState = { ...state, user: { ...state.user, score: action.score } };
    //   break;
    default:
      // console.log("default user reducer");
      return state;
  }
  // For debug:
  window.userState = newState;
  console.log("State:", newState);
  return newState;
}
