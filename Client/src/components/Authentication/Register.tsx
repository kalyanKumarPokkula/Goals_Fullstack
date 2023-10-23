import "./Register.css";
import Button from "../UI/Button/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { authState } from "../../Store/AuthState";
import BASE_URL from "../../config";
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
  const [processing, setProcessing] = useState(false);
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
      setProcessing(true);
      try {
        let response = await axios.post(
          `${BASE_URL}/api/auth/signup`,
          SignUpPayload
        );
        console.log(response.data.data);
        navigator("/sendedemail");
        // setAuth(response.data.data);
        // localStorage.setItem("token", response.data.data.token);
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
        <label>{processing ? "Processing" : "Register"}</label>
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
      <Button type="submit">{processing ? "Processing" : "Sign up"}</Button>
      <div className="bottom">
        <p>Already a user? </p>
        <NavLink to="/login">Login</NavLink>
      </div>
    </form>
  );
};

export default Register;
