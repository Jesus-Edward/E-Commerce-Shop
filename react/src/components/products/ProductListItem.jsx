import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

export default function ProductListItem({ product }) {

    const shortStrings = (text, maxLimit) => {
        if (text.length > maxLimit) {
            return text.substring(0, maxLimit) + "...";
        }
        return text;
    };

    const calculateReviewAverage = () => {
        let average = product?.reviews?.reduce((acc, review) => {
            return (acc += review.rating / product?.reviews?.length);
        }, 0);

        return average > 0 ? average?.toFixed(1) : 0;
    };

    return (
        <div className="rounded-lg shadow-lg w-80 h-96 bg-white">
            <Link
                to={`/product/${product.id}`}
                className="text-black no-underline"
            >
                <div className="p-5 flex flex-col ">
                    <div className="overflow-hidden">
                        <img
                            src={product.thumbnail}
                            alt={product.name}
                            className="w-60 h-40"
                        />

                        <div className="flex justify-between mt-3 text-xl">
                            <h1 className="text-black font-bold">
                                {shortStrings(product.name, 13)}
                            </h1>
                            <h5 className="text-white bg-red-600 p-1">
                                ${product.price}
                            </h5>
                        </div>
                        {calculateReviewAverage() > 0 && (
                            <div className="mt-2 flex">
                                {/* <span className="text-gray-400 mx-1">
                                    <i>
                                        {product?.reviews?.length}{" "}
                                        {product?.reviews.length < 1
                                            ? "Review"
                                            : "Reviews"}{" "}
                                    </i>
                                </span> */}
                                <span className="-mt-1">
                                    <Rating
                                        initialValue={calculateReviewAverage()}
                                        SVGstyle={{ display: "inline" }}
                                        size={20}
                                        readonly
                                    />
                                </span>
                            </div>
                        )}

                        <div className="flex justify-between">
                            <div className="flex justify-start items-center mb-3">
                                {product.sizes?.map((size) => (
                                    <span
                                        key={size.id}
                                        className="text-black mt-3 p-1 font-bold"
                                    >
                                        <small>{size.name}</small>
                                    </span>
                                ))}
                            </div>
                            <div className="flex justify-start items-center mb-3">
                                {product.colors?.map((color) => (
                                    <div
                                        key={color.id}
                                        className="text-black mt-3 p-1 font-bold border border-gray-500 me-1"
                                        style={{
                                            backgroundColor:
                                                color.name.toLowerCase(),
                                            width: "20px",
                                            height: "20px",
                                        }}
                                    ></div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-end">
                            {product.status && product.qty > 0 ? (
                                <span className="bg-indigo-400 p-1 rounded-md text-white">
                                    In Stock
                                </span>
                            ) : (
                                <span className="bg-red-600 px-1 py-1 rounded-md text-white">
                                    Stock out
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
