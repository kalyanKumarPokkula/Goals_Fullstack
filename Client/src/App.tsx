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

import axios from "axios";

const App = () => {
  const navigate = useNavigate();
  const setAuth = useSetRecoilState(authState);

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
      }
      try {
        let response = await axios.get(`http://localhost:3000/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response);
        if (response.data.data.username) {
          let name = response.data.data.username;
          setAuth({ username: name });
          navigate("/goal");
        }
      } catch (error) {
        console.log(error);
        navigate("/login");
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
          path="/register"
          element={
            <section className="form_layout">
              <Register />
            </section>
          }
        />
        <Route
          path="/login"
          element={
            <section className="form_layout">
              <Login />
            </section>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
