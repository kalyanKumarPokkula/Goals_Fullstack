import { useRecoilValue, useSetRecoilState } from "recoil";
import "./Nav.css";
import { useNavigate } from "react-router-dom";
import { authState } from "../../Store/AuthState";

const Nav = () => {
  const navigator = useNavigate();
  const user = useRecoilValue(authState);
  const setAuth = useSetRecoilState(authState);

  return (
    <>
      {!user.username && (
        <div className="nav">
          <div>
            <h3 onClick={() => navigator("/")}>Goals</h3>
          </div>
          <div>
            <button className="button" onClick={() => navigator("/login")}>
              Log In
            </button>
          </div>
        </div>
      )}
      {user.username && (
        <div className="nav">
          <div>
            <h3 onClick={() => navigator("/")}>Goals</h3>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div>
              <h3>{user.username}</h3>
            </div>
            <button
              className="button"
              onClick={() => {
                localStorage.setItem("token", "");
                setAuth({ token: null, username: null });
                navigator("/login");
              }}
            >
              Log out
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;
