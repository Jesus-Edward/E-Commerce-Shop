import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Stripe from "./Stripe";
import { useNavigate } from "react-router-dom";
import {
    Elements
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

export default function OrderSummary() {

     const stripePromise = loadStripe(
         "pk_test_51PGcKKC6H8NbZoTza6PPmor7dwRXGkyt9gxJlLS6swD5gKnBnct7uIMum2EtPvnZxzoOJ2GTsdyLQbpYkzyaKLuq003V1OzRTm"
     );
    const { isLoggedIn } = useSelector(state => state.user);
    const { cartItems } = useSelector((state) => state.cart);
    const navigate = useNavigate();
    let amount = cartItems.reduce(
        (acc, item) => (acc += item.price * item.quantity),
        0
    );

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login')
        }
        if (!cartItems.length) {
            navigate('/')
        }
    }, [isLoggedIn,cartItems])

    return (
        <div className="container">
            <div className="flex-row my-3">
                <div className="grid md:grid-col-2 mx-auto">
                    <Elements stripe={stripePromise}>
                        <Stripe />
                    </Elements>
                </div>
            </div>
        </div>
    );
}
