import { useRecoilValue, useSetRecoilState } from "recoil";
import "./Nav.css";
import { useNavigate } from "react-router-dom";
import { authState } from "../../Store/AuthState";
import { goalState } from "../../Store/GoalState";
import { GoGoal } from "react-icons/go";

const Nav = () => {
  const navigator = useNavigate();
  const user = useRecoilValue(authState);
  const setAuth = useSetRecoilState(authState);
  const setGoal = useSetRecoilState(goalState);
  console.log(user);

  return (
    <>
      <div className="nav">
        <div onClick={() => navigator("/")}>
          <GoGoal size={28} />
        </div>
        {user.username && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div className="link-to-goals" onClick={() => navigator("/goal")}>
              <h4>Goals</h4>
            </div>
            <div
              className="avator"
              onClick={() => {
                navigator(`/profile/${user.username}`);
              }}
            >
              <h3
                style={{
                  color: "#fad0ec",
                  fontSize: "16px",
                }}
              >
                {user.username[0]}
              </h3>
            </div>

            <button
              className="button"
              onClick={() => {
                localStorage.setItem("token", "");
                setAuth({ username: null });
                setGoal([]);
                navigator("/");
              }}
            >
              Log out
            </button>
          </div>
        )}
        {!user.username && (
          <div>
            <button className="button" onClick={() => navigator("/login")}>
              Log In
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Nav;
