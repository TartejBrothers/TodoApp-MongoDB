import React from "react";
import { Component } from "react";
import "../styles/home.css";
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
    };
  }
  Api_url = "http://localhost:5001/todoapinew/us-central1/app/";
  componentDidMount() {
    this.refreshList();
  }
  async refreshList() {
    fetch(this.Api_url + "todoapp")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ notes: data });
        console.log(data);
      });
  }

  addclick() {
    var description = document.getElementById("newdescription").value;
    var data = {
      task: description,
    };
    fetch(this.Api_url + "todoapp/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify the content type as JSON
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Task Added");
        this.refreshList();
      });
  }

  render() {
    const { notes } = this.state;
    return (
      <div className="homebody">
        <h1>TodoAPP</h1>
        <input
          id="newdescription"
          type="text"
          placeholder="New Description"
          required
        />
        <br />
        <button id="addtask" onClick={() => this.addclick()}>
          Add Task
        </button>
        <input
          id="newdescription"
          type="text"
          placeholder="New Description"
          required
        />
        <br />
        <button id="addtask" onClick={() => this.deletetask()}>
          Delete Task
        </button>
        {notes.map((note) => (
          <p key={note._id}>
            <b>{note.task}</b>
          </p>
        ))}
      </div>
    );
  }
}
export default HomePage;
