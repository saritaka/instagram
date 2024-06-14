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
  const user = useSelector((storeState) => storeState.userModule.loggeduser);
  const [openModal, setModal] = useState(false);

  const navigate = useNavigate();
  const navButtons = [
    { field: "Home", path: "", icon: home, onClick: "" },
    { field: "Search", path: "", icon: search, onClick: "" },
    { field: "Explore", path: "/explore", icon: explore, onClick: "" },
    { field: "Messages", path: "/direct/inbox", icon: message, onClick: "" },
    { field: "Create", path: "", icon: add, onClick: createStory },
    { field: "Profile", path: `/${user._id}/`, icon: user.imgUrl, onClick: "" },
  ];

  function createStory() {
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
