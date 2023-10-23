import "./Verify.css";
import { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../../config";
import { useNavigate } from "react-router-dom";

const Verify = () => {
  const [verified, setVerified] = useState(false);
  const [token, setToken] = useState("");
  //   const [error, setError] = useState(false);
  const navigator = useNavigate();

  useEffect(() => {
    let urlToken = window.location.search.split("=")[1];
    setToken(urlToken);
    console.log(urlToken);
  }, []);

  function verifyHandler() {
    const newToken = {
      token: token,
    };
    console.log("inside the verify");

    async function init() {
      try {
        let response = await axios.post(
          `${BASE_URL}/api/auth/verifyemail`,
          newToken
        );

        console.log(response);

        if (response.data.success) {
          setVerified(true);
        }
        setTimeout(() => {
          navigator("/login");
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    }

    init();
  }
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="verify-layout">
        {!verified && (
          <>
            <h1>Verify your email here...!</h1>
            <button className="btn" onClick={verifyHandler}>
              Verify
            </button>
          </>
        )}
        {verified && <h1>Email verified successfully</h1>}
      </div>
    </div>
  );
};

export default Verify;
