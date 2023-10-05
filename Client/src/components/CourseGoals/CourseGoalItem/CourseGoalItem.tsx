import "./CourseGoalItem.css";
import { useState } from "react";
const CourseGoalItem = props => {
  const [markAsDone, setMarkAsDone] = useState(false);
  // const [deleteText, setDeleteText] = useState('');

  // const deleteHandler = () => {
  //   // setDeleteText('(Deleted!)');
  //   props.onDelete(props.id);
  // };

  return (
    <li className="goal-item">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <p>{props.children}</p>
        <button onClick={() => setMarkAsDone(true)}>
          {props.done ? "Done" : "Mark As Done"}
        </button>
      </div>
    </li>
  );
};

export default CourseGoalItem;
