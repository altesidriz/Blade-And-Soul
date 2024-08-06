import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Navbar from './components/navbar/Navbar';
import Profile from './pages/profile/Profile';
import Shop from './pages/shop/Shop';
// import Home from './pages/home/Home';
// import News from './pages/news/News';

function App() {

  return (
    <>
      <div>
          <Header />
          <Navbar />
          {/* <Home /> */}
          {/* <News /> */}
          {/* <Shop /> */}
          <Profile />
          <Footer />

      </div>
    </>
  );
}

export default App;
