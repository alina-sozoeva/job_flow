import { Pool } from "pg";

export const pool = new Pool({
  host: "postgres",
  user: "jobflowuser",
  password: "jobflowpass",
  database: "jobflowuserdb",
  port: 5432,
});
