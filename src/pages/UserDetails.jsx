import { useParams } from "react-router";

import save from "../assets/img/bookmark.svg";
import grid from "../assets/img/grid.svg";
import tagged from "../assets/img/tagged.svg";
import settings from "../assets/img/settings.svg";
import { useSelector } from "react-redux";

// export function UserDetails({ user, stories }) {
export function UserDetails() {
  const stories = useSelector((storeState) => storeState.storyModule.stories);
  const user = useSelector((storeState) => storeState.userModule.user);
  const params = useParams();
  // console.log("params", params);
  console.log(stories);

  function getUserStories() {
    if (stories) {
      var storiesOfUser = stories.filter((story) => story.by._id === user._id);
      return storiesOfUser;
    }
  }

  var userStories = getUserStories();
  console.log("userStories", userStories);

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
              <span>{userStories.length} </span> posts
            </button>
            <button className="profile-info fs16">
              <span> {user.followers.length} </span>followers
            </button>
            <button className="profile-info fs16">
              <span>{user.following.length} </span>following
            </button>
          </div>
          <div className="fs14 bold">{user.fullname}</div>
        </div>
        {/* <img src={settings}></img> */}
      </div>

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
        {userStories
          ? userStories.map((story) => (
              <div>
                <img src={story.imgUrl}></img>
              </div>
            ))
          : ""}
        {/* <div>
          <img src={userStories[0].imgUrl}></img>
        </div>
        <div>test</div>
        <div>test</div> */}
      </div>
    </div>
  );
}
