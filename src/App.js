import React from "react";
import "./App.css";
import {Switch, Route} from 'react-router-dom';
import MainPage from './components/main-page/MainPage'
import CompareCart from './components/compare-cart/CompareCart'

class App extends React.Component {
  render(){
    return (
      <div>
        <Switch>
          <Route path="/" exact component = {MainPage}/>
          <Route path="/compareCart" exact component={CompareCart} />
        </Switch>
      </div>
    )
  }
}

export default App;
