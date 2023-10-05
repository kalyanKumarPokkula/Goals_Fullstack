import { NavLink, useNavigate } from "react-router-dom";
import Button from "../UI/Button/Button";
import "./Register.css";
import { useState } from "react";
import axios from "axios";
import { authState } from "../../Store/AuthState";
import { useSetRecoilState } from "recoil";
interface SignInI {
  email: String;
  password: String;
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setAuth = useSetRecoilState(authState);
  const navigator = useNavigate();

  const submitHandler = event => {
    event.preventDefault();

    const SignInPayload: SignInI = {
      email: email,
      password: password,
    };
    console.log(SignInPayload);

    async function signIn() {
      try {
        let response = await axios.post(
          `http://localhost:3000/api/auth/signin`,
          SignInPayload
        );
        console.log(response.data.data);
        setAuth(response.data.data);
        localStorage.setItem("token", response.data.data.token);
        navigator("/goal");
      } catch (error) {
        console.log(error);
      }
    }

    console.log(SignInPayload);
    signIn();
    setEmail("");
    setPassword("");
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="title">
        <label>Log in</label>
      </div>
      <div className="field">
        <label>Email</label>
        <input
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="field">
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>
      <Button type="submit">Sign In</Button>
      <div className="bottom">
        <p>New here?</p>
        <NavLink to="/register">Register</NavLink>
      </div>
    </form>
  );
};

export default Login;
