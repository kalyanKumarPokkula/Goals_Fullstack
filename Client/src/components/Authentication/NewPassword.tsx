import "./Register.css";
import { useState, useEffect } from "react";
import Button from "../UI/Button/Button";
import axios from "axios";
import BASE_URL from "../../config";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const NewPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordAgain, setNewPasswordAgain] = useState("");
  const [token, setToken] = useState("");
  const navigator = useNavigate();

  useEffect(() => {
    let Token = window.location.search.split("=")[1];
    setToken(Token);
    console.log(Token);
  }, []);

  function submitHandler(e) {
    e.preventDefault();

    if (newPassword !== newPasswordAgain) {
      let notify = () =>
        toast.error("Password didn't match please provide same password");
      notify();
      return;
    }
    let payload = {
      token: token,
      newPassword: newPassword,
    };

    async function init() {
      try {
        let response = await axios.post(
          `${BASE_URL}/api/auth/reset-password`,
          payload
        );

        let notify = () => toast.success(response.data.message);
        notify();

        setTimeout(() => {
          navigator("/login");
        }, 2000);

        console.log(response.data);
      } catch (error: any) {
        let notify = () => toast.error(error.response.data.message);
        notify();
        console.log(error.response.data.message);
      }
    }

    init();

    setNewPassword("");
    setNewPasswordAgain("");
  }

  return (
    <form onSubmit={submitHandler}>
      <Toaster />
      <div className="title">
        <label>Create A Strong Password</label>
      </div>
      <p
        style={{
          textAlign: "center",
          margin: "1.3rem 0rem",
        }}
      >
        Your password must be at least 6 characters and should include a
        combination of numbers, letters and special characters (!$@%).
      </p>
      <div className="field">
        <label>New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={e => {
            setNewPassword(e.target.value);
          }}
          required
        />
      </div>
      <div className="field">
        <label>New Password , Again</label>
        <input
          type="password"
          value={newPasswordAgain}
          onChange={e => {
            setNewPasswordAgain(e.target.value);
          }}
          required
        />
      </div>
      <Button type="submit">Reset Password</Button>
    </form>
  );
};

export default NewPassword;
