import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ReviewContext } from "./context/ReviewContext";
import AddUpdateReviews from "./AddUpdateReviews";
import ReviewsList from "./ReviewsList";

export default function Reviews({ product, setLoading }) {
    const { user, isLoggedIn } = useSelector((state) => state.user);
    const [updating, setUpdating] = useState(false);
    const [review, setReview] = useState({
        product_id: product?.id,
        user_id: user.id,
        title: "",
        body: "",
        rating: 0,
    });

    const handleRating = (rating) => {
        setReview({
            ...review,
            rating,
        });
    };

    const clearReview = () => {
        setReview({
            product_id: product?.id,
            user_id: user.id,
            title: "",
            body: "",
            rating: 0,
        });

        if (updating) {
            setUpdating(false);
        }
    };

    const checkIfUserBoughtProduct = () => {
        return user?.orders?.some((order) =>
            order?.products?.some((item) => item?.id === product?.id)
        );
    };

    const editReview = (data) => {
        setReview(data);
        setUpdating(true);
    };

    return (
        <ReviewContext.Provider
            value={{
                product,
                review,
                setReview,
                setLoading,
                handleRating,
                clearReview,
                updating,
                setUpdating,
                editReview,
            }}
        >
            <ReviewsList />
            {isLoggedIn && checkIfUserBoughtProduct() && <AddUpdateReviews />}
        </ReviewContext.Provider>
    );
}
