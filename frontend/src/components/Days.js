import React, { useEffect, useState } from "react";
import Day from "./Day";

function Days() {
  const [day, setday] = useState("Monday");
  const [task, settask] = useState("");
  const [days, setdays] = useState([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]);

  async function addTask() {
    try {
      let data = fetch("http://localhost:3005/addtask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ day, task }),
      });
    } catch (error) {
      alert(error);
    }
  }
  return (
    <>
      <>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Add Task
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="recipient-name" className="col-form-label">
                      Select Day
                    </label>
                    <div class="dropdown">
                      <select
                        className="btn btn-secondary dropdown-toggle"
                        value={day}
                        onChange={(e) => setday(e.target.value)}
                      >
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message-text" className="col-form-label">
                      Task
                    </label>
                    <textarea
                      value={task}
                      onChange={(e) => settask(e.target.value)}
                      className="form-control"
                      id="message-text"
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={addTask}
                  data-bs-dismiss="modal"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </>

      <div className="container">
        <h1 className="text-center mt-3">Weekly Planner</h1>
        <div className="row">
          <div className="col-12 text-center py-5">
            <i
              class="bi bi-calendar2-plus h1"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              data-bs-whatever="@mdo"
            ></i>
          </div>
        </div>
        <div className="row">
          {days.map((day) => {
            return (
              <div className="col-4">
                <Day day={day} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Days;
