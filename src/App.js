import React from "react";
import { Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import Main from './Main';
import Update from './Update';
import Footer from './Footer';

function App() {
  return (
    <div className="App">
      <DataProvider>
        <div className="flex flex-col min-h--screen">
          <Routes>
            <Route path="/" element={ <Main /> } />
            <Route path="/update" element={ <Update />} />
          </Routes>
        </div>
        
        <Footer/>

      </DataProvider>
    </div>
  );
}

export default App;
