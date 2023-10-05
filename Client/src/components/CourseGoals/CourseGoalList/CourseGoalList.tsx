import CourseGoalItem from "../CourseGoalItem/CourseGoalItem";
import "./CourseGoalList.css";
import { goalState } from "../../../Store/GoalState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import axios from "axios";

const CourseGoalList = () => {
  const goal = useRecoilValue(goalState);
  const setgoal = useSetRecoilState(goalState);

  useEffect(() => {
    async function getTodo() {
      try {
        let response = await axios.get(`http://localhost:3000/api/v1/goals`, {
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
  });

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Goals List</h1>

      {goal.length == 0 && (
        <p
          style={{ textAlign: "center", marginTop: "16px", fontSize: "1.2rem" }}
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
