import { NavLink, useNavigate } from "react-router-dom";
import instagram from "../assets/img/instagram.svg";
import instagram_icon from "../assets/img/instagram_icon.svg";
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
import { SearchProfile } from "./SearchProfile.jsx";

// import { CreateStory } from "./CreateStory";

// export function SideBar({ user }) {
export function SideBar() {
  const user = useSelector((storeState) => storeState.userModule.loggeduser);
  const [openModal, setModal] = useState(false);
  const [openFilterModal, setFilterModal] = useState(false);
  const [narrowMenu, setNarrowMenu] = useState(false);
  const [openMenu, setMenu] = useState(false);
  // const [bottomMenu, setBottomMenu] = useState(false);

  const navigate = useNavigate();
  const navButtons = [
    { field: "Home", path: "", icon: home, onClick: closeSearch },
    { field: "Search", path: "", icon: search, onClick: updateFilterModal },
    { field: "Explore", path: "/explore", icon: explore, onClick: "" },
    {
      field: "Messages",
      path: "/direct/inbox",
      icon: message,
      onClick: closeSearch,
    },
    { field: "Create", path: "", icon: add, onClick: createStory },
    {
      field: "Profile",
      path: `/${user._id}/`,
      icon: user.imgUrl,
      onClick: closeSearch,
    },
  ];

  function createStory() {
    setModal(!openModal);
  }

  function updateFilterModal() {
    setNarrowMenu(!narrowMenu);
    setFilterModal(!openFilterModal);
  }

  function closeSearch() {
    setFilterModal(false);
    narrowMenu(false);
  }

  var menuIcon = narrowMenu ? "narrow-icon" : "logo-btn";
  var icon = narrowMenu ? "narrow" : "wide";

  return (
    <section className="side-bar flex column">
      {openModal ? <CreateStory setModal={setModal} /> : ""}
      <div>
        <button className={menuIcon} onClick={() => navigate("")}>
          {narrowMenu ? (
            <img src={instagram_icon} className="img24 "></img>
          ) : (
            <img src={instagram} className="img120"></img>
          )}
        </button>
      </div>
      <div className="nav">
        <nav className="fs16 ">
          {navButtons.map((btn, ind) => {
            return (
              <NavLink
                to={btn.path}
                key={ind}
                onClick={btn.onClick}
                className={icon}
              >
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
      {openFilterModal ? <SearchProfile /> : ""}
    </section>
  );
}
