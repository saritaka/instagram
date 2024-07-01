import { httpService } from "./http.service";

const STORAGE_KEY_LOGGEDIN_USER = "loggedinUser";

export const userService = {
  getUsers,
  getById,
  remove,
  update,
  signup,
  login,
  logout,
  getEmptyUser,
  getLoggedInUser,
};

function getUsers(filterBy) {
  return httpService.get(`user`, filterBy);
  // if (filterBy.txt) {
  //   users = users.filter(
  //     (user) =>
  //       user.username.toLowerCase().includes(filterBy.txt.toLowerCase()) ||
  //       user.fullname.toLowerCase().includes(filterBy.txt.toLowerCase())
  //   );
  // }
}

async function getById(userId) {
  const user = await httpService.get(`user/${userId}`);
  return user;
}

function remove(userId) {
  return httpService.delete(`user/${userId}`);
}

async function update({ _id }) {
  const user = await httpService.put(`user/${_id}`);
  return user;
}

function getLoggedInUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER));
}

async function login(userCred) {
  const user = await httpService.post("auth/login", userCred);
  console.log("user", user);
  if (user) return saveLocalUser(user);
}

async function signup(userCred) {
  userCred.following = [];
  userCred.followers = [];
  userCred.savedStoryIds = [];
  if (!userCred.imgUrl)
    userCred.imgUrl =
      "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png";

  const user = await httpService.post("auth/signup", userCred);
  return saveLocalUser(user);
}

async function logout() {
  return await httpService.post("auth/logout");
}

function saveLocalUser(user) {
  user = {
    _id: user._id,
    username: user.username,
    fullname: user.fullname,
    imgUrl: user.imgUrl,
    savedStoryIds: user.savedStoryIds,
    followers: user.followers,
    following: user.following,
  };
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user));
  return user;
}

function getEmptyUser() {
  return {
    username: "",
    fullname: "",
    password: "",
    imgUrl: "",
  };
}
