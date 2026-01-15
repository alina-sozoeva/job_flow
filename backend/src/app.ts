import express from "express";

import { pool } from "./db";

import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/health", (_req, res) => {
  res.send({ status: "ok" });
});

app.get("/test-flow", async (_req, res) => {
  try {
    let x = 2;
    x = x * 3;
    try {
      if (x === 6) throw "errA";
      x = x + 1;

      console.log("Final:", x);
    } catch (err) {
      console.log("Catch 1:", err);
    }
    if (x > 5) throw "errB";
    x = x * 2;

    res.json({ message: "done", result: x });
  } catch (err) {
    console.log("Catch 2:", err);
    res.json({ message: "error", result: 1 });
  }
});

app.get("/jobs", async (_req, res) => {
  try {
    const result = await pool.query("SELECT * FROM jobs");

    console.log(result.rows, "result1111");

    res.json({ message: "done", result: result.rows });
  } catch (err) {
    console.log(err);
    res.json({ message: "error", result: err });
  }
});

app.post("/add-jobs", async (_req, res) => {
  const { title } = _req.body;

  console.log(title, "title");

  try {
    await pool.query("INSERT INTO jobs(title) VALUES($1)", [title]);
    res.json({ message: "done" });
  } catch (err) {
    console.log(err);
    res.json({ message: "error", result: err });
  }
});

app.patch("/update-job/:id", async (_req, res) => {
  const { id } = _req.params;
  const { status } = _req.body;

  console.log(status, "status");

  try {
    const result = await pool.query(
      "UPDATE jobs SET status = $1 WHERE id = $2 RETURNING *",
      [status, id]
    );

    res.json({ message: "done", result: result.rows });
  } catch (err) {
    console.log(err);
    res.json({ message: "error", result: err });
  }
});

app.delete("/remove-job/:id", async (_req, res) => {
  const { id } = _req.params;

  console.log(id, "id");

  try {
    await pool.query("DELETE FROM jobs WHERE id =$1", [id]);

    res.json({ message: "deleted" });
  } catch (err) {
    console.log(err);
    res.json({ message: "error", result: err });
  }
});

app.get("/tasks", async (req, res) => {
  try {
    const result = await pool.query("SELECT * from tasks");

    res.json({ message: "done", result: result.rows });
  } catch (err) {
    console.log(err);
    res.json({ message: "error", result: err });
  }
});

const searchTask = app.get("/search-task", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM tasks 
    WHERE status = 'pending' 
    AND next_run_at <= NOW() 
    LIMIT 1;`
    );

    res.json({ message: "done", result: result.rows });
  } catch (err) {
    console.log(err);
    res.json({ message: "error", result: err });
  }
});

const startWorker = () => {
  setInterval(async () => {
    const selectResult = await pool.query(
      `SELECT * FROM tasks 
      WHERE status = 'pending' 
      AND next_run_at <= NOW() LIMIT 1`
    );

    if (selectResult.rows.length === 0) return;

    const task = selectResult.rows[0];

    try {
      console.log(`Пробую выполнить: ${task.title}`);

      if (Math.random() > 0.5) throw new Error("Boom!");

      await pool.query(
        `UPDATE tasks 
        SET status = 'completed', 
        attempts = attempts + 1 
        WHERE id = $1`,
        [task.id]
      );
      console.log("✅ Успешно!");
    } catch (err) {
      console.log("❌ Сбой! Планирую повтор через 1 минуту...");

      await pool.query(
        `UPDATE tasks 
         SET status = 'pending', 
             attempts = attempts + 1, 
             next_run_at = NOW() + INTERVAL '1 minute' 
         WHERE id = $1`,
        [task.id]
      );
    }
  }, 10000);
};

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

startWorker();
