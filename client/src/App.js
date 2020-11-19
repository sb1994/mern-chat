import axios from "axios";
import React, { Component } from "react";

class App extends Component {
  componentDidMount() {
    axios
      .get("api/users/test")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <div>
        <h1>Hello</h1>
      </div>
    );
  }
}
export default App;
