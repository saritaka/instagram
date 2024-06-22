import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import * as actions from "../store/story.actions";

export function EditStory({ story, navigateTo, openStoryMenu }) {
  const [storyText, setStoryText] = useState(null);

  var file = story.imgUrl;
  console.log("navigateTo in edit story", navigateTo, 1);

  const user = useSelector((storeState) => storeState.userModule.loggeduser);

  const navigate = useNavigate();

  function closeEdit() {
    navigateTo === "user" ? navigate(`/${story.by._id}`) : openStoryMenu(false);
  }

  function updateText(ev) {
    setStoryText(ev.target.value);
  }

  function updateStory() {
    story.txt = storyText;
    actions.updateStory(story);
    console.log("the updated story:", story);
    openStoryMenu();
  }

  return (
    <section>
      <div className="create-story-modal">
        <div className="create-header">
          {file && <button onClick={() => closeEdit()}>Cancel</button>}
          <span>Edit info</span>
          {file && <button onClick={() => updateStory()}>Done</button>}
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
              <textarea onChange={updateText}>{story.txt}</textarea>
            </div>
          </div>
        ) : (
          <div className="create-body">
            Drag photos and videos here
            <input onChange={handleSelection} type="file"></input>
          </div>
        )}
      </div>
    </section>
  );
}
