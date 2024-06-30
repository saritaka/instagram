import React, { useEffect } from "react";
import { Routes, Route } from "react-router";

import { HomePage } from "./pages/HomePage";
import { Explore } from "./pages/Explore";
import { Messages } from "./pages/Messages";
import { UserDetails } from "./pages/UserDetails";
import { StoryModal } from "./cmps/StoryModal";
import { SideBar } from "./cmps/SideBar";
import { Login } from "./pages/LoginSignup";
import { useSelector } from "react-redux";

export function RootCmp() {
  return (
    <section className="login-page">
      <Login />
      <section className="main-app">
        <div className="side">
          <SideBar />
        </div>
        <main className="container">
          <Routes>
            <Route path="/" element={<HomePage />}>
              <Route path="/p/:storyid" element={<StoryModal />} />
            </Route>

            <Route path="/direct/inbox" element={<Messages />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/:username" element={<UserDetails />} />
            {/* <Route path="/p/:storyid" element={<StoryModal />} /> */}
          </Routes>
        </main>
      </section>
    </section>
  );
}
