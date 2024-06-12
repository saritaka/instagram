import { useNavigate, useParams } from "react-router";

import save from "../assets/img/bookmark.svg";
import grid from "../assets/img/grid.svg";
import tagged from "../assets/img/tagged.svg";
import settings from "../assets/img/settings.svg";
import comments from "../assets/img/comment_white.svg";
import likes from "../assets/img/favorite_white.svg";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { loadUser } from "../store/user.actions";
import { loadStories } from "../store/story.actions";

// export function UserDetails({ user, stories }) {
export function UserDetails() {
  const [selectedBtn, setSelectedBtn] = useState("posts");

  const stories = useSelector((storeState) => storeState.storyModule.stories);
  // const user = useSelector((storeState) => storeState.userModule.loggeduser);
  const user = useSelector((storeState) => storeState.userModule.getuser);
  const users = useSelector((storeState) => storeState.userModule.users);

  var userId = useParams().username;
  // console.log("userId", userId);

  console.log("user in user details", user);
  // console.log("user in usertest details", usertest);
  // const params =
  // console.log("params", params);
  console.log("stories", stories);

  const navigate = useNavigate();
  const btnRef = useRef(null);

  useEffect(() => {
    loadStories();
    loadUser(userId);
    btnRef.current.focus();
  }, []);

  function getUserStories() {
    if (stories) {
      if (selectedBtn === "posts") {
        var storiesOfUser = stories.filter(
          (story) => story.by._id === user._id
        );
      }
      // return storiesOfUser;}
      else if (selectedBtn === "saved") {
        var storiesOfUser = stories.filter((story) =>
          user.savedStoryIds.includes(story._id)
        );
      } else if (selectedBtn === "tagged") {
        var storiesOfUser = [];
      }
      // return storiesOfUser;}
    }
    return storiesOfUser;
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
        <button onClick={() => setSelectedBtn("posts")} ref={btnRef}>
          <img src={grid}></img>
          POSTS
        </button>

        <button onClick={() => setSelectedBtn("saved")}>
          <img src={save}></img>
          SAVED
        </button>
        <button onClick={() => setSelectedBtn("tagged")}>
          <img src={tagged}></img>
          TAGGED
        </button>
      </div>
      <div className="profile-posts">
        {userStories
          ? userStories.map((story) => (
              <div className="post">
                {/* <button onClick={() => navigate(`/p/${story._id}`)}> */}
                <img src={story.imgUrl}></img>
                {/* </button> */}
                <button onClick={() => navigate(`/p/${story._id}`)}>
                  {/* <button> */}
                  <div className="overlay flex align-center">
                    {/* <div> */}
                    <img src={likes} className="img12"></img>
                    <span>{story.likedBy.length}</span>
                    {/* </div> */}
                    {/* <div> */}
                    <img src={comments}></img>
                    <span>{story.comments.length}</span>
                    {/* </div> */}
                  </div>
                </button>
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
