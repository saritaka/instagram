import { useEffect, useState } from "react";
import { updateUser } from "../store/user.actions";

export function FollowUnfollow({ User, user }) {
  const [follow, setFollow] = useState(null);
  console.log(follow);
  // console.log("User", User);
  // console.log("user", user);

  useEffect(() => {
    setFollowBtn();
  }, []);

  function setFollowBtn() {
    var btn = user.following.find(
      (userToFollow) => userToFollow._id === User._id
    );
    btn ? setFollow(true) : setFollow(false);
  }

  function updateFollow(update) {
    console.log("update", update);
    switch (update) {
      case "add":
        user.following.push({
          _id: User._id,
          fullname: User.fullname,
          imgUrl: User.imgUrl,
        });
        User.followers.push({
          _id: user._id,
          fullname: user.fullname,
          imgUrl: user.imgUrl,
        });
        setFollow(true);
        updateUser(User);
        console.log("User after", User);
        updateUser(user);
        console.log("user after", user);
        break;

      case "remove":
        var userind = user.following.findIndex(
          (userToFollow) => userToFollow._id === User._id
        );

        var Userind = User.followers.findIndex(
          (FollowingUser) => FollowingUser._id === user._id
        );
        user.following.splice(userind, 1);
        User.followers.splice(Userind, 1);

        updateUser(User);
        console.log("User after", User);
        updateUser(user);
        console.log("user after", user);
        setFollow(false);
        break;
    }
  }

  // function test(user) {
  //   console.log("testttttttttt");
  //   updateUser(user);
  // }

  //   function setFollow(id, add = false) {
  //     var [updateUser, ind] = users.filter((User, ind) => User._id === id);
  //     console.log("updated user", updateUser);
  //     //add or remove the logged in user from or to the followers list
  //     add
  //       ? User.followers.push({
  //           _id: user._id,
  //           fullname: user.fullname,
  //           imgUrl: user.imgUrl,
  //         })
  //       : User.followers.splice(ind, 1);

  //     //add or remove the selected user from ot to the logged in user following list
  //     add?
  //     user.following.push({

  //     }) :
  //     user.following.splice();
  //     console.log("updated user", updateUser);

  //     setfollow(!follow);
  //   }

  return (
    <section>
      {follow ? (
        <div className="follow-option">
          <button onClick={() => updateFollow("remove")}>Unfollow</button>
        </div>
      ) : (
        <div className="follow-option">
          {/* <button onClick={() => setFollow(User._id, true)}>Follow</button> */}
          <button onClick={() => updateFollow("add")}>Follow</button>
        </div>
      )}
    </section>
  );
}
