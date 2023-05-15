import React from 'react';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import './App.css';
import Layout from './layout/layout';
import HomePage from './pages/homePage/HomePage';
import Info from './pages/info/Info';
import NotFound from './pages/notFound/NotFound';


function App() {
  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<Layout Ai="AI" Name='Проектная практика' Info='Справка'/>}>
          <Route exact path="" element={<HomePage/>} ></Route>
          <Route exact path="Info" element={<Info/>}></Route>
          <Route Component={<NotFound/>}></Route>
          </Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
