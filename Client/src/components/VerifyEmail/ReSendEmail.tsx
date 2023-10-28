import "./ReSendEmail.css";
import { useNavigate } from "react-router-dom";

const ReSendEmail = () => {
  const navigator = useNavigate();
  const reSendEmail = () => {};
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="sendedemail-layout">
        <h1 style={{ color: "#8b005d", marginBottom: "16px" }}>
          Congratulations!
        </h1>
        <h1>
          We have successfully sended the email address for you to verify!.
        </h1>

        <h2 style={{ margin: "16px 0px" }}>
          Please visit to your email and verify...
        </h2>

        <h3 style={{ margin: "18px 0px" }}>
          if you have not received the mail click on re-send
        </h3>

        <h3 style={{ margin: "18px 0px" }}>
          if your are verified click on login
        </h3>

        <div style={{ display: "flex", gap: "12px" }}>
          <button className="btn" onClick={reSendEmail}>
            Re-send Email
          </button>
          <button className="btn" onClick={() => navigator("/login")}>
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReSendEmail;
