import { useState } from "react";
import "./Register.css";
import Button from "../UI/Button/Button";
import { NavLink } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  return (
    <form>
      <div className="title">
        <label>Trouble logging in?</label>
      </div>
      <p
        style={{
          textAlign: "center",
          margin: "1.3rem 0rem",
        }}
      >
        Enter your email, or username and we'll send you a link to get back into
        your account.
      </p>
      <div className="field">
        <label>Email or username</label>
        <input
          type="text"
          value={email}
          onChange={e => {
            setEmail(e.target.value);
          }}
          required
        />
      </div>
      <Button type="submit">Send login link</Button>

      <div
        className="bottom"
        style={{
          textAlign: "center",
        }}
      >
        <NavLink to="/login">Back to login</NavLink>
      </div>
    </form>
  );
};

export default ForgotPassword;
