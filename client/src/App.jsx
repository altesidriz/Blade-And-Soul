import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import News from './pages/news/News';
import Shop from './pages/shop/Shop';
import Profile from './pages/profile/Profile';
import Forum from './pages/forum/Forum';
import Post from './pages/post/Post';
import Signup from './pages/register/Signup';
import Login from './pages/login/Login';


function App() {

  return (
    <>
      <div>
        <BrowserRouter >
          <Header />
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/news' element={<News />} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/forum' element={<Forum />} />
            <Route path='/post/:id' element={<Post />}/>
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
