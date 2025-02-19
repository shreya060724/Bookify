import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route,Routes} from 'react-router-dom'

//components importing
import MyNavbar from './components/Navbar';

//pages importing
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';
import ListingPage from './pages/List';
import HomePage from './pages/Home';
import BookDetailPage from './pages/Details';
import OrdersPage from './pages/ViewOrder';
import ViewOrderDetails from './pages/ViewOrderDetail';

function App() {
  return(
    <div>
      <MyNavbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/book/list' element={<ListingPage/>}/>
        <Route path='/book/view/:bookId' element={<BookDetailPage/>}/>
        <Route path='/book/orders' element={<OrdersPage/>}/>
        <Route path='/books/orders/:bookId' element={<ViewOrderDetails/>}/>
      </Routes>
    </div>
  )
}

export default App
