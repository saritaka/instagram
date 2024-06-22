import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate, useParams } from "react-router";

import { loadStories } from "../store/story.actions";
// import * as actions from "../store/story.actions";
import { loadUser, loadUsers, loadLoggedInUser } from "../store/user.actions";
import { updateStory } from "../store/story.actions";

import { SideBar } from "../cmps/SideBar";
import { MainView } from "../cmps/MainView";
import { Messages } from "./Messages";
import { Explore } from "./Explore";
import { UserDetails } from "./UserDetails";
import { StoryModal } from "../cmps/StoryModal";

export function HomePage() {
  // debugger;
  // const [openModal, setModal] = useState(false);
  // console.log("openModal", openModal);

  // const params = useParams();
  // const location = useLocation().pathname;
  // const navigate = useNavigate();

  // console.log("params", params.storyid);
  // console.log("location.pathname", useLocation().pathname);

  // console.log("Homepage- stories", stories);
  // console.log("Homepage- user", user);
  // console.log("Homepage- users", users);
  // console.log("Homepage- stories", stories);

  useEffect(() => {
    console.log("up");
    loadStories();
    loadUsers();
    loadLoggedInUser();
  }, []);

  var stories = useSelector((storeState) => storeState.storyModule.stories);
  var user = useSelector((storeState) => storeState.userModule.loggeduser);
  // debugger;
  var users = useSelector((storeState) => storeState.userModule.users);

  async function onUpdateStory(story) {
    try {
      await updateStory(story);
      // showSuccessMsg("Story Updated successfully");
    } catch (err) {
      console.log("Had issues saving story", err);
      // showErrorMsg("Could not update story");
    }
  }

  // function openStoryModal(story) {
  //   setModal(!openModal);
  //   navigate(`/p/${story._id}`);
  //   console.log("setModal", openModal);
  // }

  return (
    <section>
      <MainView
        stories={stories}
        user={user}
        users={users}
        // updateStory={onUpdateStory}
        // openStoryModal={openStoryModal}
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
      {/* {openModal ? <StoryModal /> : ""} */}
      {/* {openModal ? <Outlet /> : ""} */}
      <Outlet />
      {/* </div> */}
      {/* {location == "/p/:storyId}" && <StoryModal />} */}
    </section>
  );
}
