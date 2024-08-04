import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';

function App() {

  return (
    <>
      <div>

          <Header />
          <Navbar />
          <Home />
          <Footer />

      </div>
    </>
  );
}

export default App;
