/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

const Express = require("express");
const mongoose = require("mongoose");

const app = Express();
app.use(Express.json());

const port = 5038;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

const connectString =
  "";

const schema = new mongoose.Schema({
  id: Number,
  task: String,
});

const todo = mongoose.model("todocollections", schema);

app.get("/todoapp", (request, response) => {
  todo
    .find()
    .then((result) => {
      response.send(result);
    })
    .catch((err) => {
      console.log(err);
      response.status(500).send("Internal Server Error");
    });
});

app.post("/todoapp/new", async (request, response) => {
  try {
    const addvalue = new todo({
      task: request.body.task,
    });

    const result = await addvalue.save();
    response.status(200).json(result);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

const start = async () => {
  try {
    await mongoose.connect(connectString);
    console.log("Connected to the database");

    app.listen(port, () => {
      console.log("Server started at port 5038");
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

start();
exports.app = onRequest(app);
