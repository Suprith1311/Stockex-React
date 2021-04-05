import {BrowserRouter as Router, Route} from 'react-router-dom';
import React, { Component } from 'react';
import './App.css';
import Headers from './Components/Header';
import Logo from './Components/Logo';
import Footer from './Components/Footer';
import DashBoard from './Components/LandingPage';
import Stocks from './Components/Search';
import StockDetails from './Components/Stockpage';
class App extends Component {
  render() {
      return(
        <div>
          <Headers/>
          <Logo/>
          <Router>
              <Route path ='/' component ={DashBoard} exact />
              <Route path ='/search' component = {Stocks} />
              <Route path ='/stock/:id' component = {StockDetails} />
              
              
          </Router>
          <Footer/>
        </div>
         
      );
  }
}

export default App;