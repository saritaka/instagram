import { useLocation, useNavigate } from "react-router";

import comment from "../assets/img/comment.svg";
import bookmark from "../assets/img/bookmark.svg";
import favorite from "../assets/img/favorite.svg";
import favorite_filled from "../assets/img/favorite_FILL1.svg";
import share from "../assets/img/share.svg";

import { StoryModal } from "./StoryModal";

//returns the icons [like,comment,send,save] and number of likes

export function StoryIcons({ Story }) {
  console.log("story,", Story);

  const navigate = useNavigate();
  const location = useLocation().pathname;

  var postBtns = [
    { field: favorite, command: "like" },
    { field: comment, command: "comment" },
    { field: share, command: "share" },
  ];

  function btnAction(command, ind) {
    switch (command) {
      case "like":
        console.log(!+"test");
        // postBtns[ind].field = favorite_filled;
        // console.log(postBtns[ind]);
        break;
      case "comment":
        if (location.slice(0, 1) == "/p") {
          break;
        }
        console.log("comment1");
        navigate(`/p/${Story._id}`);
        <StoryModal />;
        break;
      case "share":
        console.log("send1");
        break;
      case "save":
        console.log("save1");
        break;
    }
  }

  return (
    <section>
      <div className="card-btn flex">
        <div>
          {postBtns.map((btn, ind) => (
            <button
              className="post-btn"
              key={ind}
              onClick={() => btnAction(btn.command, ind)}
            >
              <img src={btn.field}></img>
            </button>
          ))}
        </div>
        <div>
          <button onClick={() => btnAction("save")}>
            <img src={bookmark}></img>
          </button>
        </div>
      </div>
      <div>{Story.likedBy.length} likes</div>
    </section>
  );
}
