import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";

import close from "../assets/img/close.svg";
import favorite from "../assets/img/favorite.svg";
import menu from "../assets/img/menu_dots.svg";
import { StoryDate } from "./StoryDate";
import { StoryIcons } from "./StoryIcons";
import { AddComment } from "./AddComment";
import { useEffect, useState } from "react";
import { StoryMenuModal } from "./storyMenuModal";
import { loadStories } from "../store/story.actions";

// export function StoryModal({ storyId }) {
export function StoryModal() {
  const [openModal, setModal] = useState(false);
  const params = useParams();
  const storyId = params.storyid;

  useEffect(() => {
    loadStories();
  }, [storyId]);

  console.log("in story modal - params.storyid", params.storyid);

  const navigate = useNavigate();
  const stories = useSelector((storeState) => storeState.storyModule.stories);

  const user = useSelector((storeState) => storeState.userModule.loggeduser);

  console.log("stores in story modal", stories);

  function getStory() {
    if (stories) {
      const story_ = stories.filter((story) => story._id === storyId);
      return story_;
    }
  }

  function openStoryMenu() {
    console.log("change to open modal");
    setModal(!openModal);
  }

  const story = getStory();
  story && console.log("the story", story);
  story && console.log("the story", story[0].imgUrl);

  return (
    <section className="modal">
      {openModal ? (
        <div className="story-menu-modal">
          {/* <div> */}
          {/* <div className="story-menu-options"> */}
          <StoryMenuModal
            story={story[0]}
            openStoryMenu={openStoryMenu}
            navigateTo={"user"}
          />
          {/* </div> */}
        </div>
      ) : (
        ""
      )}
      {/* <button className="close" onClick={() => navigate("/")}> */}
      <button className="close" onClick={() => navigate(-1)}>
        <img src={close}></img>
      </button>
      {story && (
        <div className="modal-content">
          <div className="story-picture">
            <img src={story[0].imgUrl}></img>
          </div>
          <div className="story-details fs14">
            <div className=" story-header flex align-center">
              <div className="flex align-center fs14">
                <button className="m0 p0">
                  <img
                    src={story[0].by.imgUrl}
                    className="profile-pic img32"
                  ></img>
                </button>
                <a className="profile-btn">{story[0].by.username}</a>
              </div>
              <div>
                <button className="m0 p0" onClick={() => openStoryMenu()}>
                  <img src={menu} className="icon img24"></img>
                </button>
              </div>
            </div>

            <div className="story-comments flex">
              <div className="current-story-txt flex">
                <div>
                  <button className="m0 p0">
                    <img
                      src={story[0].by.imgUrl}
                      className="profile-pic img32"
                    ></img>
                  </button>
                </div>
                <div className="story-content">
                  <a className="profile-btn">{story[0].by.username}</a>
                  <span> {story[0].txt}</span>
                </div>
              </div>

              {story[0].comments.map((comment, ind) => (
                <div className="comment flex">
                  <div className="flex">
                    <div>
                      <button className="m0 p0">
                        <img
                          src={comment.by.imgUrl}
                          className="profile-pic img32"
                        ></img>
                      </button>
                    </div>
                    <div className="story-content">
                      <a className="profile-btn"> {comment.by.username} </a>
                      <span> {comment.txt}</span>
                    </div>
                  </div>
                  <div className="flex align-center">
                    <img src={favorite} className="img12"></img>
                  </div>
                </div>
              ))}
            </div>

            <div className="story-modal-icons">
              <StoryIcons Story={story[0]} user={user} />
              <StoryDate StoryDate={story[0].createdAt} />
            </div>
            <div className="story-add-comment">
              <AddComment Story={story[0]} user={user} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
