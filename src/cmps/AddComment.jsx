import { useState } from "react";
import { updateStory } from "../store/story.actions";

export function AddComment({ Story, user }) {
  const [iscomment, setComment] = useState("");
  const [isPostEnabled, setBtn] = useState(true);

  // console.log("story in add comments", Story);

  function addComment() {
    // debugger;
    Story.comments.push({
      id: "c1234",
      by: {
        _id: user._id,
        fullname: user.fullname,
        username: user.username,
        imgUrl: user.imgUrl,
      },
      txt: iscomment,
      likedBy: [],
    });
    updateStory(Story);
    setComment("");
  }

  function handleChange(ev) {
    console.log("ev", ev);
    console.log(ev.target.value);
    let comment = ev.target.value;
    setComment(comment);
    console.log("ev.key", ev.target.key);
    if (ev.key === "Enter") {
      alert("test");
    }
  }

  return (
    <section>
      <div className="add-comment">
        {/* <div className="add-comment-input flex align-center"> */}
        <input
          type="text"
          id="comment"
          value={iscomment}
          placeholder={"Add a comment..."}
          onChange={handleChange}
          // onKeyDown={(e) => alert(e.key === "Enter")}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addComment();
            }
          }}
        ></input>
        {/* </div> */}
        {/* <div className="flex"> */}
        {isPostEnabled ? (
          <button onClick={() => addComment()}>Post</button>
        ) : (
          ""
        )}
        {/* </div> */}
      </div>
    </section>
  );
}
