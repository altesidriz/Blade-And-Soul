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
import Purchase from './pages/purchase/Purchase';
import Shop from './pages/shop/Shop';
import Profile from './pages/profile/Profile';
import Forum from './pages/forum/Forum';
import Post from './pages/post/Post';
import Signup from './pages/register/Signup';
import Login from './pages/login/Login';
import SingleNew from './pages/news/singleNew/SingleNew';
import Item from './pages/shop/item/Item';
import RouteProtect from './components/routeGuard/RouteProtect';
import NotFound from './pages/notFound/NotFound';


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
            <Route path='/news/:id' element={<SingleNew />} />

            <Route path='/shop' element={<RouteProtect><Shop /></RouteProtect>} />
            <Route path='/item/:id' element={<RouteProtect><Item /></RouteProtect>} />
            <Route path='/purchase' element={<RouteProtect><Purchase /></RouteProtect>} />
            <Route path='/profile/:id' element={<RouteProtect><Profile /></RouteProtect>} />

            <Route path='/forum' element={<Forum />} />
            <Route path='/post/:id' element={<Post />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
