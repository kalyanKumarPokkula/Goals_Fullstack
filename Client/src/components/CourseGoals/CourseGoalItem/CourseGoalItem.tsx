import "./CourseGoalItem.css";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import { goalState } from "../../../Store/GoalState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useState } from "react";
const CourseGoalItem = props => {
  const setGoal = useSetRecoilState(goalState);
  const goals = useRecoilValue(goalState);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [markLoading, setMarkLoading] = useState(false);

  function deleteHander() {
    setDeleteLoading(true);
    const UpdatedGoals = goals.filter(goal => goal._id !== props.id);

    async function markDone() {
      try {
        await axios.delete(`http://localhost:3000/api/v1/goal/${props.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setGoal(UpdatedGoals);
        setDeleteLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    markDone();
  }
  function markAsDoneHandler() {
    setMarkLoading(true);
    const UpdatedGoals = goals.map(goal => {
      if (goal._id === props.id) {
        return { ...goal, done: true };
      }

      return goal;
    });

    async function markDone() {
      try {
        await axios.get(`http://localhost:3000/api/v1/goal/${props.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setGoal(UpdatedGoals);
        setMarkLoading(false);
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
          {!markLoading && (
            <button onClick={markAsDoneHandler}>
              {props.done ? "Done" : "Mark As Done"}
            </button>
          )}

          {markLoading && <div className="loader"></div>}

          {!deleteLoading && (
            <button onClick={deleteHander}>
              <MdDeleteOutline size={16} />
            </button>
          )}

          {deleteLoading && <div className="loader"></div>}
        </div>
      </div>
    </li>
  );
};

export default CourseGoalItem;
