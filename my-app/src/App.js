import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavigationHeader from './containers/home-nav-header';
import BlackJack from './containers/black-jack';
import Home from './containers/home';

import './App.css';
import './styles/black-jack.css'
import './styles/home-nav-header.css'


const App = () => {
  console.log('000tester: ', Home)
  return (
    <Router>
      <NavigationHeader />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/black-jack" Component={BlackJack} />
        <Route path="/contact" Component={BlackJack} />
      </Routes>
    </Router>
  );
};

export default App;
