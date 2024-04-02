import { useState, useEffect } from "react";

import "./task.css";

const tasks = [
  {
    id: "zhk",
    name: "Zahid",
    taskName: "Optimize API's",
    started: false,
    submitted: false,
    timeAlloted: 10000,
  },
  {
    id: "abm",
    name: "Aabid",
    taskName: "Change UI",
    started: false,
    submitted: false,
    timeAlloted: 100000,
  },
  {
    id: "hzb",
    name: "Hazik",
    taskName: "Add Page",
    started: false,
    submitted: false,
    timeAlloted: 10000,
  },
];

const Task = () => {
  const [taskList, setTaskList] = useState(tasks);

  const startTimer = (id) => {
    setTaskList((tasks) => {
      return tasks.map((el) => {
        if (el.id === id) {
          el.started = true;
          el.startTime = Date.now();
        }
        return el;
      });
    });
  };

  const stopTimer = (id) => {
    setTaskList((tasks) => {
      return tasks.map((el) => {
        if (el.id === id) {
          el.started = false;
          el.submitted = true;
        }
        return el;
      });
    });
  };

  const calculateRemainingTime = (task) => {
    if (task.started && !task.submitted) {
      const currentTime = Date.now();
      const elapsedTime = (currentTime - task.startTime) / 1000;
      const remainingTime = task.timeAlloted - elapsedTime;
      return Math.max(0, Math.round(remainingTime));
    }
    return 0;
  };

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTaskList((tasks) => {
        return tasks.map((task) => {
          if (task.started && !task.submitted) {
            return { ...task, remainingTime: calculateRemainingTime(task) };
          }
          return task;
        });
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  return (
    <div>
      <h2>Assigned Tasks</h2>
      <ul className="task-table">
        {taskList.map((task) => (
          <li key={task.id}>
            <span>{task.name}</span> - <span>{task.taskName}</span>-
            <span>
              {task.started && !task.submitted && (
                <>
                  <span>Time Left: {task.remainingTime} seconds</span>
                  <button onClick={() => stopTimer(task.id)}>Submit</button>
                </>
              )}
            </span>
            {!task.submitted && !task.started && (
              <button onClick={() => startTimer(task.id)}>Start</button>
            )}
            {task.submitted && <span>Task submitted</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Task;
