import React from "react";
import { Component } from "react";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
    };
  }
  Api_url = "http://localhost:5038/";
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
      <div>
        <h1>TodoAPP</h1>
        <input id="newdescription" type="text" placeholder="New Description" />

        <button id="addtask" onClick={() => this.addclick()}>
          Add Task
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
