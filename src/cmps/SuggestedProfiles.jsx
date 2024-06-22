import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FollowUnfollow } from "./FollowUnfollow";
// import close from "../assets/img/gray_close.svg";

export function SuggestedProfiles({ user, users }) {
  // const [follow, setfollow] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="test">
      <div className="profile mb-10">
        <div className="flex align-center">
          <img src={user.imgUrl} className="img44"></img>
          <div className="flex colunm profile-text">
            <button onClick={() => navigate(`/${user._id}`)}>
              {user.username}
            </button>
            {/* <span className="fs14"> {user.fullname}</span> */}
            <span className="fs14"> {user.fullname}</span>
          </div>
        </div>
        <div className="follow-option">
          <button>Switch</button>
        </div>
      </div>
      {/* <br /> */}
      <div className="profile fs14 bold">
        <span>Suggested for you</span>
        {/* <button>See All</button> */}
      </div>
      {users
        ? users.map((User, ind) => {
            if (User._id != user._id) {
              return (
                <div className="profile">
                  <div className="flex align-center">
                    <img src={User.imgUrl} className="img44"></img>
                    <div className="flex colunm profile-text">
                      <button onClick={() => navigate(`/${User._id}`)}>
                        {User.username}
                      </button>
                      <span className="fs12">New to Instagram </span>
                    </div>
                  </div>
                  <FollowUnfollow User={User} user={user} />
                  {/* {console.log("User.followers", User.followers)}
                  {console.log("user.following", User.followers)}
                  {User.followers.includes({
                    _id: user._id,
                    fullname: user.fullname,
                    imgUrl: user.imgUrl,
                  }) ? (
                    <div className="unfollow-option">
                      <button>Unfollow</button>
                    </div>
                  ) : (
                    <div className="follow-option">
                      <button onClick={() => setFollow(User._id, true)}>
                        Follow
                      </button>
                    </div>
                  )} */}
                </div>
              );
            }
          })
        : ""}
    </div>
  );
}
