const Express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = Express();
app.use(Express.json());
app.use(cors());
const port = 5038;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  next();
});

const connectString = "";

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
    response.status(500).json({ error: "Server Error" });
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
