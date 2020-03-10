import React from "react";
import logo from "./logo.svg";
import Timer from "./components/timer";
import "./App.css";

Date.prototype.addHours = function(h) {
  this.setTime(this.getTime() + h * 60 * 60 * 1000);
  return this;
};

function App() {
  return <Timer endDate={new Date().addHours(1)} />;
}

export default App;
