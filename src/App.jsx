import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import StateProvider from './providers/StateProvider.jsx';
import Header from './Header.jsx';
import Nav from './Nav.jsx';
import Inbox from './Inbox.jsx';
import Archive from './Archive.jsx';
import ActivityDetail from './ActivityDetail.jsx';

const App = () => {
  return (
    <div className='container'>
      <Header/>
      <StateProvider>
        <Router>
          <Nav />

          <div className="container-view">
            <Routes>
                <Route path="/archive" element={<Archive />} />
                <Route path="/activity/:id" element={<ActivityDetail />} />

                <Route path="/" element={<Inbox />} />
            </Routes>
          </div>
        </Router>
      </StateProvider>
    </div>
  );
};

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
