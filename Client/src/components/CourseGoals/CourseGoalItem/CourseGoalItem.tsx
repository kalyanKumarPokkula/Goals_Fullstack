import "./CourseGoalItem.css";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import { goalState } from "../../../Store/GoalState";
import { useRecoilValue, useSetRecoilState } from "recoil";
const CourseGoalItem = props => {
  const setGoal = useSetRecoilState(goalState);
  const goals = useRecoilValue(goalState);

  function deleteHander() {
    const UpdatedGoals = goals.filter(goal => goal._id !== props.id);

    setGoal(UpdatedGoals);
  }
  function markAsDoneHandler() {
    const UpdatedGoals = goals.map(goal => {
      if (goal._id === props.id) {
        return { ...goal, done: true };
      }

      return goal;
    });

    console.log(UpdatedGoals);
    setGoal(UpdatedGoals);

    async function markDone() {
      try {
        await axios.get(`http://localhost:3000/api/v1/goal/${props.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }

    markDone();
  }

  return (
    <li className="goal-item">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p>{props.children}</p>

        <div style={{ display: "flex", gap: "12px" }}>
          <button onClick={markAsDoneHandler}>
            {props.done ? "Done" : "Mark As Done"}
          </button>

          <button onClick={deleteHander}>
            <MdDeleteOutline size={16} />
          </button>
        </div>
      </div>
    </li>
  );
};

export default CourseGoalItem;
