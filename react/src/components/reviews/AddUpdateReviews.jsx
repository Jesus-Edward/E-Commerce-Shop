import React, { useContext } from "react";
import { axiosRequest, getConfig } from "../../helpers/config";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { ReviewContext } from "./context/ReviewContext";
import { Rating } from "react-simple-star-rating";

export default function AddUpdateReviews() {
    const { token } = useSelector((state) => state.user);

    const {
        product,
        review,
        setReview,
        setLoading,
        handleRating,
        clearReview,
        updating,
    } = useContext(ReviewContext);

    const addReviews = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axiosRequest.post(
                "review/store",
                review,
                getConfig(token)
            );
            if (response.data.error) {
                toast.error(response.data.error);
                setLoading(false);
            } else {
                toast.success(response.data.message);
                clearReview();
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const editReviews = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axiosRequest.put(
                "review/update",
                review,
                getConfig(token)
            );
            if (response.data.error) {
                toast.error(response.data.error);
                setLoading(false);
            } else {
                product.reviews = product?.reviews?.filter(
                    (item) => item.id !== review.id
                );
                toast.success(response.data.message);
                clearReview();
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <div className="my-4 flex-row">
            {/* <div className="mb-8 flex justify-center bg-orange-400 p-2 text-white">
                <h3 className="font-bold">Review Page</h3>
            </div> */}

            <div className="grid grid-cols-1 mx-auto">
                <div className="bg-white shadow-md rounded-b-md">
                    <div className="bg-white shadow-lg mx-auto my-6 rounded-b-md ml-10 mr-10">
                        <div className="bg-orange-400 text-white">
                            <div className="text-center mt-2 p-1">
                                <h5 className="">
                                    {!updating ? "Add" : "Edit"} your review
                                </h5>
                            </div>
                        </div>
                        <div className="mt-5 mx-3">
                            <form
                                action="#"
                                method="post"
                                onSubmit={(e) =>
                                    updating ? editReviews(e) : addReviews(e)
                                }
                            >
                                <div className="">
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Title of your review"
                                        required
                                        value={review.title}
                                        className="border border-orange-400 bg-white shadow-sm
                                        w-full py-1.5 px-3 focus:border-none sm:text-sm sm:leading-6"
                                        name="title"
                                        onChange={(e) =>
                                            setReview({
                                                ...review,
                                                title: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="mt-1">
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Review
                                    </label>
                                    <textarea
                                        rows="5"
                                        type="text"
                                        placeholder="Write your review here"
                                        required
                                        className="border border-orange-400 bg-white shadow-sm
                                        w-full py-1.5 px-3 focus:border-none sm:text-sm sm:leading-6"
                                        name="body"
                                        value={review.body}
                                        onChange={(e) =>
                                            setReview({
                                                ...review,
                                                body: e.target.value,
                                            })
                                        }
                                    ></textarea>
                                </div>
                                <div className="mt-4">
                                    <Rating
                                        initialValue={review.rating}
                                        onClick={handleRating}
                                        SVGstyle={{ display: "inline" }}
                                    />
                                </div>

                                <div className="flex justify-between mt-5">
                                    {!updating ? (
                                        <button
                                            className="mb-5 bg-orange-400 p-2 text-white rounded-sm hover:bg-orange-500
                                                cursor-pointer"
                                            disabled={
                                                review.rating === 0 ||
                                                !review.title ||
                                                !review.body
                                            }
                                        >
                                            Add review
                                        </button>
                                    ) : (
                                        <div>
                                            <button
                                                className="mb-5 bg-orange-400 p-2 text-white rounded-sm hover:bg-orange-500
                                                    cursor-pointer"
                                                disabled={
                                                    review.rating === 0 ||
                                                    !review.title ||
                                                    !review.body
                                                }
                                            >
                                                Update review
                                            </button>
                                            <button
                                                type="button"
                                                className="mb-5 bg-red-400 p-2 text-white rounded-sm hover:bg-red-500
                                                    cursor-pointer ml-2"
                                                onClick={(e) => clearReview()}
                                            >
                                                Cancel updating
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
