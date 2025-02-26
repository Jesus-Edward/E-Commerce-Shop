import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import Header from "./components/layouts/Header.jsx";
import Product from "./components/products/Product.jsx";
import Cart from "./components/cart/Cart.jsx";
import Checkout from "./components/checkout/Checkout.jsx";
import Login from "./components/users/Login.jsx";
import Register from "./components/users/Register.jsx";
import Profile from "./components/users/Profile.jsx";
import PayByStripe from "./components/checkout/PayByStripe.jsx";
import UserOrders from "./components/users/UserOrders.jsx";
import PageNotFound from "./components/404/PageNotFound.jsx";

export default function App() {
    return (
        <div className="-mt-5">
            <BrowserRouter>
                <Header />
                <div className="shadow-md container mx-auto p-3 rounded-md mt-10 border border-gray-200 bg-white">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/product/:id" element={<Product />} />
                        <Route path="/product/:id" element={<Product />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/pay/order" element={<PayByStripe />} />
                        <Route path="/user/orders" element={<UserOrders />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}
