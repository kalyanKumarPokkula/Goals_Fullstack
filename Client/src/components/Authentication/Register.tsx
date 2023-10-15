import "./Register.css";
import Button from "../UI/Button/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { authState } from "../../Store/AuthState";
interface SignUpI {
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setAuth = useSetRecoilState(authState);
  const navigator = useNavigate();
  // const [isValid, setIsValid] = useState(false);

  const submitHandler = event => {
    event.preventDefault();

    const SignUpPayload: SignUpI = {
      name: name,
      email: email,
      password: password,
    };
    console.log(SignUpPayload);

    async function signUp() {
      try {
        let response = await axios.post(
          `http://localhost:3000/api/auth/signup`,
          SignUpPayload
        );
        console.log(response.data.data);
        setAuth(response.data.data);
        navigator("/goal");
      } catch (error) {
        console.log(error);
      }
    }

    signUp();
    setEmail("");
    setName("");
    setPassword("");
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="title">
        <label>Register</label>
      </div>
      <div className={`field`}>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>
      <div className={`field`}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      <div className={`field`}>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>
      <Button type="submit">Sign Up</Button>
      <div className="bottom">
        <p>Already a user? </p>
        <NavLink to="/login">Login</NavLink>
      </div>
    </form>
  );
};

export default Register;