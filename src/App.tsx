import React from 'react';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import Header from './components/Header';
import './compiled/styles.css'

function App() {
  return (
    <div className="App">
      <Header />
      <Dashboard />
      <Footer />
    </div>
  );
}

export default App;
