import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import Header from './components/Header';

import './compiled/styles.css'

const App = () => {
  return (
    <div className="app">
      <Header />
      <Dashboard />
      <Footer />
    </div>
  );
}

export default App;
