import { NavLink, useNavigate } from "react-router-dom";
import Button from "../UI/Button/Button";
import "./Register.css";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { authState } from "../../Store/AuthState";
import { useSetRecoilState } from "recoil";
import BASE_URL from "../../config";

interface SignInI {
  email: String;
  password: String;
}

interface validationError {
  message: string;
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setAuth = useSetRecoilState(authState);
  const navigator = useNavigate();
  const [validationError, setValidationError] = useState<validationError>({
    message: "",
  });

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
          `${BASE_URL}/api/auth/signin`,
          SignInPayload
        );
        console.log(response.data);

        if (response.data.success) {
          setAuth(response.data.data);
          localStorage.setItem("token", response.data.data.token);
          navigator("/");
        } else {
          setValidationError({ message: response.data.message });
        }
      } catch (err) {
        const axiosError = err as AxiosError;
        console.log(axiosError);
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
      {validationError.message.length > 0 && (
        <div
          style={{
            backgroundColor: "#fad0ec",
            paddingTop: "1rem",
            paddingBottom: "1rem",
            paddingLeft: "2rem",
            paddingRight: "2rem",
            marginBottom: "0.5rem",
          }}
        >
          {validationError.message}
        </div>
      )}
      <div className="field">
        <label>Email</label>
        <input
          type="text"
          value={email}
          onChange={e => {
            setEmail(e.target.value);
            setValidationError({ message: "" });
          }}
          required
        />
      </div>
      <div className="field">
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
            setValidationError({ message: "" });
          }}
          required
        />
      </div>
      <Button type="submit">Sign In</Button>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1.5rem",
          marginBottom: "0.5rem",
        }}
      >
        <NavLink to="/forgot-password">Forgot password</NavLink>
        <div
          style={{
            display: "flex",
          }}
        >
          <p>New here?</p>
          <NavLink to="/register">Register</NavLink>
        </div>
      </div>
    </form>
  );
};

export default Login;
