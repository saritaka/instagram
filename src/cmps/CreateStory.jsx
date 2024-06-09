import { useNavigate } from "react-router";
import close from "../assets/img/close.svg";
import arrow from "../assets/img/arrow.svg";
import * as actions from "../store/story.actions";
import { useState } from "react";
import { useSelector } from "react-redux";
import { utilService } from "../services/util.service";
import { uploadService } from "../services/upload.service";

export function CreateStory({ setModal }) {
  const [file, setFile] = useState(null);
  const [storyText, setStoryText] = useState(null);

  console.log("file in create story", file);
  // const navigate = useNavigate();
  const user = useSelector((storeState) => storeState.userModule.user);

  function createNewStory() {
    var newStory = {
      txt: storyText || "",
      imgUrl: file,
      by: {
        _id: user._id,
        fullname: user.fullname,
        username: user.username,
        imgUrl: user.imgUrl,
      },
      loc: {
        lat: 11.11,
        lng: 22.22,
        name: "Tel Aviv",
      },
      comments: [],
      likedBy: [],
      tags: [],
      // createdAt: utilService.randomPastTime(),
      createdAt: Date.now(),
      status: "Public", //Private,deleted, archieved
    };

    actions.updateStory(newStory);
    console.log("the new story:", newStory);
    setModal(false);
  }

  async function handleSelection(ev) {
    const { secure_url, height, width } = await uploadService.uploadImg(ev);
    console.log("secureUrl", secure_url);
    setFile(secure_url);
  }

  function updateText(ev) {
    setStoryText(ev.target.value);
  }

  return (
    <section className="modal">
      <button className="close" onClick={() => setModal(false)}>
        <img src={close}></img>
      </button>
      <div className="create-story-modal ">
        <div className="create-header">
          {file ? (
            <button onClick={() => setFile(!file)}>
              <img src={arrow}></img>
            </button>
          ) : (
            ""
          )}
          Create new post
          {file ? <button onClick={() => createNewStory()}>Share</button> : " "}
        </div>
        {file ? (
          <div className="flex">
            <div className="create-picture">
              <img src={file}></img>
            </div>
            <div className="create-details">
              <div className="flex align-center fs14">
                <button className="m0 p0">
                  <img src={user.imgUrl} className="profile-pic img32"></img>
                </button>
                <span>{user.username}</span>
              </div>

              <input
                onChange={updateText}
                placeholder="Write a caption..."
              ></input>
            </div>
          </div>
        ) : (
          <div className="create-body">
            Drag photos and videos here
            <input
              // onChange={(ev) => setFile(ev.target.files[0])}
              onChange={handleSelection}
              type="file"
            ></input>
            {/* <button onClick={() => setFile(!file)}> */}
            {/* <button onClick={handleUpload}>Select from computer</button> */}
          </div>
        )}
      </div>
    </section>
  );
}

//  var newStory = {
//    txt: "Paris 2024",
//    imgUrl:
//      "https://res.cloudinary.com/dow3hyinu/image/upload/v1712595919/samples/balloons.jpg", //Can be an array if decide to support multiple imgs
//    by: {
//      _id: "u101",
//      fullname: "Sarit Test",
//      username: "Sarita",
//      imgUrl:
//        "https://res.cloudinary.com/dow3hyinu/image/upload/v1712595919/samples/balloons.jpg",
//    },
//    loc: {
//      lat: 11.11,
//      lng: 22.22,
//      name: "Tel Aviv",
//    },
//    comments: [
//      {
//        id: "c1000",
//        by: {
//          _id: "u105",
//          fullname: "Bob",
//          username: "Bob111",
//          imgUrl:
//            "https://res.cloudinary.com/dow3hyinu/image/upload/v1712604171/sunflower_uf3h9w.jpg",
//        },
//        txt: "good one!",
//        likedBy: [
//          // Optional
//          {
//            _id: "u105",
//            fullname: "Bob",
//            imgUrl:
//              "https://res.cloudinary.com/dow3hyinu/image/upload/v1712604171/sunflower_uf3h9w.jpg",
//          },
//        ],
//      },
//      {
//        id: "c1001",
//        by: {
//          _id: "u106",
//          fullname: "Dob",
//          username: "Dob111",
//          imgUrl:
//            "https://res.cloudinary.com/dow3hyinu/image/upload/v1712604171/sunflower_uf3h9w.jpg",
//        },
//        txt: "not good!",
//      },
//    ],
//    likedBy: [
//      {
//        _id: "u105",
//        fullname: "Bob",
//        imgUrl:
//          "https://res.cloudinary.com/dow3hyinu/image/upload/v1712604171/sunflower_uf3h9w.jpg",
//      },
//      {
//        _id: "u106",
//        fullname: "Dob",
//        imgUrl:
//          "https://res.cloudinary.com/dow3hyinu/image/upload/v1712604171/sunflower_uf3h9w.jpg",
//      },
//    ],
//    tags: ["fun", "kids"],
//    createdAt: utilService.randomPastTime(),
//    status: "Public", //Private,deleted, archieved
//  };
