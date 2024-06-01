import { storageService } from "./async-storage.service";

const STORAGE_KEY_LOGGEDIN_USER = "loggedinUser";
const STORAGE_KEY_USER_DB = "user";

const user = ["u100", "u101", "u200"];

var loggedinUser = {
  _id: "u101",
  username: "Sarit",
  password: "testtest",
  fullname: "Sarit Ak",
  imgUrl:
    "https://cloudinary-marketing-res.cloudinary.com/image/upload/ar_0.5,c_fill,g_auto,w_433/q_auto/f_auto/hiking_dog_mountain.jpg",
  following: [
    {
      _id: "u100",
      fullname: "Dob",
      imgUrl: "http://some-img",
    },
  ],
  followers: [
    {
      _id: "u105",
      fullname: "Bob",
      imgUrl: "http://some-img",
    },
  ],
  savedStoryIds: ["s200", "s100"],
};

export const userService = {
  // getDefaultFilter,
  getLoggedInUser,
  getUsers,
  updateUser,
  // createUser,
};

function getLoggedInUser() {
  return loggedinUser;
}

function getUsers() {
  return user;
}

function updateUser(user) {
  loggedinUser = user;
  return user;
}

function getDefaultFilter() {
  return {
    username: null,
    fullname: null,
  };
}

function createUser() {
  return {
    // _id: utilService.makeId(),
    _id: "u123",
    username: "Sarita",
    password: "pass123",
    fullname: "Sarit test",
    imgUrl: "http://some-img",
    following: [
      {
        _id: "u101",
        fullname: "Muki Muka",
        imgUrl: "http://some-img",
      },
    ],
    followers: [
      {
        _id: "u101",
        fullname: "Muki Muka",
        imgUrl: "http://some-img",
      },
    ],
  };
}

function _createUsers() {
  let users = utilService.loadFromStorage(STORAGE_KEY_USERS);
  // let emails = [];
  if (!users || !emails.length) {
    users = [loggedinUser];
    for (let i = 0; i < 4; i++) {
      emails.push(createUser());
    }
  }
  utilService.saveToStorage(STORAGE_KEY_USERS, users);
}
