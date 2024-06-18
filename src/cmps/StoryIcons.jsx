import { useLocation, useNavigate } from "react-router";

import comment from "../assets/img/comment.svg";
import bookmark from "../assets/img/bookmark.svg";
import bookmark_filled from "../assets/img/bookmark_filled.svg";
import favorite from "../assets/img/favorite.svg";
import favorite_filled from "../assets/img/favorite_FILL1.svg";
import share from "../assets/img/share.svg";

import { updateUser } from "../store/user.actions";
import { updateStory } from "../store/story.actions";

import { StoryModal } from "./StoryModal";
import { useEffect, useState } from "react";

//returns the icons [like,comment,send,save] and number of likes

export function StoryIcons({ Story, user }) {
  const [isliked, setLike] = useState(null);
  const [isSaved, setSave] = useState(null);

  useEffect(() => {
    changeState("likedBy");
    changeState("savedStoryIds");
  }, []);

  const navigate = useNavigate();
  const location = useLocation().pathname;

  var postBtns = [
    { field: comment, command: "comment" },
    { field: share, command: "share" },
  ];

  function changeState(field, update = false) {
    if (field === "likedBy") {
      if (Story.likedBy) {
        var checkLikes = Story.likedBy.findIndex(
          (like) => like._id === user._id
        );
        if (checkLikes != -1) {
          if (update) {
            Story.likedBy.splice(checkLikes, 1);
            setLike(false);
            updateStory(Story);
          } else {
            setLike(true);
          }
        } else {
          if (update) {
            Story.likedBy.push({
              _id: user._id,
              fullname: user.fullname,
              username: user.username,
              imageUrl: user.imageUrl,
            });
            setLike(true);
            updateStory(Story);
          }
        }
      }
    }

    if (field === "savedStoryIds") {
      if (user.savedStoryIds.includes(Story._id)) {
        if (update) {
          var ind = user.savedStoryIds.findIndex(
            (story) => story._id === Story._id
          );
          user.savedStoryIds.splice(ind, 1);
          setSave(false);
          updateUser(user);
        } else {
          setSave(true);
        }
      } else {
        if (update) {
          user.savedStoryIds.push(Story._id);
          setSave(true);
          updateUser(user);
        } else {
          setSave(false);
        }
      }
    }
  }

  function btnAction(command) {
    switch (command) {
      case "comment":
        if (location.slice(0, 1) == "/p") {
          break;
        }
        console.log("comment1");
        navigate(`/p/${Story._id}`);

        // <StoryModal />;
        break;
      case "share":
        console.log("send1");
        break;
    }
  }

  return (
    <section>
      <div className="card-btn flex">
        <div>
          {/* <button className="post-btn" onClick={() => btnAction("like")}> */}
          <button
            className="post-btn"
            onClick={() => changeState("likedBy", true)}
          >
            {isliked ? (
              <img src={favorite_filled} className="img30"></img>
            ) : (
              <img src={favorite} className="img30"></img>
            )}
          </button>
          {postBtns.map((btn, ind) => (
            <button
              className="post-btn"
              key={ind}
              // onClick={() => btnAction(btn.command, ind)}
              onClick={() => btnAction(btn.command)}
            >
              <img src={btn.field} className="img30"></img>
            </button>
          ))}
        </div>
        <div>
          {/* <button onClick={() => btnAction("save")}> */}
          <button
            onClick={() => changeState("savedStoryIds", true)}
            className="save-btn"
          >
            {isSaved ? (
              <img src={bookmark_filled} className="img30"></img>
            ) : (
              <img src={bookmark} className="img30"></img>
            )}
          </button>
        </div>
      </div>
      <div>{Story.likedBy.length} likes</div>
    </section>
  );
}
