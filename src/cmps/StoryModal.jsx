import { useSelector } from "react-redux";
import { useLocation } from "react-router";

import close from "../assets/img/close.svg";
import favorite from "../assets/img/favorite.svg";
import menu from "../assets/img/menu_dots.svg";
import { StoryDate } from "./StoryDate";

export function StoryModal() {
  const stories = useSelector((storeState) => storeState.storyModule.stories);
  const location = useLocation().pathname;
  console.log("stores in story modal", stories);
  console.log("location in story modal", location.slice(3));

  const story = getStory();
  console.log("the story", story);
  console.log("the story", story[0].imgUrl);

  function getStory() {
    if (stories) {
      const story_ = stories.filter((story) => story._id === location.slice(3));
      return story_;
    }
  }

  return (
    <section className="story-modal flex">
      <button className="modal-btn">
        <img src={close}></img>
      </button>
      <div className="story-content">
        <div className="picture">
          <img src={story[0].imgUrl}></img>
        </div>
        <div className="details fs14">
          <div className="details-header flex">
            <div className="flex">
              <button>
                <img src={story[0].by.imgUrl} className="profile-pic"></img>
              </button>
              <a className="profile-btn">{story[0].by.username}</a>
            </div>
            <div>
              <button>
                <img src={menu} className="icon"></img>
              </button>
            </div>
          </div>
          <div className="flex details-text">
            <div>
              <button>
                <img src={story[0].by.imgUrl} className="profile-pic"></img>
              </button>
            </div>
            <div className="fs16">
              <a className="fs14 profile-btn">{story[0].by.username}</a>
              {story[0].txt}
              <div className="fs14"></div>
              <StoryDate StoryDate={story[0].createdAt} />
            </div>
          </div>
          <div className="flex details-comments column">
            {story[0].comments.map((comment, ind) => (
              <div className="flex align-center" key={ind}>
                <div>
                  <button>
                    <img src={comment.by.imgUrl} className="profile-pic"></img>
                  </button>

                  <a className="profile-btn">{comment.by.username}</a>
                  <span>{comment.txt}</span>
                </div>
                <div className="comment-like">
                  <img src={favorite}></img>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
