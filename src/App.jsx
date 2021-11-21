import React, { useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import StateProvider, { stateContext } from './providers/StateProvider.jsx';
import Header from './Header.jsx';
import Nav from './Nav.jsx';
import Inbox from './Inbox.jsx';

const App = () => {

  return (
    <div className='container'>
      <Header/>
      <StateProvider>
        <Router>
          <Nav />

          <Routes>
            <Route path="/archive" element={<Inbox />}/>
            <Route path="/" element={<Inbox />}/>
          </Routes>
        </Router>
      </StateProvider>
    </div>
  );
};

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
