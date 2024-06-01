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
// import dot from "../assets/img/dot.svg";

export function MainView({ stories, user, updateStory }) {
  console.log(stories);
  // console.log(user);
  var relavantStories = getRelevantStories();
  // console.log("stories to display", relavantStories);

  function getRelevantStories() {
    const followingIds = [];
    const storiesToDisplay = [];
    if (user) {
      user.following.map((profile) => console.log(profile._id));
      user.following.map((profile) => followingIds.push(profile._id));
      followingIds.push(user._id);
      // console.log(followingIds);

      if (followingIds != [] && stories) {
        stories.map((story) =>
          followingIds.includes(story.by._id)
            ? storiesToDisplay.push(story)
            : ""
        );
      }
      console.log("stories to display", storiesToDisplay);
    }
    return storiesToDisplay;
  }

  const postBtns = [favorite, comment, share];

  return (
    <section className="main-view">
      {/* <div className="card"> */}
      {/* {relavantStories.map((story, ind) => {
          return ( */}
      <article className="cards flex column">
        {relavantStories.map((story, ind) => {
          return (
            <div className="card" key={ind}>
              <div className="card-header flex">
                <div className="flex fs14">
                  <button>
                    <img src={story.by.imgUrl}></img>
                  </button>
                  <button>{story.by.username}</button>
                  <span> • </span>
                  <span>
                    {/* {console.log("test")} */}
                    <StoryDate StoryDate={story.createdAt} />
                  </span>
                </div>
                <div>
                  <button>
                    <img src={menu_dots}></img>
                  </button>
                </div>
              </div>
              <div>
                <img src={story.imgUrl}></img>
              </div>
              <StoryIcons Story={story} user={user} updateStory={updateStory} />
              <div className="card-comment">
                {/* <p> */}
                <div className="story-txt">
                  <span>{story.by.username} </span>
                  {story.txt}
                </div>
                <div>
                  <button>View all {story.comments.length} comments</button>
                </div>
                <div>
                  <input
                    type="text"
                    id="comment"
                    placeholder="Add a comment..."
                  ></input>
                </div>
              </div>
            </div>
          );
        })}
      </article>

      <aside className="suggested-profiles"> suggested profiles</aside>
    </section>
  );
}
