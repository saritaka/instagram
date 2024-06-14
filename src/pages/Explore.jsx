import { useSelector } from "react-redux";
import comments from "../assets/img/comment_white.svg";
import likes from "../assets/img/favorite_white.svg";
import { useNavigate } from "react-router";

export function Explore() {
  const stories = useSelector((storeState) => storeState.storyModule.stories);
  console.log("storiesin explore", stories);
  // const users = useSelector((storeState) => storeState.userModule.users);
  const navigate = useNavigate();

  return (
    <section className="explore-posts">
      <div className="posts-grid">
        {stories
          ? stories.map((story) => (
              <div className="post">
                <img src={story.imgUrl}></img>
                <button onClick={() => navigate(`/p/${story._id}`)}>
                  <div className="overlay flex align-center">
                    <img src={likes} className="img12"></img>
                    <span>{story.likedBy.length}</span>
                    <img src={comments}></img>
                    <span>{story.comments.length}</span>
                  </div>
                </button>
              </div>
            ))
          : ""}
      </div>
    </section>
  );
}
