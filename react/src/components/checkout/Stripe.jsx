import React, { useEffect, useState } from "react";
import {
    Elements,
    useElements,
    CardElement,
    useStripe,
} from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { axiosRequest, getConfig } from "../../helpers/config";
// import { useSelector } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCartItems, setValidCoupon } from "../../redux/slices/cartSlice";
// import { setCurrentUser } from "../../redux/slices/userSlice";
import { toast } from "react-toastify";

export default function Stripe() {
    const [clientSecret, setClientSecret] = useState("");
    const { token } = useSelector((state) => state.user);
    const { cartItems } = useSelector((state) => state.cart);
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const storeOrder = async () => {
        try {
            const response = await axiosRequest.post(
                "store/order",
                { products: cartItems },
                getConfig(token)
            );

            console.log(response);

            dispatch(clearCartItems());
            dispatch(
                setValidCoupon({
                    name: "",
                    discount: 0,
                })
            );
            dispatch(setCurrentUser(response.data.user));
            setIsProcessing(false);
            toast.success("Payment made successfully");
        } catch (error) {
            console.log(error);
            setIsProcessing(false);
            navigate("/login");
        }
    };

    const handleSubmit = async (e) => {
        try {
            if (!stripe || !elements) {
                return;
            }

            setIsProcessing(true);

            // const response = await stripe.confirmPayment({
            //     elements,
            //     confirmParams: {
            //         Make sure to change this to your payment completion page
            //     },
            //     redirect: "if_required",
            // });

            if (
                (response.error && response.error.type === "card_error") ||
                (response.error && response.error.type === "validation_error")
            ) {
                setMessage(response.error.message);
            } else if (response.paymentIntent.id) {
                //display success message or redirect user
                storeOrder();
            }

            setIsProcessing(false);

        } catch (error) {
            console.log(error);

        }

    };

    useEffect(() => {
        fetchClientSecret();
    }, []);

    const fetchClientSecret = async () => {
        try {
            const { paymentMethod } = await stripe.createPaymentMethod({
                type: "card",
                card: elements.getElement(CardElement),
            });

            const response = await axiosRequest.post(
                "pay/order",
                {
                    cartItems,
                    payment_method_id: paymentMethod.id,
                },
                getConfig(token)
            );
            setClientSecret(response.data.clientSecret);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <CardElement />
            <button disabled={isProcessing || !stripe || !elements} id="submit">
                <span id="button-text">
                    {isProcessing ? "Processing ... " : "Pay now"}
                </span>
            </button>
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
        </form>
    );

    // return (
    //     <>
    //         {stripePromise && clientSecret && (
    //             <CardElement stripe={stripePromise} options={{ clientSecret }}>
    //                 <CheckoutForm />
    //             </CardElement>
    //         )}
    //     </>
    // );
}
