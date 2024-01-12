var Express = require("express");
const res = require("express/lib/response");
var mongoose = require("mongoose");

var app = Express();

const port = 5038;
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
var connect_string =
  "mongodb+srv://tartejbros:Rr5rnp6PAQng3lHr@todoapp.wrcgueg.mongodb.net/tododb?retryWrites=true&w=majority";
console.log("Connecting to database...");
const schema = new mongoose.Schema({
  id: Number,
  task: String,
});
const todo = mongoose.model("todocollection", schema);

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
app.post("/todoapp/new", (request, response) => {
  const addvalue = new todo({
    id: request.body.id,
    task: request.body.task,
  });
  addvalue.save((err, result) => {
    if (err) return console.log(err);
    console.log(result);
  });
  console.log(request.body);
});
const start = async () => {
  await mongoose.connect(connect_string);
  database = mongoose.connection;
  app.listen(port, () => {
    console.log("Server started at port 5038");
  });
};
start();
