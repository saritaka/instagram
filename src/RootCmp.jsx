import React from "react";
import { Routes, Route } from "react-router";

import { HomePage } from "./pages/HomePage";
import { Explore } from "./pages/Explore";
import { Messages } from "./pages/Messages";
import { UserDetails } from "./pages/UserDetails";
import { StoryModal } from "./cmps/StoryModal";

export function RootCmp() {
  return (
    <div>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route path="/explore" element={<Explore />} />
            <Route path="/direct/inbox" element={<Messages />} />
            <Route path="/:username" element={<UserDetails />} />
            {/* <Route path="/p/:storyid" element={<StoryModal />} /> */}
          </Route>
          <Route path="/p/:storyid" element={<StoryModal />} />
        </Routes>
      </main>
    </div>
  );
}
