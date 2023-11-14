import { useState } from "react";
import "./Register.css";
import Button from "../UI/Button/Button";
import { NavLink } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import BASE_URL from "../../config";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  function submitHandler(event) {
    event.preventDefault();

    if (email.trim() == null) {
      return "Please enter the value";
    }

    let payload = {
      email: email.trim(),
    };

    console.log(payload);

    async function init() {
      setLoading(true);
      try {
        let response = await axios.post(
          `${BASE_URL}/api/auth/forgotten-password`,
          payload
        );

        if (response.data.success) {
          const notify = () => toast.success("Reset token sent to the email!");
          notify();
          setLoading(false);
        } else {
          const notify = () => toast.error("User not found!");
          notify();
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }

    init();
    setEmail("");
  }

  return (
    <form onSubmit={submitHandler}>
      <Toaster />
      <div className="title">
        <label>{loading ? "Processing" : "Trouble logging in?"}</label>
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
      <Button type="submit">
        {loading ? "Processing" : "Send login link"}
      </Button>
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
