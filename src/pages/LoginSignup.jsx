import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import instagram from "../assets/img/instagram.svg";
// import { userService } from "../services/user.service.local";
import { userService } from "../services/user.service";
import { SignupFields } from "../cmps/SignupFileds";
import * as actions from "../store/user.actions";

export function Login() {
  // const [hideDisplay, setHide] = useState(false);
  const [LoginFields, setLoginFeilds] = useState(true);
  const [credentials, setCredentials] = useState(userService.getEmptyUser());
  const [loggedinUser, setLoggedinUser] = useState(
    userService.getLoggedInUser()
  );

  const user = useSelector((storeState) => storeState.userModule.loggeduser);
  console.log("user in loginsigup", user);
  // console.log("hide display in loginsigup", hideDisplay);

  useEffect(() => {
    console.log("user in login", user);
    // user ? setHide(true) : setHide(false);
    actions.loadLoggedInUser();
  }, [loggedinUser]);

  // const navigate = useNavigate();

  // function hideLoginPage() {
  //   setHide(true);
  // }

  async function onSubmitForm(ev = null) {
    console.log("test on submit form");
    if (ev) ev.preventDefault();
    if (!LoginFields) {
      if (
        !credentials.username ||
        !credentials.password ||
        !credentials.fullname
      )
        return;
      await onSignup(credentials);
    } else {
      if (!credentials.username) return;
      await onLogin(credentials);
    }
    //  clearState();
  }

  async function onSignup(credentials) {
    console.log(credentials);
    try {
      const user = await userService.signup(credentials);
      setLoggedinUser(user);
      // showSuccessMsg(`Welcome ${user.fullname}`);
      console.log(`Welcome ${user.fullname}`);
      // setHide(!hideDisplay);
    } catch (err) {
      console.log("Cannot signup :", err);
      // showErrorMsg(`Cannot signup`);
    }
  }

  async function onLogin(credentials) {
    console.log("credentials", credentials);
    try {
      const user = await userService.login(credentials);
      setLoggedinUser(user);
      console.log(`Welcome ${user.fullname}`);
    } catch (err) {
      console.log("Cannot login :", err);
      // showErrorMsg(`Cannot login`);
    }
  }

  async function onLogout() {
    console.log("logout");
    try {
      await userService.logout();
      setLoggedinUser(null);
    } catch (err) {
      console.log("can not logout");
    }
    // add logout
  }

  function clearState() {
    setCredentials(userService.getEmptyUser());
    setLoginFeilds(true);
  }

  function handleChange(ev) {
    const field = ev.target.name;
    const value = ev.target.value;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [field]: value,
    }));
  }

  // let hide = "";
  // hideDisplay ? (hide = "hide-display") : "";

  const off = false;
  const on = true;

  return (
    !loggedinUser && (
      // <section className={`login-signup ${hide}`}>
      <section className={"login-signup"}>
        {/* <section className="login-page"> */}
        <div className="login-input">
          <img src={instagram}></img>
          {LoginFields ? (
            <form>
              <input
                type="text"
                name="username"
                value={credentials.username}
                placeholder="Username"
                onChange={handleChange}
                required
                autoFocus
              />
              <input
                type="password"
                name="password"
                value={credentials.password}
                placeholder="Password"
                onChange={handleChange}
                required
              />
              <button onClick={onSubmitForm}>Log in</button>
              <button onClick={() => setLoginFeilds(!LoginFields)}>
                Sign up
              </button>
            </form>
          ) : (
            <SignupFields
              onSubmitForm={onSubmitForm}
              handleChange={handleChange}
              credentials={credentials}
            />
          )}
        </div>
      </section>
    )
  );
}
