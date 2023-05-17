import React, { useEffect, useState } from "react";

function Day({ day }) {
  const [task, settask] = useState([]);
  async function getTaskByDay() {
    let tasks = await fetch(`http://localhost:3005/task/${day}`);
    let tasksJson = await tasks.json();
    settask(tasksJson);
    console.log(tasksJson);
  }
  useEffect(() => {
    getTaskByDay();
  }, []);

  function deleteTask(id) {
    fetch(`http://localhost:3005/deletetask/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.text())
      .then((res) => {
        console.log(res);
        getTaskByDay();
      });
  }
  return (
    <>
      <h3>{day}</h3>
      <ul className="list-group mb-3">
        {task.map((task) => {
          return (
            <li className="list-group-item">
              {task.task}{" "}
              <i
                class="bi bi-x-lg float-end"
                onClick={() => {
                  deleteTask(task.id);
                }}
              ></i>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Day;
