import { useState } from "react";

import "./Login.css";
import { useDispatch } from "react-redux";
import { login } from "../../Store/loginSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login.setUser({ name: userName }));
  };
  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
