import { SideBar } from "../cmps/SideBar";
import { MainView } from "../cmps/MainView";

export function HomePage() {
  // return <h1>Home page</h1>;
  return (
    <section className="home-page">
      <div className="side-nav">
        <SideBar />
      </div>
      <div className="main-view">
        <MainView />
      </div>
    </section>
  );
}
