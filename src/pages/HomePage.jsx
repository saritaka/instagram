import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";

import { loadStories } from "../store/story.actions";
import { loadUser } from "../store/user.actions";

import { SideBar } from "../cmps/SideBar";
import { MainView } from "../cmps/MainView";
import { Messages } from "./Messages";
import { Explore } from "./Explore";
import { UserDetails } from "./UserDetails";
import { StoryModal } from "../cmps/StoryModal";

export function HomePage() {
  const params = useParams();
  const location = useLocation().pathname;

  console.log(params);
  console.log(location.pathname);

  const stories = useSelector((storeState) => storeState.storyModule.stories);
  const user = useSelector((storeState) => storeState.userModule.user);

  useEffect(() => {
    console.log("up");
    loadStories();
    loadUser();
  }, []);

  return (
    <section className="home-page">
      <div className="side-nav">
        <SideBar />
      </div>
      <div className="main-view">
        {location == "/" && <MainView stories={stories} user={user} />}
        {location == "/explore" && <Explore />}
        {location == "/direct/inbox" && <Messages />}
        {location == "/testprofileID" && <UserDetails />}
      </div>
      {/* {location == "/p/:storyId" && <StoryModal />} */}
    </section>
  );
}
