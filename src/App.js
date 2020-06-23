import React from "react";
import { Page } from "@material-ui/core";
import { TopBar, Appbar } from "./components";
import "./App.css";

const App = () => {
  return (
    <div>
      <TopBar />
      <Appbar />
    </div>
  );
};

export default App;
