import React, { useContext } from "react";
import { ReviewContext } from "./context/ReviewContext";
import ReviewListItem from "./ReviewListItem";

export default function ReviewsList() {
    const { product } = useContext(ReviewContext);
    return (
        <div>
            <ul className='my-5 "space-y-0'>
                {product?.reviews?.map((review) => (
                    <ReviewListItem key={review.id} review={review} />
                ))}
            </ul>
        </div>
    );
}
