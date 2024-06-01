import { useLocation, useNavigate } from "react-router";

import comment from "../assets/img/comment.svg";
import bookmark from "../assets/img/bookmark.svg";
import bookmark_filled from "../assets/img/bookmark_filled.svg";
import favorite from "../assets/img/favorite.svg";
import favorite_filled from "../assets/img/favorite_FILL1.svg";
import share from "../assets/img/share.svg";

import { updateUser } from "../store/user.actions";

import { StoryModal } from "./StoryModal";
import { useEffect, useState } from "react";

//returns the icons [like,comment,send,save] and number of likes

export function StoryIcons({ Story, user, updateStory }) {
  // console.log("story,", Story);
  const [isliked, setLike] = useState(null);
  const [isSaved, setSave] = useState(null);

  useEffect(() => {
    changeState("likedBy");
    changeState("savedStoryIds");
  }, []);

  const navigate = useNavigate();
  const location = useLocation().pathname;

  var postBtns = [
    // { field: favorite, command: "like" },
    { field: comment, command: "comment" },
    { field: share, command: "share" },
  ];

  function changeState(field, update = false) {
    console.log("update", update);

    if (field === "likedBy") {
      console.log("the story before", Story);
      if (Story.likedBy) {
        var checkLikes = Story.likedBy.findIndex(
          (like) => like._id === user._id
        );
        console.log("check likes ", checkLikes);

        if (checkLikes != -1) {
          if (update) {
            Story.likedBy.splice(checkLikes, 1);
            console.log("the story after splice", Story);
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
        // debugger;
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
        // debugger;
        if (update) {
          user.savedStoryIds.push(Story._id);
          setSave(true);
          updateUser(user);
        } else {
          setSave(false);
        }
      }
    }
    console.log("the story after", Story);
    console.log("the user after", user);
  }

  function btnAction(command) {
    switch (command) {
      case "like":
        // postBtns[ind].field = favorite_filled;
        // console.log(postBtns[ind]);
        break;
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
      case "save":
        console.log("save1");
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
              <img src={favorite_filled}></img>
            ) : (
              <img src={favorite}></img>
            )}
          </button>
          {postBtns.map((btn, ind) => (
            <button
              className="post-btn"
              key={ind}
              // onClick={() => btnAction(btn.command, ind)}
              onClick={() => btnAction(btn.command)}
            >
              <img src={btn.field}></img>
            </button>
          ))}
        </div>
        <div>
          {/* <button onClick={() => btnAction("save")}> */}
          <button onClick={() => changeState("savedStoryIds", true)}>
            {isSaved ? (
              <img src={bookmark_filled}></img>
            ) : (
              <img src={bookmark}></img>
            )}
          </button>
        </div>
      </div>
      <div>{Story.likedBy.length} likes</div>
    </section>
  );
}
