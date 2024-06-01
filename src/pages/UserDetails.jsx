import { useLocation } from "react-router";

import save from "../assets/img/bookmark.svg";
import grid from "../assets/img/grid.svg";
import tagged from "../assets/img/tagged.svg";
import settings from "../assets/img/settings.svg";

export function UserDetails({ user, stories }) {
  console.log("user", user);
  const location = useLocation().pathname;

  function getUserStories() {
    var storiesOfUser = stories.map((story) => story.by._id === user.id);

    return storiesOfUser;
  }

  var userStories = getUserStories();

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="header-profile-img">
          <img src={user.imgUrl}></img>
        </div>
        <div className="header-details">
          <div>
            <span>{user.username}</span>
            <button className="profile-btns fs14">Edit profile</button>
            <button className="profile-btns fs14">View archive</button>
          </div>
          <div>
            <button className="profile-info fs16">
              {userStories.length} posts
            </button>
            <button className="profile-info fs16">
              {user.followers.length} followers
            </button>
            <button className="profile-info fs16">
              {user.following.length} following
            </button>
          </div>
          <div className="fs14">{user.fullname}</div>
        </div>
        {/* <img src={settings}></img> */}
      </div>
      <hr />
      <div className="profile-posts-options">
        <button>
          <img src={grid}></img>
          POSTS
        </button>
        <button>
          <img src={save}></img>
          SAVED
        </button>
        <button>
          <img src={tagged}></img>
          TAGGED
        </button>
      </div>
      <div className="profile-posts">
        <div>
          {/* <img src={userStories[0].imgUrl}></img> */}
          test
        </div>
        <div>test</div>
        <div>test</div>
      </div>
    </div>
  );
}
