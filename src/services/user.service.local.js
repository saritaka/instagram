import { storageService } from "./async-storage.service";

// const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const STORAGE_KEY_USERS = "Users";

const loggedinUser = {
  _id: "u101",
  username: "Sarit",
  password: "testtest",
  fullname: "Sarit Test",
  imgUrl:
    "https://cloudinary-marketing-res.cloudinary.com/image/upload/ar_0.5,c_fill,g_auto,w_433/q_auto/f_auto/hiking_dog_mountain.jpg",
  following: [
    {
      _id: "u106",
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
  savedStoryIds: ["s104", "s111", "s123"],
};

export const userService = {
  getDefaultFilter,
  getLoggedInUser,
  createUser,
};

function getLoggedInUser() {}

function getDefaultFilter() {
  return {
    username: null,
    fullname: null,
  };
}

function createUser() {
  return {
    _id: utilService.makeId(),
    username: "test",
    password: "mukmuk",
    fullname: "test",
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
