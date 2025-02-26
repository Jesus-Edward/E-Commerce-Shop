import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Coupon from "../coupons/Coupon";
import { setValidCoupon } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Alert from "../layouts/Alert";
import UpdateUserInfo from "../users/UpdateUserInfo";
import "../../../public/style.css";

export default function Checkout() {
    const { user, isLoggedIn } = useSelector((state) => state.user);

    const { cartItems, validCoupon } = useSelector((state) => state.cart);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const total = cartItems.reduce(
        (acc, item) => (acc += item.price * item.qty),
        0
    );

    const discount = (total / 100) * validCoupon.discount;

    const grand_total = total - discount;

    const removeCoupon = () => {
        dispatch(setValidCoupon({ name: "", discount: 0 }));

        toast.success("Coupon removed successfully");
    };

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn]);

    return (
        <div className="bg-white shadow-md">
            <div className="mb-8 flex justify-center bg-orange-500 p-2 text-white">
                <h3 className="font-bold">Checkout</h3>
            </div>
            <div className="flex-row my-5 sm:block ">
                <div className="grid lg:grid-cols-3">
                    <UpdateUserInfo profile={false} />
                </div>
                <div
                    className="lg:flex md:flex lg:justify-end md:justify-end"
                    style={{ marginLeft: "28px" }}
                >
                    <div className="grid grid-cols-1 md:w-auto lg:w-1/2 mt-5 special">
                        <Coupon />
                        <ul className="space-y-0 mb-5">
                            {cartItems.map((item) => (
                                <li
                                    key={item.ref}
                                    className="flex bg-white border border-gray-200 mb-0 mr-2 pr-2 my-2 hover:bg-gray-50"
                                >
                                    <div className="flex justify-center">
                                        <img
                                            src={item.image}
                                            alt=""
                                            className="w-20 h-20"
                                        />
                                    </div>
                                    <div className="flex flex-col ml-2">
                                        <strong>
                                            <h5>{item.name}</h5>
                                        </strong>
                                        <span className="text-gray-500">
                                            <strong>Color: {item.color}</strong>
                                        </span>
                                        <span className="text-gray-500">
                                            <strong>Size: {item.size}</strong>
                                        </span>
                                    </div>
                                    <div className="flex flex-col ms-auto">
                                        <span className="text-gray-500">
                                            <small>
                                                {item.price} <i>x</i> {item.qty}
                                            </small>
                                        </span>
                                        <span className="text-red-500">
                                            <strong>
                                                ${item.price * item.qty}
                                            </strong>
                                        </span>
                                    </div>
                                </li>
                            ))}

                            <li className="flex justify-between bg-white border border-gray-200 mr-2 pr-2 my-2 hover:bg-gray-50">
                                <span className="text-red-500 font-bold py-1 px-2">
                                    Discount: {validCoupon.discount}%
                                </span>
                                <span className="flex text-red-500 py-1 px-2">
                                    <strong className="font-semibold">
                                        {validCoupon.name}
                                    </strong>
                                    {validCoupon.name && (
                                        <div className="">
                                            <XMarkIcon
                                                className="w-5 h-5 font-bold cursor-pointer bg-red-500
                                          text-white relative top-0.5 left-2"
                                                onClick={removeCoupon}
                                            />
                                        </div>
                                    )}
                                </span>
                            </li>
                            <li className="flex justify-between bg-white border py-1 px-2 border-gray-200 mr-2 pr-2 my-2 hover:bg-gray-50">
                                <span className="font-bold text-red-500">
                                    Discount off: ${discount.toFixed(2)}
                                </span>
                            </li>
                            <li className="flex justify-between bg-white border py-1 px-2 border-gray-200 mr-2 pr-2 my-2 hover:bg-gray-50">
                                <span className="font-bold text-red-500 ">
                                    Total: ${total}
                                </span>
                                <span className="font-bold text-red-500">
                                    Grand Total: ${grand_total.toFixed(2)}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="">
                    {user?.profile_completed == 1 ? (
                        <div className="flex justify-end relative md:bottom-2.5 md:right-2 payment">
                            <Link to="/pay/order">
                                <button className="rounded-sm bg-indigo-400 text-white px-2 py-1 hover:bg-indigo-600">
                                    Proceed to payment
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <div className="">
                            <Alert
                                type="primary"
                                content="Add your billing info to make payment"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
