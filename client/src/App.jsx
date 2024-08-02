import './App.css';
import Header from './components/header/Header';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';

function App() {

  return (
    <>
      <div>
        <div className='main'>
          <Header />
          <Navbar />
          <Home />
        </div>
      </div>
    </>
  );
}

export default App;
