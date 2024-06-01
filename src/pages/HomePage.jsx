import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";

import { loadStories } from "../store/story.actions";
// import * as actions from "../store/story.actions";
import { loadUser } from "../store/user.actions";
import { updateStory } from "../store/story.actions";

import { SideBar } from "../cmps/SideBar";
import { MainView } from "../cmps/MainView";
import { Messages } from "./Messages";
import { Explore } from "./Explore";
import { UserDetails } from "./UserDetails";
import { StoryModal } from "../cmps/StoryModal";

export function HomePage() {
  const params = useParams();
  const location = useLocation().pathname;

  // console.log("params", params.storyid);
  // console.log("location.pathname", useLocation().pathname);

  const stories = useSelector((storeState) => storeState.storyModule.stories);
  const user = useSelector((storeState) => storeState.userModule.user);

  // console.log("Homepage- stories", stories);
  console.log("Homepage- user", user);

  useEffect(() => {
    console.log("up");
    loadStories();
    loadUser();
  }, []);

  async function onUpdateStory(story) {
    try {
      await updateStory(story);
      // showSuccessMsg("Story Updated successfully");
    } catch (err) {
      console.log("Had issues saving story", err);
      // showErrorMsg("Could not update story");
    }
  }

  return (
    <section>
      <div className="home-page">
        <div className="side-nav">
          <SideBar user={user} />
        </div>
        <div className="main-view">
          {location == "/" && (
            <MainView
              stories={stories}
              user={user}
              updateStory={onUpdateStory}
            />
          )}
          {location == "/explore" && <Explore />}
          {location == "/direct/inbox" && <Messages />}
          {location == `/${user._id}` && <UserDetails />}
        </div>
      </div>
      {location == "/p/:storyId}" && <StoryModal />}
    </section>
  );
}
