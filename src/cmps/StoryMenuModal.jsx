import { useSelector } from "react-redux";
import * as actions from "../store/story.actions";
import { useNavigate } from "react-router";

export function StoryMenuModal({ story, openStoryMenu, navigateTo }) {
  console.log("in story menu", story);

  const user = useSelector((storeState) => storeState.userModule.loggeduser);

  const navigate = useNavigate();

  function deleteStory() {
    actions.removeStory(story._id);
    // navigate(`/${story.by._id}`);
    navigateTo === "user" ? navigate(`/${story.by._id}`) : navigate(navigateTo);
    openStoryMenu();
  }

  var menuBtn = false;
  story.by._id === user._id ? (menuBtn = true) : (menuBtn = false);

  return (
    <section className="story-menu-options">
      {menuBtn && (
        <button className="red-btn radius-top" onClick={() => deleteStory()}>
          Delete
        </button>
      )}
      {menuBtn && <button>Edit</button>}
      <button className="radius-bottom" onClick={() => openStoryMenu()}>
        Cancel
      </button>

      {/* <div className="create-story-modal ">
        <div className="create-header">
          {file && <button onClick={() => setFile(!file)}>Cancel</button>}
          <span>Edit info</span>
          {file && <button onClick={() => createNewStory()}>Done</button>}
        </div>
        {file ? (
          <div className="flex approve-post">
            <div className="create-picture">
              <img src={file}></img>
            </div>
            <div className="create-details">
              <div className="flex align-center fs14 post-input">
                <button className="m0 p0">
                  <img src={user.imgUrl} className="profile-pic img32"></img>
                </button>
                <span>{user.username}</span>
              </div>
              <input onChange={updateText}></input>
            </div>
          </div>
        ) : (
          <div className="create-body">
            Drag photos and videos here
            <input onChange={handleSelection} type="file"></input>
          </div>
        )}
      </div> */}
    </section>
  );
}
