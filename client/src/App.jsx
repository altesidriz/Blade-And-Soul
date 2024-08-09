import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Navbar from './components/navbar/Navbar';
// import Home from './pages/home/Home';
// import News from './pages/news/News';
// import Shop from './pages/shop/Shop';
// import Profile from './pages/profile/Profile';
import Forum from './pages/forum/Forum';


function App() {

  return (
    <>
      <div>
          <Header />
          <Navbar />
          {/* <Home /> */}
          {/* <News /> */}
          {/* <Shop /> */}
          {/* <Profile/> */}
          <Forum />
          <Footer />

      </div>
    </>
  );
}

export default App;
