import { useState } from "react";
import { userService } from "../services/user.service.local";
import { useNavigate } from "react-router";

export function SearchProfile() {
  const [profiles, setProfiles] = useState([]);
  console.log("profiles", profiles);

  const navigate = useNavigate();

  function onSubmitFilter() {}

  async function handleChange(ev) {
    console.log("ev", ev);
    console.log(ev.target.value);
    var filteredUsers = await userService.query({ txt: ev.target.value });
    console.log(filteredUsers);
    setProfiles(filteredUsers);
  }

  return (
    <section className="filter-modal flex">
      <h1>Search</h1>
      {/* seperate the search functionality to another component */}
      <div className="search-box">
        <form onSubmit={onSubmitFilter}>
          <div className="user-input">
            <input
              type="text"
              placeholder="Search"
              name="txt"
              onChange={handleChange}
            ></input>
          </div>
        </form>
      </div>
      <div className="profiles">
        {profiles
          ? profiles.map((profile, ind) => {
              return (
                <div className="profile">
                  <button
                    className="profile-btn"
                    onClick={() => navigate(`/${profile._id}`)}
                  >
                    <div className="flex align-center">
                      <img src={profile.imgUrl} className="img44"></img>
                      <div className="flex colunm profile-text">
                        {/* <button onClick={() => navigate(`/${profile._id}`)}> */}
                        {profile.username}
                        {/* </button> */}
                        <span className="fs12">
                          {profile.fullname} • {profile.followers.length}{" "}
                          followers
                        </span>
                      </div>
                    </div>
                  </button>
                </div>
              );
            })
          : ""}
      </div>
    </section>
  );
}
