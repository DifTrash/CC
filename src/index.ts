import express from "express";
import type { Request, Response } from "express";

import { SignIn, SignUp } from "./handler/auth";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ well: "Hello World" });
});

app.post("/auth/signin", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password)
    res.status(400).send({ name: "Invalid Body Request" });

  try {
    res.status(200).send(await SignIn(email, password));
  } catch (e) {
    console.error(e);
    res.status(400).send(e);
  }
});

app.post("/auth/signup", async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400).send({ name: "Invalid Body Request" });
  }

  try {
    res.status(200).send(await SignUp(username, email, password));
  } catch (e) {
    console.error(e);
    res.status(400).send(e);
  }
});

app.listen(port);
