import { Route, Routes, useNavigate } from "react-router-dom";
import CourseGoalList from "./components/CourseGoals/CourseGoalList/CourseGoalList";
import CourseInput from "./components/CourseGoals/CourseInput/CourseInput";
import Nav from "./components/Navbar/Nav";
import Register from "./components/Authentication/Register";
import "./App.css";
import Login from "./components/Authentication/Login";
import { useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { authState } from "./Store/AuthState";
import NewPassword from "./components/Authentication/NewPassword";
import Profile from "./components/Profile/Profile";

// import Verify from "./components/VerifyEmail/Verify";

import axios from "axios";
import BASE_URL from "./config";
import Landing from "./components/LandingPage/Landing";
import ReSendEmail from "./components/VerifyEmail/ReSendEmail";
import ForgotPassword from "./components/Authentication/ForgotPassword";

const App = () => {
  const navigate = useNavigate();
  const setAuth = useSetRecoilState(authState);

  useEffect(() => {
    const init = async () => {
      try {
        let response = await axios.get(`${BASE_URL}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        console.log(response);
        if (response.data.data.username) {
          let name = response.data.data.username;
          setAuth({ username: name });
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    };
    init();
  }, []);

  return (
    <div>
      <Nav />
      <Routes>
        <Route
          path="/goal"
          element={
            <div>
              <section className="form_layout">
                <CourseInput />
              </section>

              <section id="goals">
                <CourseGoalList />
              </section>
            </div>
          }
        />
        <Route
          path="/reset-password"
          element={
            <section className="form_layout">
              <NewPassword />
            </section>
          }
        />
        <Route path="/send-verification-email" element={<ReSendEmail />} />

        <Route
          path="/register"
          element={
            <section className="form_layout">
              <Register />
            </section>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <section className="form_layout">
              <ForgotPassword />
            </section>
          }
        />
        <Route path="/" element={<Landing />} />

        <Route
          path="/login"
          element={
            <section className="form_layout">
              <Login />
            </section>
          }
        />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;
