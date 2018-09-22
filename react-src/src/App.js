import React, { Component } from 'react';
import { Route, HashRouter } from 'react-router-dom';
import './App.css';
import Header from "./templates/parts/Header";
import Add from "./templates/Add";
import Main from "./templates/Main";
import Remove from "./templates/Remove";
import Update from "./templates/Update";
import Show from "./templates/Show";

class App extends Component {
  render() {
    return (
      <div className="App">
        {/*Для SPA используем хэшроутер, не самый лучший выбор на мой взгяд, но для тестового задания сойдёт*/}
        <HashRouter>
          <div className="container-full">
        <Header/>
          <div className='main-content'>
            <Route exact path='/' component={Main}/>
            <Route path='/add' component={Add}/>
            <Route path='/remove/:id' component={Remove}/>
            <Route path='/update/:id' component={Update}/>
            <Route path='/show/:id' component={Show}/>
          </div>
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default App;
