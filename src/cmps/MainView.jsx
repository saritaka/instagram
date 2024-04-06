import profile from "../assets/img/react.png";
import account from "../assets/img/account.svg";
import comment from "../assets/img/comment.svg";
import bookmark from "../assets/img/bookmark.svg";
import favorite from "../assets/img/favorite.svg";
import share from "../assets/img/share.svg";
import menu_dots from "../assets/img/menu_dots.svg";
// import dot from "../assets/img/dot.svg";

export function MainView({ stories, user }) {
  console.log("In main - stories", { stories });
  console.log("In main -user", { user });

  const postBtns = [favorite, comment, share];
  return (
    <section className="main-view">
      <article className="card flex column">
        <div className="card-header flex">
          <div className="flex fs14">
            <img src={account}></img>
            <button>Profile username </button>
            {/* <span className="fs40"> ·</span> */}
            {/* <img src={dot} className="date"></img> */}
            <span> • </span>
            <span> Time </span>
          </div>
          <div>
            <button>
              <img src={menu_dots}></img>
            </button>
          </div>
        </div>
        <div>
          <img src={profile}></img>
        </div>
        {/* <div className="container"> */}
        <div className="card-btn flex">
          <div>
            {postBtns.map((btn, ind) => (
              <button className="post-btn" key={ind}>
                <img src={btn}></img>
              </button>
            ))}
          </div>
          <div>
            <button className="save-btn">
              <img src={bookmark}></img>
            </button>
          </div>
        </div>
        <div>130 likes</div>
        <div className="card-comment">
          <p>
            <span>profile name:</span>test comment
          </p>
          <div>
            <button>View all x comments</button>
          </div>
          <div> 4 days</div>
        </div>
      </article>
      <aside className="suggested-profiles">test suggested profiles</aside>
    </section>
  );
}
