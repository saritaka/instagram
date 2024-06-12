import { userService } from "../services/user.service.local.js";
// import { socketService } from "../services/socket.service.js";
import { store } from "../store/store.js";

import { showErrorMsg } from "../services/event-bus.service.js";
import { LOADING_DONE, LOADING_START } from "./system.reducer.js";
import {
  // REMOVE_USER,
  SET_USER,
  SET_USERS,
  UPDATE_USER,
  SET_LoggedIn_USER,

  // SET_WATCHED_USER,
} from "./user.reducer.js";

export async function loadUsers() {
  try {
    store.dispatch({ type: LOADING_START });
    // const users = await userService.getUsers();

    const users = await userService.query();

    store.dispatch({ type: SET_USERS, users });
  } catch (err) {
    console.log("UserActions: err in loadUsers", err);
  } finally {
    store.dispatch({ type: LOADING_DONE });
  }
}

export async function loadLoggedInUser() {
  try {
    store.dispatch({ type: LOADING_START });
    const loggeduser = await userService.getLoggedInUser();

    console.log("user actions loaduser", { loggeduser });
    store.dispatch({ type: SET_LoggedIn_USER, loggeduser });
  } catch (err) {
    console.log("UserActions: err in loadUser", err);
  } finally {
    store.dispatch({ type: LOADING_DONE });
  }
}

export async function updateUser(user) {
  try {
    await userService.updateUser(user);
    store.dispatch({ type: UPDATE_USER, user });
  } catch (err) {
    console.log("UserActions: err in updateUser", err);
  }
}

export async function loadUser(userId) {
  try {
    const getuser = await userService.getById(userId);
    console.log("user in user actions", getuser, userId);
    store.dispatch({ type: SET_USER, getuser });
  } catch (err) {
    showErrorMsg("Cannot load user");
    console.log("Cannot load user", err);
  }
}

// export async function removeUser(userId) {
//   try {
//     await userService.remove(userId);
//     store.dispatch({ type: REMOVE_USER, userId });
//   } catch (err) {
//     console.log("UserActions: err in removeUser", err);
//   }
// }

// export async function login(credentials) {
//   try {
//     const user = await userService.login(credentials);
//     store.dispatch({
//       type: SET_USER,
//       user,
//     });
//     socketService.login(user._id);
//     return user;
//   } catch (err) {
//     console.log("Cannot login", err);
//     throw err;
//   }
// }

// export async function signup(credentials) {
//   try {
//     const user = await userService.signup(credentials);
//     store.dispatch({
//       type: SET_USER,
//       user,
//     });
//     socketService.login(user._id);
//     return user;
//   } catch (err) {
//     console.log("Cannot signup", err);
//     throw err;
//   }
// }

// export async function logout() {
//   try {
//     await userService.logout();
//     store.dispatch({
//       type: SET_USER,
//       user: null,
//     });
//     socketService.logout();
//   } catch (err) {
//     console.log("Cannot logout", err);
//     throw err;
//   }
// }
