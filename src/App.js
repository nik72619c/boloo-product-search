import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import MainPage from "./components/main-page/MainPage";
import Dashboard from "./components/dashboard/Dashboard";
import Navbar from "./components/navbar/Navbar";

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/compareCart" exact component={Dashboard} />
        </Switch>
      </div>
    );
  }
}

export default App;
