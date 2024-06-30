import { storageService } from "./async-storage.service";
import { utilService } from "./util.service";

const STORAGE_KEY_LOGGEDIN_USER = "loggedinUser";
const STORAGE_KEY_USERS = "users";

// const users = ["u100", "u101", "u200"];

// var loggedinUser = {
//   _id: "u101",
//   username: "sarit",
//   password: "testtest",
//   fullname: "Sarit Ak",
//   imgUrl:
//     "https://cloudinary-marketing-res.cloudinary.com/image/upload/ar_0.5,c_fill,g_auto,w_433/q_auto/f_auto/hiking_dog_mountain.jpg",
//   following: [
//     {
//       _id: "u300",
//       fullname: "Dob",
//       imgUrl: "http://some-img",
//     },
//   ],
//   followers: [
//     {
//       _id: "u105",
//       fullname: "Bob",
//       imgUrl: "http://some-img",
//     },
//   ],
//   savedStoryIds: ["s200", "s100"],
// };

export const userService = {
  query,
  // getDefaultFilter,
  getLoggedInUser,
  getById,
  // getUsers,
  updateUser,
  // createUser,
  signup,
  login,
  logout,
  getEmptyUser,
};

_createUsers();

async function query(filterBy = {}) {
  var users = await storageService.query(STORAGE_KEY_USERS);
  if (filterBy.txt) {
    users = users.filter(
      (user) =>
        user.username.toLowerCase().includes(filterBy.txt.toLowerCase()) ||
        user.fullname.toLowerCase().includes(filterBy.txt.toLowerCase())
    );
  }
  return users;
}

function getLoggedInUser() {
  // var loggedinUser = utilService.loadFromStorage(STORAGE_KEY_USERS)[1];
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER));
  // return loggedinUser;
  // return null;
}

// function getUsers() {
//   return users;
// }

function getById(userId) {
  return storageService.get(STORAGE_KEY_USERS, userId);
}

async function updateUser(user) {
  var savedUser = await storageService.put(STORAGE_KEY_USERS, user);
  console.log("saved user in the service ", savedUser);
  return savedUser;
}

function getDefaultFilter() {
  return {
    username: null,
    fullname: null,
  };
}

function createUser() {
  var users = [
    {
      _id: "u100",
      username: "tali_r",
      password: "123",
      fullname: "Tail Ron",
      imgUrl:
        "https://res.cloudinary.com/dow3hyinu/image/upload/v1712595900/samples/people/bicycle.jpg",
      following: [
        {
          _id: "u400",
          fullname: "Bobi",
          imgUrl:
            "https://res.cloudinary.com/dow3hyinu/image/upload/v1712595888/sample.jpg",
        },
      ],
      followers: [
        {
          _id: "u400",
          fullname: "Bob",
          imgUrl:
            "https://res.cloudinary.com/dow3hyinu/image/upload/v1712595888/sample.jpg",
        },
      ],
      savedStoryIds: ["s200", "s100"],
    },
    {
      _id: "u101",
      username: "sarit",
      password: "testtest",
      fullname: "Sarit Ak",
      imgUrl:
        "https://cloudinary-marketing-res.cloudinary.com/image/upload/ar_0.5,c_fill,g_auto,w_433/q_auto/f_auto/hiking_dog_mountain.jpg",
      following: [
        {
          _id: "u400",
          fullname: "Bob",
          imgUrl:
            "https://res.cloudinary.com/dow3hyinu/image/upload/v1712595900/samples/landscapes/beach-boat.jpg",
        },
      ],
      followers: [
        {
          _id: "u400",
          fullname: "Bob",
          imgUrl:
            "https://res.cloudinary.com/dow3hyinu/image/upload/v1712595900/samples/landscapes/beach-boat.jpg",
        },
      ],
      savedStoryIds: ["s200", "s100"],
    },
    {
      _id: "u200",
      username: "or",
      password: "1234",
      fullname: "Or Smith",
      imgUrl:
        "https://res.cloudinary.com/dow3hyinu/image/upload/v1712595888/sample.jpg",
      following: [
        {
          _id: "u400",
          fullname: "Bobi",
          imgUrl:
            "https://res.cloudinary.com/dow3hyinu/image/upload/v1712595888/sample.jpg",
        },
      ],
      followers: [
        {
          _id: "u400",
          fullname: "Bobi",
          imgUrl:
            "https://res.cloudinary.com/dow3hyinu/image/upload/v1712595888/sample.jpg",
        },
      ],
      savedStoryIds: ["s200", "s100"],
    },
  ];
  return users;
}

function _createUsers() {
  let users = utilService.loadFromStorage(STORAGE_KEY_USERS);
  // let users = [];
  if (!users || !users.length) {
    users = createUser();
  }
  utilService.saveToStorage(STORAGE_KEY_USERS, users);
}

async function signup(userCred) {
  // userCred.score = 10000;
  userCred.following = [];
  userCred.followers = [];
  userCred.savedStoryIds = [];
  if (!userCred.imgUrl)
    userCred.imgUrl =
      "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png";
  const user = await storageService.post(STORAGE_KEY_USERS, userCred);
  return saveLocalUser(user);
}

async function login(userCred) {
  const users = await storageService.query(STORAGE_KEY_USERS);
  const user = users.find((user) => user.username === userCred.username);
  if (user) {
    return saveLocalUser(user);
  }
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

async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER);
}

function getEmptyUser() {
  return {
    username: "",
    fullname: "",
    password: "",
    imgUrl: "",
  };
}
