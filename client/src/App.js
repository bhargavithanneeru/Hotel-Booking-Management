import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/login"
import Register from "./pages/register/register"
import ProfilePage from "./pages/profile/Profile";
import CheckoutPage from "./pages/checkout/Checkout";
import SuccessPage from "./pages/success/success";
import ForgotPassword from "./pages/forgotpassword/forgotpassword";
import ResetPassword from "./pages/resetpassword/resetpassword";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/hotels" element={<List/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path="/hotels/:id/checkout" element={<CheckoutPage/>}/>
        <Route path="/success" element={<SuccessPage/>}/>
        <Route path="/forgotpassword" element={<ForgotPassword/>}/>
        <Route path="/reset-password/:token" element={<ResetPassword/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
