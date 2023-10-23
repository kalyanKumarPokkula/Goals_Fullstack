import "./ReSendEmail.css";

const ReSendEmail = () => {
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

        <button className="btn" onClick={reSendEmail}>
          Re-send Email
        </button>
      </div>
    </div>
  );
};

export default ReSendEmail;
