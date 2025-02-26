import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileSidebar from "./partials/ProfileSidebar";
import "../../../public/style.css";
import Alert from "../layouts/Alert";

export default function UserOrders() {
    const { user, isLoggedIn, token } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [orderToShow, setOrderToShow] = useState(5);

    const loadMoreOrders = () => {
        if (orderToShow > user?.orders?.length) {
            return;
        } else {
            setOrderToShow((prevOrdersToShow) => (prevOrdersToShow += 5));
        }
    };

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn]);

    return (
        <div className="md:flex md:flex-row my-5 sm:block">
            <ProfileSidebar />
            <div className="grid md:grid-cols-1 lg:grid-cols-1 w-full block-grid">
                <div className="shadow-md bg-white md:ml-4 md:mb-2 sm:ml-2">
                    {user?.orders?.length > 0 ? (
                        <table className="w-full overflow-scroll">
                            <thead>
                                <tr className="">
                                    <th>S/N</th>
                                    <th>Product Name</th>
                                    <th>Product Price</th>
                                    <th>Product Qty</th>
                                    <th>Total</th>
                                    <th>Order Date</th>
                                    <th>Delivered Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {user?.orders
                                    ?.slice(0, orderToShow)
                                    .map((order, index) => (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>
                                                <div className="flex flex-col">
                                                    {order?.products?.map(
                                                        (product) => (
                                                            <span className="bg-blue-600 text-white rounded-none my-1">
                                                                {product?.name}
                                                            </span>
                                                        )
                                                    )}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="flex flex-col">
                                                    {order?.products?.map(
                                                        (product) => (
                                                            <span className="bg-blue-600 text-white rounded-none my-1">
                                                                $
                                                                {product?.price}
                                                            </span>
                                                        )
                                                    )}
                                                </div>
                                            </td>
                                            <td>{order?.quantity}</td>
                                            <td>${order?.total}</td>
                                            <td>{order?.created_at}</td>
                                            <td>
                                                {order?.delivered_at ? (
                                                    <span className="bg-blue-600 text-white rounded-none my-1">
                                                        ${order?.delivered_at}
                                                    </span>
                                                ) : (
                                                    " Pending..."
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    ) : (
                        <Alert content="No orders yet" />
                    )}

                    {orderToShow < user?.orders?.length && (
                        <div className="flex justify-start my-3">
                            <button
                                className="flex py-2 px-3 bg-indigo-400 text-white rounded-md
                                hover:bg-indigo-600"
                                onClick={(e) => loadMoreOrders()}
                            >
                                <ArrowDownTrayIcon className="h-6 w-6 text-white mr-1 -mt-1" />
                                Load More
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
