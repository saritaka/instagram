import { NavLink, useNavigate } from "react-router-dom";
import instagram from "../assets/img/instagram.svg";
import home from "../assets/img/home_FILL0.svg";
import search from "../assets/img/search_wght400.svg";
import explore from "../assets/img/explore_FILL0.svg";
import message from "../assets/img/messenger.svg";
import add from "../assets/img/add.svg";
import profile from "../assets/img/react.png";
import menu from "../assets/img/menu.svg";
import { utilService } from "../services/util.service.js";

import * as actions from "../store/story.actions";
import { useSelector } from "react-redux";
import { CreateStory } from "./CreateStory.jsx";
import { useState } from "react";

// import { CreateStory } from "./CreateStory";

// export function SideBar({ user }) {
export function SideBar() {
  const user = useSelector((storeState) => storeState.userModule.user);
  const [openModal, setModal] = useState(false);

  const navigate = useNavigate();
  const navButtons = [
    { field: "Home", path: "", icon: home, onClick: "" },
    { field: "Search", path: "", icon: search, onClick: "" },
    { field: "Explore", path: "/explore", icon: explore, onClick: "" },
    { field: "Messages", path: "/direct/inbox", icon: message, onClick: "" },
    { field: "Create", path: "", icon: add, onClick: createStory },
    { field: "Profile", path: `/${user._id}`, icon: user.imgUrl, onClick: "" },
  ];

  function createStory() {
    // var newStory = {
    //   txt: "Paris 2024",
    //   imgUrl:
    //     "https://res.cloudinary.com/dow3hyinu/image/upload/v1712595919/samples/balloons.jpg", //Can be an array if decide to support multiple imgs
    //   by: {
    //     _id: "u101",
    //     fullname: "Sarit Test",
    //     username: "Sarita",
    //     imgUrl:
    //       "https://res.cloudinary.com/dow3hyinu/image/upload/v1712595919/samples/balloons.jpg",
    //   },
    //   loc: {
    //     lat: 11.11,
    //     lng: 22.22,
    //     name: "Tel Aviv",
    //   },
    //   comments: [
    //     {
    //       id: "c1000",
    //       by: {
    //         _id: "u105",
    //         fullname: "Bob",
    //         username: "Bob111",
    //         imgUrl:
    //           "https://res.cloudinary.com/dow3hyinu/image/upload/v1712604171/sunflower_uf3h9w.jpg",
    //       },
    //       txt: "good one!",
    //       likedBy: [
    //         // Optional
    //         {
    //           _id: "u105",
    //           fullname: "Bob",
    //           imgUrl:
    //             "https://res.cloudinary.com/dow3hyinu/image/upload/v1712604171/sunflower_uf3h9w.jpg",
    //         },
    //       ],
    //     },
    //     {
    //       id: "c1001",
    //       by: {
    //         _id: "u106",
    //         fullname: "Dob",
    //         username: "Dob111",
    //         imgUrl:
    //           "https://res.cloudinary.com/dow3hyinu/image/upload/v1712604171/sunflower_uf3h9w.jpg",
    //       },
    //       txt: "not good!",
    //     },
    //   ],
    //   likedBy: [
    //     {
    //       _id: "u105",
    //       fullname: "Bob",
    //       imgUrl:
    //         "https://res.cloudinary.com/dow3hyinu/image/upload/v1712604171/sunflower_uf3h9w.jpg",
    //     },
    //     {
    //       _id: "u106",
    //       fullname: "Dob",
    //       imgUrl:
    //         "https://res.cloudinary.com/dow3hyinu/image/upload/v1712604171/sunflower_uf3h9w.jpg",
    //     },
    //   ],
    //   tags: ["fun", "kids"],
    //   createdAt: utilService.randomPastTime(),
    //   status: "Public", //Private,deleted, archieved
    // };
    // actions.updateStory(newStory);
    // console.log("the new story:", newStory);
    console.log("test");
    setModal(!openModal);
  }

  return (
    <section className="side-bar flex column">
      {openModal ? <CreateStory setModal={setModal} /> : ""}
      <div>
        <button className="logo-btn" onClick={() => navigate("")}>
          <img src={instagram}></img>
        </button>
      </div>
      <div className="nav">
        <nav className="fs16">
          {navButtons.map((btn, ind) => {
            return (
              <NavLink to={btn.path} key={ind} onClick={btn.onClick}>
                <img src={btn.icon}></img>
                {btn.field}
              </NavLink>
            );
          })}
        </nav>
      </div>
      <div className="menu-btn">
        <button className="menu-btn flex fs16">
          <img src={menu}></img>
          Menu
        </button>
      </div>
    </section>
  );
}
