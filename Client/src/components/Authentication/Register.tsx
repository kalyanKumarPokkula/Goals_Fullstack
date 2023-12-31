import "./Register.css";
import Button from "../UI/Button/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import BASE_URL from "../../config";
import toast, { Toaster } from "react-hot-toast";
interface SignUpI {
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [processing, setProcessing] = useState(false);
  const navigator = useNavigate();

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
        if (response.data.success) {
          let notity = () => toast.success(response.data.message);
          notity();

          setEmail("");
          setName("");

          setTimeout(() => {
            navigator("/send-verification-email");
          }, 2000);
        } else {
          let notity = () => toast.error(response.data.message);
          notity();

          setEmail("");
          setName("");
          setProcessing(false);
        }
      } catch (error) {
        console.log(error);
      }
    }

    signUp();
    setPassword("");
  };

  return (
    <form onSubmit={submitHandler}>
      <Toaster />
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
