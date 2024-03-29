import CourseGoalItem from "../CourseGoalItem/CourseGoalItem";
import "./CourseGoalList.css";
import { goalState } from "../../../Store/GoalState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import axios from "axios";
import BASE_URL from "../../../config";
import { useNavigate } from "react-router-dom";

const CourseGoalList = () => {
  const navigator = useNavigate();
  const goal = useRecoilValue(goalState);
  const setgoal = useSetRecoilState(goalState);

  useEffect(() => {
    async function getTodo() {
      try {
        let response = await axios.get(`${BASE_URL}/api/v1/goals`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        console.log(response.data);
        setgoal(response.data.data);
      } catch (error) {
        console.log(error);
        setgoal([]);
      }
    }

    getTodo();
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ textAlign: "center", fontSize: "34px" }}>Goals List</h1>

        <button
          className="goal-button"
          onClick={() => {
            navigator("/addgoal");
          }}
        >
          Add Goal
        </button>
      </div>

      {goal.length == 0 && (
        <p
          style={{ textAlign: "center", marginTop: "34px", fontSize: "1.2rem" }}
        >
          No goals found. Maybe add one?
        </p>
      )}

      {goal.length > 0 && (
        <ul className="goal-list">
          {goal.map(goal => (
            <CourseGoalItem
              key={goal._id}
              id={goal._id}
              userId={goal.userId}
              done={goal.done}
              priority={goal.priority}
              // onDelete={props.onDeleteItem}
            >
              {goal.goal}
            </CourseGoalItem>
          ))}
        </ul>
      )}
    </>
  );
};

export default CourseGoalList;
