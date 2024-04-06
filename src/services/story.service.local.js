import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";
import { userService } from "./user.service.local.js";

const STORAGE_KEY = "stories";

export const storyService = {
  query,
  getById,
  //   save,
  //   remove,
  //   getEmptystory,
  //   addstoryMsg,
};
window.cs = storyService;

// async function query(filterBy = { txt: "", price: 0 }) {
async function query() {
  //   var stories = await storageService.query(STORAGE_KEY);
  //   if (filterBy.txt) {
  //     const regex = new RegExp(filterBy.txt, "i");
  //     stories = stories.filter(
  //       (story) => regex.test(story.vendor) || regex.test(story.description)
  //     );
  //   }
  //   if (filterBy.price) {
  //     stories = stories.filter((story) => story.price <= filterBy.price);
  //   }
  console.log(" story service", stories);
  return stories;
}

function getById(storyId) {
  return storageService.get(STORAGE_KEY, storyId);
}

async function remove(storyId) {
  // throw new Error('Nope')
  await storageService.remove(STORAGE_KEY, storyId);
}

async function save(story) {
  var savedstory;
  if (story._id) {
    savedstory = await storageService.put(STORAGE_KEY, story);
  } else {
    // Later, owner is set by the backend
    story.owner = userService.getLoggedinUser();
    savedstory = await storageService.post(STORAGE_KEY, story);
  }
  return savedstory;
}

async function addstoryMsg(storyId, txt) {
  // Later, this is all done by the backend
  const story = await getById(storyId);
  if (!story.msgs) story.msgs = [];

  const msg = {
    id: utilService.makeId(),
    by: userService.getLoggedinUser(),
    txt,
  };
  story.msgs.push(msg);
  await storageService.put(STORAGE_KEY, story);

  return msg;
}

function getEmptystory() {
  return {
    vendor: "Susita-" + (Date.now() % 1000),
    price: utilService.getRandomIntInclusive(1000, 9000),
  };
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))

var stories = [
  {
    _id: "s100",
    txt: "Best trip ever",
    imgUrl: "http://some-img", //Can be an array if decide to support multiple imgs
    by: {
      _id: "u100",
      fullname: "Ulash Ulashi",
      imgUrl: "http://some-img",
    },
    loc: {
      lat: 11.11,
      lng: 22.22,
      name: "Tel Aviv",
    },
    comments: [
      {
        id: "c1000",
        by: {
          _id: "u105",
          fullname: "Bob",
          imgUrl: "http://some-img",
        },
        txt: "good one!",
        likedBy: [
          // Optional
          {
            _id: "u105",
            fullname: "Bob",
            imgUrl: "http://some-img",
          },
        ],
      },
      {
        id: "c1001",
        by: {
          _id: "u106",
          fullname: "Dob",
          imgUrl: "http://some-img",
        },
        txt: "not good!",
      },
    ],
    likedBy: [
      {
        _id: "u105",
        fullname: "Bob",
        imgUrl: "http://some-img",
      },
      {
        _id: "u106",
        fullname: "Dob",
        imgUrl: "http://some-img",
      },
    ],
    tags: ["fun", "kids"],
    createdAt: "",
    status: "Public", //Private,deleted, archieved
  },
  {
    _id: "s200",
    txt: "Best trip ever",
    imgUrl: "http://some-img", //Can be an array if decide to support multiple imgs
    by: {
      _id: "u200",
      fullname: "Ulash Ulashi",
      imgUrl: "http://some-img",
    },
    loc: {
      lat: 11.11,
      lng: 22.22,
      name: "Tel Aviv",
    },
    comments: [
      {
        id: "c2000",
        by: {
          _id: "u105",
          fullname: "Bob",
          imgUrl: "http://some-img",
        },
        txt: "good one!",
        likedBy: [
          // Optional
          {
            _id: "u105",
            fullname: "Bob",
            imgUrl: "http://some-img",
          },
        ],
      },
      {
        id: "c2001",
        by: {
          _id: "u106",
          fullname: "Dob",
          imgUrl: "http://some-img",
        },
        txt: "not good!",
      },
    ],
    likedBy: [
      {
        _id: "u105",
        fullname: "Bob",
        imgUrl: "http://some-img",
      },
      {
        _id: "u106",
        fullname: "Dob",
        imgUrl: "http://some-img",
      },
    ],
    tags: ["fun", "kids"],
    createdAt: "",
    status: "Public", //Private,deleted, archieved
  },
];
storageService.post(STORAGE_KEY, stories);
// storageService.post(STORAGE_KEY, stories).then((x) => console.log(x));
