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
  }

  function handleChange(ev) {
    console.log(ev.target.value);
    let comment = ev.target.value;
    setComment(comment);
  }

  return (
    <section>
      <div className="add-comment">
        <div>
          <input
            type="text"
            id="comment"
            placeholder="Add a comment..."
            onChange={handleChange}
          ></input>
        </div>
        <div>
          {isPostEnabled ? (
            <button onClick={() => addComment()}>Post</button>
          ) : (
            ""
          )}
        </div>
      </div>
    </section>
  );
}
