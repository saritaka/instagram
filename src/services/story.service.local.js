import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";
import { userService } from "./user.service.local.js";

const STORAGE_KEY = "stories";

export const storyService = {
  query,
  getById,
  save,
  remove,
  //   getEmptystory,
  //   addstoryMsg,
};
window.cs = storyService;

_createStories();

// async function query(filterBy = { txt: "", price: 0 }) {
async function query() {
  var stories = await storageService.query(STORAGE_KEY);

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
    story.owner = userService.getLoggedInUser();
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
function createStory() {
  var stories = [
    {
      _id: "s100",
      txt: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id nam voluptatem, enim recusandae ea ex obcaecati error dicta voluptates numquam consequatur neque commodi, architecto odit itaque non fuga minima quas.",
      imgUrl:
        "https://res.cloudinary.com/dow3hyinu/image/upload/v1712595929/cld-sample-4.jpg",
      by: {
        _id: "u100",
        fullname: "Tal Bar",
        username: "sunflower_u",
        imgUrl:
          "https://res.cloudinary.com/dow3hyinu/image/upload/v1712604171/sunflower_uf3h9w.jpg",
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
            username: "Bob111",
            imgUrl:
              "https://res.cloudinary.com/dow3hyinu/image/upload/v1712604171/sunflower_uf3h9w.jpg",
          },
          txt: "good one!",
          likedBy: [
            {
              _id: "u105",
              fullname: "Bob",
              imgUrl:
                "https://res.cloudinary.com/dow3hyinu/image/upload/v1712604171/sunflower_uf3h9w.jpg",
            },
          ],
        },
        {
          id: "c1001",
          by: {
            _id: "u106",
            fullname: "Dob",
            username: "Dob111",
            imgUrl:
              "https://res.cloudinary.com/dow3hyinu/image/upload/v1712604171/sunflower_uf3h9w.jpg",
          },
          txt: "not good!",
        },
      ],
      likedBy: [
        {
          _id: "u101",
          fullname: "Bob",
          imgUrl:
            "https://res.cloudinary.com/dow3hyinu/image/upload/v1712604171/sunflower_uf3h9w.jpg",
        },
        {
          _id: "u106",
          fullname: "Dob",
          imgUrl:
            "https://res.cloudinary.com/dow3hyinu/image/upload/v1712604171/sunflower_uf3h9w.jpg",
        },
      ],
      tags: ["fun", "kids"],
      createdAt: utilService.randomPastTime(),
      status: "Public",
    },
    {
      _id: "s200",
      txt: "Best trip ever",
      imgUrl:
        "https://res.cloudinary.com/dow3hyinu/image/upload/v1712595925/samples/coffee.jpg", //Can be an array if decide to support multiple imgs
      by: {
        _id: "u100",
        fullname: "Ulash Ulashi",
        username: "traveler",
        imgUrl:
          "https://res.cloudinary.com/dow3hyinu/image/upload/v1712604171/sunflower_uf3h9w.jpg",
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
            username: "Bob123",
            imgUrl:
              "https://res.cloudinary.com/dow3hyinu/image/upload/v1712604171/sunflower_uf3h9w.jpg",
          },
          txt: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id nam voluptatem, enim recusandae ea ex obcaecati error dicta voluptates numquam consequatur neque commodi, architecto odit itaque non fuga minima quas.",
          likedBy: [
            // Optional
            {
              _id: "u105",
              fullname: "Bob",
              imgUrl:
                "https://res.cloudinary.com/dow3hyinu/image/upload/v1712604171/sunflower_uf3h9w.jpg",
            },
          ],
        },
        {
          id: "c2001",
          by: {
            _id: "u106",
            fullname: "Dob",
            username: "Dob123",
            imgUrl:
              "https://res.cloudinary.com/dow3hyinu/image/upload/v1712604171/sunflower_uf3h9w.jpgg",
          },
          txt: "not good!",
        },
      ],
      likedBy: [
        {
          _id: "u105",
          fullname: "Bob",
          imgUrl:
            "https://res.cloudinary.com/dow3hyinu/image/upload/v1712604171/sunflower_uf3h9w.jpg",
        },
        {
          _id: "u106",
          fullname: "Dob",
          imgUrl:
            "https://res.cloudinary.com/dow3hyinu/image/upload/v1712604171/sunflower_uf3h9w.jpg",
        },
      ],
      tags: ["fun", "kids"],
      createdAt: utilService.randomPastTime(),
      status: "Public", //Private,deleted, archieved
    },
    {
      _id: "s300",
      txt: "Taste like freedom",
      imgUrl:
        "https://res.cloudinary.com/dow3hyinu/image/upload/v1712595892/samples/food/dessert.jpg", //Can be an array if decide to support multiple imgs
      by: {
        _id: "u101",
        fullname: "Sarit Ak",
        username: "sarit",
        imgUrl:
          "https://cloudinary-marketing-res.cloudinary.com/image/upload/ar_0.5,c_fill,g_auto,w_433/q_auto/f_auto/hiking_dog_mountain.jpg",
      },
      loc: {
        lat: 11.11,
        lng: 22.22,
        name: "Tel Aviv",
      },
      comments: [],
      likedBy: [],
      tags: ["fun", "kids"],
      createdAt: utilService.randomPastTime(),
      status: "Public", //Private,deleted, archieved
    },
    {
      _id: "s400",
      txt: "Jazz festival",
      imgUrl:
        "https://res.cloudinary.com/dow3hyinu/image/upload/v1712595898/samples/people/jazz.jpg", //Can be an array if decide to support multiple imgs
      by: {
        _id: "u101",
        fullname: "Sarit Ak",
        username: "sarit",
        imgUrl:
          "https://cloudinary-marketing-res.cloudinary.com/image/upload/ar_0.5,c_fill,g_auto,w_433/q_auto/f_auto/hiking_dog_mountain.jpg",
      },
      loc: {
        lat: 11.11,
        lng: 22.22,
        name: "Tel Aviv",
      },
      comments: [],
      likedBy: [],
      tags: ["fun", "kids"],
      createdAt: utilService.randomPastTime(),
      status: "Public", //Private,deleted, archieved
    },
    {
      _id: "s500",
      txt: "Recipe by @VeganGF",
      imgUrl:
        "https://res.cloudinary.com/dow3hyinu/image/upload/v1712595895/samples/food/pot-mussels.jpg", //Can be an array if decide to support multiple imgs
      by: {
        _id: "u200",
        fullname: "Or Smith",
        username: "or",
        imgUrl:
          "https://res.cloudinary.com/dow3hyinu/image/upload/v1712595888/sample.jpg",
      },
      loc: {
        lat: 11.11,
        lng: 22.22,
        name: "Tel Aviv",
      },
      comments: [],
      likedBy: [],
      tags: ["fun", "kids"],
      createdAt: utilService.randomPastTime(),
      status: "Public", //Private,deleted, archieved
    },
    {
      _id: "s600",
      txt: "NYC 😍",
      imgUrl:
        "https://res.cloudinary.com/dow3hyinu/image/upload/v1712595899/samples/landscapes/architecture-signs.jpg", //Can be an array if decide to support multiple imgs
      by: {
        _id: "u200",
        fullname: "Or Smith",
        username: "or",
        imgUrl:
          "https://res.cloudinary.com/dow3hyinu/image/upload/v1712595888/sample.jpg",
      },
      loc: {
        lat: 11.11,
        lng: 22.22,
        name: "Tel Aviv",
      },
      comments: [],
      likedBy: [],
      tags: ["fun", "kids"],
      createdAt: utilService.randomPastTime(),
      status: "Public", //Private,deleted, archieved
    },
    {
      _id: "s700",
      txt: "",
      imgUrl:
        "https://res.cloudinary.com/dow3hyinu/image/upload/v1712595904/samples/food/spices.jpg", //Can be an array if decide to support multiple imgs
      by: {
        _id: "u200",
        fullname: "Or Smith",
        username: "or",
        imgUrl:
          "https://res.cloudinary.com/dow3hyinu/image/upload/v1712595888/sample.jpg",
      },
      loc: {
        lat: 11.11,
        lng: 22.22,
        name: "Tel Aviv",
      },
      comments: [],
      likedBy: [],
      tags: ["fun", "kids"],
      createdAt: utilService.randomPastTime(),
      status: "Public", //Private,deleted, archieved
    },
    {
      _id: "s800",
      txt: "",
      imgUrl:
        "https://res.cloudinary.com/dow3hyinu/image/upload/v1712595901/samples/ecommerce/car-interior-design.jpg", //Can be an array if decide to support multiple imgs
      by: {
        _id: "u200",
        fullname: "Or Smith",
        username: "or",
        imgUrl:
          "https://res.cloudinary.com/dow3hyinu/image/upload/v1712595888/sample.jpg",
      },
      loc: {
        lat: 11.11,
        lng: 22.22,
        name: "Tel Aviv",
      },
      comments: [],
      likedBy: [],
      tags: ["fun", "kids"],
      createdAt: utilService.randomPastTime(),
      status: "Public", //Private,deleted, archieved
    },
    {
      _id: "s900",
      txt: "",
      imgUrl:
        "https://res.cloudinary.com/dow3hyinu/image/upload/v1712595922/samples/outdoor-woman.jpg", //Can be an array if decide to support multiple imgs
      by: {
        _id: "u200",
        fullname: "Or Smith",
        username: "or",
        imgUrl:
          "https://res.cloudinary.com/dow3hyinu/image/upload/v1712595888/sample.jpg",
      },
      loc: {
        lat: 11.11,
        lng: 22.22,
        name: "Tel Aviv",
      },
      comments: [],
      likedBy: [],
      tags: ["fun", "kids"],
      createdAt: utilService.randomPastTime(),
      status: "Public", //Private,deleted, archieved
    },
    {
      _id: "s1000",
      txt: "",
      imgUrl:
        "https://res.cloudinary.com/dow3hyinu/image/upload/v1712595924/samples/chair-and-coffee-table.jpg", //Can be an array if decide to support multiple imgs
      by: {
        _id: "u200",
        fullname: "Or Smith",
        username: "or",
        imgUrl:
          "https://res.cloudinary.com/dow3hyinu/image/upload/v1712595888/sample.jpg",
      },
      loc: {
        lat: 11.11,
        lng: 22.22,
        name: "Tel Aviv",
      },
      comments: [],
      likedBy: [],
      tags: ["fun", "kids"],
      createdAt: utilService.randomPastTime(),
      status: "Public", //Private,deleted, archieved
    },
  ];
  return stories;
}

function _createStories() {
  let stories = utilService.loadFromStorage(STORAGE_KEY);
  if (!stories || !stories.length) {
    stories = createStory();
  }
  utilService.saveToStorage(STORAGE_KEY, stories);
}

// storageService.post(STORAGE_KEY, stories).then((x) => console.log(x));
