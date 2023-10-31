import "./Register.css";
import { useState } from "react";
import Button from "../UI/Button/Button";

const NewPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordAgain, setNewPasswordAgain] = useState("");
  return (
    <form>
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
          type="text"
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
          type="text"
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
