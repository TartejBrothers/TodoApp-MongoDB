var Express = require("express");
const res = require("express/lib/response");
var mongoose = require("mongoose");

var app = Express();

const port = 5038;
var databasename = "tododb";
var database;
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

const start = async () => {
  await mongoose.connect(connect_string);
  database = mongoose.connection;
  app.listen(port, () => {
    console.log("Server started at port 5038");
  });
};
start();
