// import logo from './logo.svg';
import './App.css';

import React, {useState} from 'react';
import NavBar from './component/NavBar';
import News from './component/News';
import {BrowserRouter as Router, Routes, Route,} from "react-router-dom";

import LoadingBar from 'react-top-loading-bar'

const App =()=> {
  const pageSize = 10;

  const apiKey = '48c4c58bf9ce4a73930618ad52187c4b'
  const [progress, setProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState(null);
  const [mode, setMode] = useState('light');

  const handleSearch = (query) => {
        setSearchQuery(query);
    };

  const resetSearch = () => {
    setSearchQuery(null);
  }


  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = '#212529'; 
      document.body.style.color = '#f8f9fa';
    } else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
      document.body.style.color = 'black'; 
    }
  }
  
  
    return (
      <div style={{backgroundColor: mode === 'dark' ? '#212529' : 'white', color: mode === 'dark' ? '#f8f9fa' : 'black'}}>
        <Router>
        <NavBar onSearch={handleSearch} resetSearch={resetSearch} mode={mode} toggleMode={toggleMode}/>
        <LoadingBar
            color="#f11946"
            progress={progress}
            height={3}
          />
        <Routes>
            <Route exact path="/" element={<News setProgress={setProgress} apiKey = {apiKey} key="general" pageSize={pageSize} country="us" category="general" searchQuery={null} mode={mode}/>}/>
            <Route exact path="/business" element={<News setProgress={setProgress} apiKey = {apiKey} key="business" pageSize={pageSize} country="us" category="business" searchQuery={null} mode={mode}/>} />
            <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey = {apiKey} key="entertainment" pageSize={pageSize} country="us" category="entertainment" searchQuery={null} mode={mode}/>} />
            <Route exact path="/health" element={<News setProgress={setProgress} apiKey = {apiKey} key="health" pageSize={pageSize} country="us" category="health" searchQuery={null} mode={mode}/>}/>
            <Route exact path="/science" element={<News setProgress={setProgress} apiKey = {apiKey} key="science" pageSize={pageSize} country="us" category="science" searchQuery={null} mode={mode}/>}/>
            <Route exact path="/sports" element={<News setProgress={setProgress} apiKey = {apiKey} key="sports" pageSize={pageSize} country="us" category="sports" searchQuery={null} mode={mode}/>}/>
            <Route exact path="/technology" element={<News setProgress={setProgress} apiKey = {apiKey} key="technology" pageSize={pageSize} country="us" category="technology" searchQuery={null} mode={mode}/>}/>
            <Route path="/search" element={
            <News 
              setProgress={setProgress} 
              apiKey={apiKey} 
              key={`search-${searchQuery}`} 
              pageSize={pageSize} 
              country="us"
              category="general" 
              searchQuery={searchQuery}
              mode={mode}
            />} 
          />
          </Routes>
        </Router>
      </div>
    );
}

export default App;