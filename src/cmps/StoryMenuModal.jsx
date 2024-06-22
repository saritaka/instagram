import { useSelector } from "react-redux";
import * as actions from "../store/story.actions";
import { useNavigate } from "react-router";
import { useState } from "react";
import { EditStory } from "./EditStory";

export function StoryMenuModal({
  story,
  openStoryMenu,
  // editOption,
  navigateTo,
}) {
  const [editStory, setEditStory] = useState(false);

  // console.log("setOpenedit", editOption);
  console.log("in story menu", story);

  const user = useSelector((storeState) => storeState.userModule.loggeduser);

  const navigate = useNavigate();

  function deleteStory() {
    actions.removeStory(story._id);
    // navigate(`/${story.by._id}`);
    navigateTo === "user" ? navigate(`/${story.by._id}`) : navigate(navigateTo);
    openStoryMenu();
  }

  function editSelectedStory() {
    setEditStory(true);
    // openStoryMenu(false);
    // editOption();
  }

  var menuBtn = false;
  story.by._id === user._id ? (menuBtn = true) : (menuBtn = false);

  // var hidden = "";
  // editStory ? (hidden = "hidden") : hidden;

  return (
    <section className={"story-menu-options "}>
      {/* <section className={"story-menu-options"}> */}
      {menuBtn && (
        <button className="red-btn radius-top" onClick={() => deleteStory()}>
          Delete
        </button>
      )}
      {menuBtn && <button onClick={() => editSelectedStory()}>Edit</button>}
      <button className="radius-bottom" onClick={() => openStoryMenu()}>
        Cancel
      </button>
      {editStory && (
        <div className="story-menu-modal">
          <EditStory
            story={story}
            navigateTo={navigateTo}
            openStoryMenu={openStoryMenu}
          />
        </div>
      )}
    </section>
  );
}
