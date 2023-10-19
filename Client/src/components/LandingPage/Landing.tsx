import "./Landing.css";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../../Store/AuthState";

const Landing = () => {
  const navigator = useNavigate();
  const user = useRecoilValue(authState);
  return (
    <div className="landing-page">
      <div className="title">
        <h1 style={{ color: "#8b005d" }}>Goals</h1>
        <h3>If the plan doesn't work,</h3>
        <h3>Change the plan,</h3>
        <h3 style={{ color: "#8b005d" }}>Not the goal,</h3>

        {!user.username && (
          <div>
            <button onClick={() => navigator("/login")}>Login</button>
          </div>
        )}
        {user.username && (
          <div>
            <button onClick={() => navigator("/goal")}>Goals</button>
          </div>
        )}
      </div>
      <div className="image">
        {!user.username && (
          <img
            src="https://anime-059.s3.ap-south-1.amazonaws.com/personal+goals+checklist-bro.png"
            alt="goals"
          />
        )}
        {user.username && (
          <img
            src="https://anime-059.s3.ap-south-1.amazonaws.com/personal+goals+checklist-pana.png"
            alt="goals"
          />
        )}
      </div>
    </div>
  );
};

export default Landing;
