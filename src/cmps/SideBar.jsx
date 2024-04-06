import { NavLink, useNavigate } from "react-router-dom";
import instagram from "../assets/img/instagram.svg";
import home from "../assets/img/home_FILL0.svg";
import search from "../assets/img/search_wght400.svg";
import explore from "../assets/img/explore_FILL0.svg";
import message from "../assets/img/messenger.svg";
import add from "../assets/img/add.svg";
import profile from "../assets/img/react.png";
import menu from "../assets/img/menu.svg";

export function SideBar() {
  const navigate = useNavigate();
  const navButtons = [
    { field: "Home", path: "", icon: home },
    { field: "Search", path: "", icon: search },
    { field: "Explore", path: "/explore", icon: explore },
    { field: "Messages", path: "/direct/inbox", icon: message },
    { field: "Create", path: "", icon: add },
    { field: "Profile", path: "/testprofileID", icon: profile },
  ];

  return (
    <section className="side-bar flex column">
      <div>
        <button className="logo-btn" onClick={() => navigate("")}>
          <img src={instagram}></img>
        </button>
      </div>
      <div className="nav">
        <nav className="fs16">
          {navButtons.map((btn, ind) => {
            return (
              <NavLink to={btn.path} key={ind}>
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
