import { serve } from "@hono/node-server";
import { Hono } from "hono";

import { Client } from "pg";

import dotenv from "dotenv";

dotenv.config();

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 7153,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

client.connect((err) => {
  if (err) {
    console.error("connection error", err.stack);
  } else {
    console.log("connected");
  }
});

const app = new Hono();

app.get("/", (c) => c.text("Hello Hono!"));

serve(app);
