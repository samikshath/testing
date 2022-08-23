import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePage from './components/home/HomePage';
import AboutUs from './components/home/AboutUs';
import ContactUs from './components/home/ContactUs';
import Logout from './components/home/Logout';
import ShowFoodItems from './components/user/ShowFoodItems';
import FoodMenus from './components/restaurantOwner/FoodMenus';
import Cart from './components/user/Cart';
import Restaurant from './components/admin/Restaurant';
import AddFoodMenu from './components/restaurantOwner/AddFoodMenu';
import AddRestaurant from './components/admin/AddRestaurant';
import UpdateFoodMenu from './components/restaurantOwner/UpdateFoodMenu';
import UpdateRestaurant from './components/admin/UpdateRestaurant';
import Offer from './components/restaurantOwner/Offer';
import UpdateOffer from './components/restaurantOwner/UpdateOffer';
import Login from './components/user/Login';
import UpdateProfile from './components/user/UpdateProfile';
import UserProfile from './components/user/UserProfile';
import ShowOrdersForRestaurant from './components/restaurantOwner/ShowOrdersForRestaurant';
import RestaurantLogin from './components/restaurantOwner/RestaurantLogin';
import Complaint from './components/user/Complaint';
import AdminLogin from './components/admin/AdminLogin';
import User from './components/admin/User';
import ComplaintMesage from './components/user/ComplaintMesage';
import Registration from './components/user/Registration';
import AddOffer from './components/restaurantOwner/AddOffer';
import ShowCurrentOrders from './components/user/ShowCurrentOrders';
import Search from './components/home/Search';
import ForgetPassword from './components/user/ForgetPassword';
import Header from './components/home/Header';
import RestaurantOwnerHeader from './components/restaurantOwner/RestaurantOwnerHeader';
import AdminHeader from './components/admin/AdminHeader';
import Dashboard from './components/admin/Dashboard';
import AdminHomePage from './components/admin/AdminHomePage';
import RestaurantHome from './components/restaurantOwner/RestaurantHome';
import Footer from './components/home/Footer';
import RestaurantDashboard from './components/restaurantOwner/RestaurantDashboard';

function App() {
 let header;
 if(sessionStorage.getItem('admin')){
   header=<AdminHeader/>
 } else if(sessionStorage.getItem('restaurant')){
   header=<RestaurantOwnerHeader/>
 } else {
   header=<Header/>
 }
  return (
    <div className="App">
    
      <BrowserRouter>
      {header}
         <Routes>
          
          <Route exact path="/user-login" element={<Login/>} />
          <Route path="/" element={<HomePage/>}/>
          <Route path="/aboutus" element={<AboutUs/>}/>
          <Route path="/contactus" element={<ContactUs/>}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route path="/user-profile" element={<UserProfile/>}/>
          <Route path="/update-profile" element={<UpdateProfile/>}/>
          <Route path="/food-items" element={<ShowFoodItems/>}/>
          <Route path="/admin-login" element={ <AdminLogin/>} />
          <Route path="/show-orders-owner" element={<ShowOrdersForRestaurant/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/add-foodmenu" element={ <AddFoodMenu/>} />
          <Route path="/food-menu" element={ <FoodMenus/>} />      
          <Route path="/edit-foodmenu" element={ <UpdateFoodMenu/>} />
          <Route path="/restaurant" element={ <Restaurant/>} />
          <Route path="/add-restaurant" element={ <AddRestaurant/>} />
          <Route path="/edit-restaurant" element={ <UpdateRestaurant/>} />
          <Route path="/offer" element={ <Offer/>} />
          <Route path="/register" element={ <Registration/>} />
          <Route path="/edit-offer" element={ <UpdateOffer/>} />
          <Route path="/restaurant-login" element={ <RestaurantLogin/>} />
          <Route path="/my-complaint/:id" element={ <Complaint/>} />
          <Route path="/add-offer" element={ <AddOffer/>} />
          <Route path="/user-details" element={ <User/>} />
          <Route path="/filter" element={ <Search/>} />
          <Route path="/complaint-message/:id" element={ <ComplaintMesage/>} />
          <Route path="/home-page" element={ <AdminHomePage/>} />
          <Route path="/admin-home" element={ <Dashboard/>} />
          <Route path="/restaurantdashboard" element={ <RestaurantDashboard/>} />
          <Route path="/restaurant-home" element={ <RestaurantHome/>} />
          <Route path="/my-current-orders" element={ <ShowCurrentOrders/>} />
          <Route path="/forget-password" element={ <ForgetPassword/>} />
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
