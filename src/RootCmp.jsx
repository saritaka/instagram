import React from "react";
import { Routes, Route } from "react-router";

// import routes from "./routes";

// import { AppHeader } from "./cmps/AppHeader";
// import { AppFooter } from "./cmps/AppFooter";
import { HomePage } from "./pages/HomePage";
import { Explore } from "./pages/Explore";
import { Messages } from "./pages/Messages";
import { UserDetails } from "./pages/UserDetails";
import { StoryModal } from "./cmps/StoryModal";

export function RootCmp() {
  return (
    <div>
      {/* <AppHeader /> */}
      <main>
        <Routes>
          {/* {routes.map((route) => (
              <Route
                key={route.path}
                exact={true}
                element={route.component}
                path={route.path}
              />
            ))} */}
          <Route path="/" element={<HomePage />}>
            <Route path="/explore" element={<Explore />} />
            <Route path="/direct/inbox" element={<Messages />} />
            <Route path="/:username" element={<UserDetails />} />
            <Route path="/p/:storyid" element={<StoryModal />} />
          </Route>
        </Routes>
      </main>
      {/* <AppFooter /> */}
    </div>
  );
}
