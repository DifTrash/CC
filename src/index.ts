import express, { Request, Response } from "express";
import multer from "multer";
import path from "path";

import { SignIn, SignOut, SignUp } from "./handler/auth";
import { AddPredict, GetPredict } from "./handler/predict";
import { bucket } from "./firebase/config";
import { GetDocument, UpdateDocument } from "./firebase/firebase-handler";

type APIResponse = { status: "success" | "error"; data: unknown };

const ErrorJson = (e: unknown): APIResponse => {
  return { status: "error", data: e };
};

const errorMessage = {
  invalidBody: "Invalid Body Type",
  file: "No File Uploaded!",
  uid: "UID is not Provided",
};

const app = express();
const upload = multer();
const port = 8080;
const PUBLIC_STORAGE_URL = "https://storage.googleapis.com/diftrash_modell/";
const MODEL_URL = "https://predict-blwec3ugoq-et.a.run.app/predict";

app.use(express.json());

app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);

app.get("/", (req: Request, res: Response) => {
  res.json("Hello World");
});

// #region // * Auth
app.post("/auth/signin", upload.none(), async (req: Request, res: Response) => {
  const apiResponse: APIResponse = { status: "error", data: null };

  try {
    const { email, password } = req.body;
    if (!email || !password) {
      apiResponse.data = errorMessage.invalidBody;
      res.status(400).json(apiResponse);
      return;
    }

    const signInResponse = await SignIn(email, password);
    apiResponse.status = "success";
    apiResponse.data = signInResponse;

    res.status(200).json(apiResponse);
    return;
  } catch (e) {
    console.error(e);
    res.status(400).json(ErrorJson(e));
    return;
  }
});

app.post("/auth/signup", upload.none(), async (req: Request, res: Response) => {
  const apiResponse: APIResponse = { status: "error", data: null };
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    apiResponse.data = errorMessage.invalidBody;
    res.status(400).json(apiResponse);
    return;
  }

  try {
    const signUpResponse = await SignUp(username, email, password);
    apiResponse.status = "success";
    apiResponse.data = signUpResponse;

    res.status(200).json(apiResponse);
    return;
  } catch (e) {
    console.error(e);
    res.status(400).json(ErrorJson(e));
    return;
  }
});

app.post("/auth/signout", async (req: Request, res: Response) => {
  const apiResponse: APIResponse = { status: "error", data: null };

  try {
    await SignOut();
    apiResponse.status = "success";
    res.status(200).json(apiResponse);
    return;
  } catch (e) {
    console.error(e);
    res.status(400).json(ErrorJson(e));
    return;
  }
});
// #endregion

// #region // * Predict
app.post(
  "/predict/model/:uid",
  upload.single("file"),
  async (req: Request, res: Response) => {
    const apiResponse: APIResponse = { status: "error", data: null };

    if (!req.file) {
      apiResponse.data = errorMessage.file;
      res.status(400).json(apiResponse);
      return;
    }

    if (!req.params.uid) {
      apiResponse.data = errorMessage.uid;
      res.status(400).json(apiResponse);
      return;
    }

    try {
      const uid = req.params.uid;
      const { originalname, buffer } = req.file;
      const fileBlob = new Blob([buffer], { type: "image/*" });

      const formData = new FormData();
      formData.append("file", fileBlob, originalname);

      const responseModel = await fetch(MODEL_URL, {
        method: "POST",
        body: formData,
      });

      const responseJson = await responseModel.json();
      await AddPredict(uid, responseJson.data);

      apiResponse.status = "success";
      apiResponse.data = responseJson;
      res.status(200).json(apiResponse);
      return;
    } catch (e) {
      console.error(e);
      res.status(400).json(ErrorJson(e));
      return;
    }
  }
);

app.post("/predict/get/:uid", upload.none(), async (req: Request, res: Response) => {
  const apiResponse: APIResponse = { status: "error", data: null };

  try {
    apiResponse.status = "success";
    apiResponse.data = await GetPredict(req.params.uid);
    res.status(200).json(apiResponse);
    return;
  } catch (e) {
    console.error(e);
    res.status(400).json(ErrorJson(e));
    return;
  }
});
// #endregion

app.post(
  "/profile/update/:uid",
  upload.single("file"),
  async (req: Request, res: Response) => {
    const apiResponse: APIResponse = { status: "error", data: null };
    const { username } = req.body;

    if (!username) {
      apiResponse.data = errorMessage.invalidBody;
      res.status(400).json(apiResponse);
      return;
    }

    if (!req.file) {
      apiResponse.data = errorMessage.file;
      res.status(400).json(apiResponse);
      return;
    }

    if (!req.params.uid) {
      apiResponse.data = errorMessage.uid;
      res.status(400).json(apiResponse);
      return;
    }

    try {
      const { uid } = req.params;
      const { originalname, buffer } = req.file;
      const extensionName = path.extname(originalname);
      const fileName = uid + extensionName;
      const photoURL = PUBLIC_STORAGE_URL + fileName;

      const data = {
        displayName: username,
        photoURL: photoURL,
      };

      await bucket.file(fileName).save(buffer);
      await UpdateDocument("user", uid, data);

      apiResponse.status = "success";
      apiResponse.data = data;
      res.status(200).json(apiResponse);
      return;
    } catch (e) {
      console.error(e);
      res.status(400).json(ErrorJson(e));
      return;
    }
  }
);

app.post("/profile/get/:uid", async (req: Request, res: Response) => {
  const apiResponse: APIResponse = { status: "error", data: null };

  if (!req.params.uid) {
    apiResponse.data = errorMessage.uid;
    res.status(400).json(apiResponse);
    return;
  }

  try {
    const { uid } = req.params;
    const dbResponse = await GetDocument("user", uid);

    apiResponse.status = "success";
    apiResponse.data = dbResponse.data();
    res.status(200).json(apiResponse);
    return;
  } catch (e) {
    console.error(e);
    res.status(400).json(ErrorJson(e));
    return;
  }
});
