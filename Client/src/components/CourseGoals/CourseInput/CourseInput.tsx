import { useState } from "react";
import axios from "axios";
import Button from "../../UI/Button/Button";
import "./CourseInput.css";
import { goalState } from "../../../Store/GoalState";
import { useSetRecoilState } from "recoil";
import BASE_URL from "../../../config";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CourseInput = () => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [selectedOption, setSelectedOption] = useState("Low");
  const setGoal = useSetRecoilState(goalState);
  const navigate = useNavigate();

  const goalInputChangeHandler = event => {
    setEnteredValue(event.target.value);
    setIsValid(true);
  };

  const handleSelectChange = event => {
    setSelectedOption(event.target.value);
  };

  const formSubmitHandler = event => {
    event.preventDefault();
    if (enteredValue.trim().length === 0) {
      setIsValid(false);
      return;
    }

    const Payload = {
      goal: enteredValue,
      priority: selectedOption,
    };

    console.log(Payload);

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
        setTimeout(() => {
          navigate("/goal");
        }, 1000);

        setGoal(pre => [...pre, response.data.data]);
      } catch (error) {
        console.log(error);
      }
    }
    addGoal();
    setEnteredValue("");
    setSelectedOption("Low");
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
        <label>Priority</label>
        <select
          name="priority"
          id="priority"
          value={selectedOption}
          onChange={handleSelectChange}
        >
          <option value="Critical">Critical</option>
          <option value="High">High</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="Urgent">Urgent</option>
        </select>
      </div>
      <Button type="submit">Add Goal</Button>
    </form>
  );
};

export default CourseInput;
