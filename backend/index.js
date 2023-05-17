const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const port = 3005;

const app = express();
app.use(cors());
app.use(express.json());

const dbconfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "weeklyplanner",
};

const pool = mysql.createPool(dbconfig);

app.get("/alltask", (req, res) => {
  pool.query("select * from task", (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

app.get("/task/:day", (req, res) => {
  console.log("someone is trying to fetch tasks by day");
  const { day } = req.params;
  pool.query("select * from task where day = ?", day, (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

app.post("/addtask", (req, res) => {
  console.log("someone is trying to add a task");
  const { task, day } = req.body;
  pool.query(
    "insert into task (task, day) values (?,?)",
    [task, day],
    (err, rows) => {
      if (err) throw err;
      res.send("task added");
    }
  );
});

app.delete("/deletetask/:id", (req, res) => {
  console.log("someone is trying to delete a task");
  const { id } = req.params;
  pool.query("delete from task where id = ?", id, (err, rows) => {
    if (err) throw err;
    res.send("task deleted");
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
