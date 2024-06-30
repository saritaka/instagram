export function SignupFields({ onSubmitForm, handleChange, credentials }) {
  return (
    <form>
      <input
        type="text"
        name="fullname"
        value={credentials.fullname}
        placeholder="Full Name"
        onChange={handleChange}
        required
        autoFocus
      />
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
        type="text"
        name="password"
        value={credentials.password}
        placeholder="Password"
        onChange={handleChange}
        required
        autoFocus
      />
      <button onClick={onSubmitForm}>Sign up</button>
    </form>
  );
}
