import "./CourseGoalItem.css";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import { goalState } from "../../../Store/GoalState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useState } from "react";
import BASE_URL from "../../../config";
const CourseGoalItem = props => {
  const setGoal = useSetRecoilState(goalState);
  const goals = useRecoilValue(goalState);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [markLoading, setMarkLoading] = useState(false);
  const [markAsDone, setMarkAsDone] = useState(props.done);
  const [deleteGoal, setDeleteGoal] = useState(false);
  const [deleteId, setDeleteId] = useState<number>();

  function deleteHander() {
    // setDeleteLoading(true);
    setDeleteGoal(true);

    const id = setTimeout(() => {
      const UpdatedGoals = goals.filter(goal => goal._id != props.id);
      async function markDone() {
        try {
          await axios.delete(`${BASE_URL}/api/v1/goal/${props.id}`, {
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
    }, 3000);

    setDeleteId(id);
  }

  function updateMarkAsDone(done) {
    if (done) {
      setMarkAsDone(true);
    } else {
      setMarkAsDone(false);
    }

    const UpdatedGoals = goals.map(goal => {
      if (goal._id === props.id) {
        return { ...goal, done: done };
      }

      return goal;
    });
    setGoal(UpdatedGoals);
  }
  function markAsDoneHandler() {
    setMarkLoading(true);

    async function markDone() {
      try {
        let response = await axios.get(`${BASE_URL}/api/v1/goal/${props.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.data.done) {
          updateMarkAsDone(response.data.data.done);
        } else {
          updateMarkAsDone(response.data.data.done);
        }

        setMarkLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    markDone();
  }

  return (
    <li className="goal-item">
      {deleteGoal && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p>{props.children}</p>
          <div>
            <button
              style={{
                padding: "10.6px",
              }}
              onClick={() => {
                clearTimeout(deleteId);
                setDeleteGoal(false);
              }}
            >
              Undo
            </button>
          </div>
        </div>
      )}
      {!deleteGoal && (
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
                {markAsDone ? "Done" : "Mark As Done"}
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
      )}
    </li>
  );
};

export default CourseGoalItem;
