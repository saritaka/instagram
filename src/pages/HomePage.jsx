import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate, useParams } from "react-router";

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
  const [openModal, setModal] = useState(false);
  console.log("openModal", openModal);

  const params = useParams();
  const location = useLocation().pathname;
  const navigate = useNavigate();

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

  function openStoryModal(story) {
    setModal(!openModal);
    navigate(`/p/${story._id}`);
    console.log("setModal", openModal);
  }

  return (
    <section>
      <MainView
        stories={stories}
        user={user}
        updateStory={onUpdateStory}
        openStoryModal={openStoryModal}
      />
      {/* <div className="home-page"> */}
      {/* <div className="side-nav"> */}
      {/* <SideBar user={user} /> */}
      {/* </div> */}
      {/* <div className="main-view"> */}
      {/* {location == "/" && (
            <MainView
              stories={stories}
              user={user}
              updateStory={onUpdateStory}
              openStoryModal={openStoryModal}
            />
          )} */}
      {/* {location == "/explore" && <Explore />} */}
      {/* {location == "/direct/inbox" && <Messages />} */}
      {/* {location == `/${user._id}` && (
            <UserDetails user={user} stories={stories} />
          )} */}
      {/* {openModal ? <StoryModal /> : ""} */}
      {/* </div> */}
      {openModal ? <StoryModal /> : ""}
      {openModal ? <Outlet /> : ""}
      <Outlet />
      {/* </div> */}
      {/* {location == "/p/:storyId}" && <StoryModal />} */}
    </section>
  );
}
