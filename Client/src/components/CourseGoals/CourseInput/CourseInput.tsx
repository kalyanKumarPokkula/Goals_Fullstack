import { useState } from "react";
import axios from "axios";
import Button from "../../UI/Button/Button";
import "./CourseInput.css";
import { goalState } from "../../../Store/GoalState";
import { useSetRecoilState } from "recoil";
import BASE_URL from "../../../config";
import toast, { Toaster } from "react-hot-toast";

const CourseInput = () => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isValid, setIsValid] = useState(true);
  const setGoal = useSetRecoilState(goalState);

  const goalInputChangeHandler = event => {
    setEnteredValue(event.target.value);
    setIsValid(true);
  };

  const formSubmitHandler = event => {
    event.preventDefault();
    if (enteredValue.trim().length === 0) {
      setIsValid(false);
      return;
    }

    const Payload = {
      goal: enteredValue,
    };

    async function addGoal() {
      try {
        let response = await axios.post(`${BASE_URL}/api/v1/goals`, Payload, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        console.log(response.data);
        const notify = () => toast.success(response.data.message);
        notify();

        setGoal(pre => [...pre, response.data.data]);
      } catch (error) {
        console.log(error);
      }
    }
    addGoal();
    setEnteredValue("");
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <Toaster />
      <div className={`form-control ${!isValid ? "isValid" : ""}`}>
        <label>Goal</label>
        <input
          type="text"
          value={enteredValue}
          onChange={goalInputChangeHandler}
        />
      </div>
      <Button type="submit">Add Goal</Button>
    </form>
  );
};

export default CourseInput;
