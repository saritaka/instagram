import profile from "../assets/img/react.png";
import account from "../assets/img/account.svg";
import comment from "../assets/img/comment.svg";
import bookmark from "../assets/img/bookmark.svg";
import favorite from "../assets/img/favorite.svg";
import share from "../assets/img/share.svg";
import menu_dots from "../assets/img/menu_dots.svg";
import { StoryDate } from "./StoryDate";
import { StoryIcons } from "./StoryIcons";

import * as actions from "../store/story.actions";
import { AddComment } from "./AddComment";
import { useNavigate } from "react-router";
import { SuggestedProfiles } from "./SuggestedProfiles";
import { StoryMenuModal } from "./storyMenuModal";
import { useState } from "react";
// import dot from "../assets/img/dot.svg";

// export function MainView({ stories, user, updateStory, openStoryModal }) {
export function MainView({ stories, user, users }) {
  const [openModal, setModal] = useState(false);
  const [storyToEdit, setStory] = useState(null);
  const navigate = useNavigate();
  // console.log(stories);

  var relavantStories = getRelevantStories();

  function getRelevantStories() {
    const followingIds = [];
    // const storiesToDisplay = [];
    const storiesToDisplay = stories || [];
    // if (user) {
    //   user.following.map((profile) => console.log(profile._id));
    //   user.following.map((profile) => followingIds.push(profile._id));
    //   followingIds.push(user._id);

    //   if (followingIds != [] && stories) {
    //     stories.map((story) =>
    //       followingIds.includes(story.by._id)
    //         ? storiesToDisplay.push(story)
    //         : ""
    //     );
    //   }
    //   // console.log("stories to display", storiesToDisplay);
    // }
    return storiesToDisplay;
  }

  function openMenuModal(story) {
    // debugger;
    setStory(story);
    console.log("on");
    setModal(!openModal);
  }

  const postBtns = [favorite, comment, share];
  const navigateTo = "";

  return (
    <section className="main-view">
      {openModal && (
        // <div className="modal">
        <section className="main-view-modal">
          <div className="story-menu-modal">
            <StoryMenuModal
              story={storyToEdit}
              openStoryMenu={() => openMenuModal()}
              navigateTo={navigateTo}
            />
          </div>
        </section>
      )}
      <article className="cards flex column">
        {relavantStories.map((story, ind) => {
          return (
            <div className="card" key={ind}>
              <div className="card-header flex">
                <div className="flex fs14">
                  <button>
                    <img src={story.by.imgUrl}></img>
                  </button>
                  <button onClick={() => navigate(`/${story.by._id}`)}>
                    {story.by.username}
                  </button>
                  <span> • </span>
                  <span>
                    <StoryDate StoryDate={story.createdAt} />
                  </span>
                </div>
                <div>
                  <button onClick={() => openMenuModal(story)}>
                    <img src={menu_dots}></img>
                  </button>
                </div>
              </div>
              <div>
                <img src={story.imgUrl}></img>
              </div>
              <StoryIcons
                Story={story}
                user={user}
                // updateStory={updateStory}
                // openStoryModal={openStoryModal}
              />
              <div className="card-comment">
                {/* <p> */}
                <div className="story-txt">
                  <a
                    onClick={() => navigate(`/${story.by._id}`)}
                    className="m0 p0"
                  >
                    {story.by.username}{" "}
                  </a>
                  {story.txt}
                </div>
                <div>
                  {/* <button onClick={() => navigate(`/p/${story._id}`)}> */}
                  <button
                    className="view-comments-btn"
                    // onClick={() => openStoryModal(story)}
                    onClick={() => navigate(`/p/${story._id}`)}
                  >
                    View all {story.comments.length} comments
                  </button>
                </div>
                <AddComment Story={story} user={user} />
              </div>
            </div>
          );
        })}
      </article>

      <aside className="suggested-profiles">
        <SuggestedProfiles user={user} users={users} />
      </aside>
      {/* <aside className="suggested-profiles"></aside> */}
    </section>
  );
}
