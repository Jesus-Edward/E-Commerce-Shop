import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosRequest } from "../../helpers/config";
import Alert from "../layouts/Alert";
import Spinner from "../layouts/Spinner";
import Slider from "./images/Slider";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import Reviews from "../reviews/Reviews";
import { Rating } from "react-simple-star-rating";

export default function Product() {
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [qty, setQty] = useState(1);
    const [error, setError] = useState("");
    const [selectedColors, setSelectedColors] = useState(null);
    const [selectedSizes, setSelectedSizes] = useState(null);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchProductDetails = async () => {
            setLoading(true);
            try {
                const response = await axiosRequest.get(`product/${id}/show`);

                setProduct(response.data.data);
                setLoading(false);
            } catch (error) {
                if (error?.response?.status === 404) {
                    setError("The requested product does not exist");
                }
                console.log(error);
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [id]);

    const makeUnique = (length) => {
        let result = "";
        const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const characterLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(
                Math.floor(Math.random() * characterLength)
            );
            counter += 1;
        }
        return result;
    };

    const calculateReviewAverage = () => {
        let average = product?.reviews?.reduce((acc, review) => {
            return (acc += review.rating / product?.reviews?.length);
        }, 0);

        return average > 0 ? average?.toFixed(1) : 0;
    };

    return (
        <div className="rounded-lg shadow-lg h-full bg-white border border-gray-400 mt-5 mb-5">
            {error ? (
                <Alert type="primary" content={error} />
            ) : loading ? (
                <Spinner />
            ) : (
                <>
                    <div className="flex justify-between">
                        <div className="grid md:grid-col-2 p-2 lg:grid-cols-2">
                            <div className="grid md:grid-cols-2">
                                <Slider product={product} />
                            </div>

                            <div className="grid md:grid-cols-1 lg:ml-20 h-96">
                                <div
                                    className="bg-white flex justify-between"
                                    style={{ marginTop: "0.55rem" }}
                                >
                                    <h1
                                        className="text-black lg:mr-32"
                                        style={{ marginRight: "17rem" }}
                                    >
                                        {product?.name}
                                    </h1>
                                    <small
                                        className="text-white rounded-md p-1 bg-red-500 h-7"
                                        style={{ marginRight: "10px" }}
                                    >
                                        ${product?.price}
                                    </small>
                                </div>
                                {calculateReviewAverage() > 0 && (
                                    <div className="mb-5 flex">
                                        <span className="text-gray-400 mx-1">
                                            <i>
                                                {product?.reviews?.length}{" "}
                                                {product?.reviews.length < 1
                                                    ? "Review"
                                                    : "Reviews"}{" "}
                                            </i>
                                        </span>
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
                                <div className="-mt-16">
                                    <p>{product?.description}</p>
                                </div>

                                <div className="flex justify-between -mt-52 mb-2">
                                    <div className="flex justify-start items-center">
                                        {product.sizes?.map((size) => (
                                            <span
                                                key={size?.id}
                                                className={` text-black me-1 font-bold bg-gray-50 cursor-pointer mt-5 ${
                                                    selectedSizes?.id ===
                                                    size?.id
                                                        ? "border border-gray-600"
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    setSelectedSizes(size)
                                                }
                                            >
                                                <small className="mx-2">
                                                    {size.name}
                                                </small>
                                            </span>
                                        ))}
                                    </div>

                                    <div
                                        className="flex justify-start items-center mb-3"
                                        style={{ marginRight: "10px" }}
                                    >
                                        {product.colors?.map((color) => (
                                            <div
                                                key={color.id}
                                                className={`text-black mt-1 p-1 font-bold border cursor-pointer ${
                                                    selectedColors?.id ===
                                                    color?.id
                                                        ? "border-gray-600"
                                                        : ""
                                                } `}
                                                style={{
                                                    backgroundColor:
                                                        color.name.toLowerCase(),
                                                    width: "20px",
                                                    height: "20px",
                                                }}
                                                onClick={() =>
                                                    setSelectedColors(color)
                                                }
                                            ></div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-start mb-2 -mt-24 h-8">
                                    {product.status && product.qty > 0 ? (
                                        <span className="bg-indigo-400 rounded-md text-white p-1">
                                            In Stock
                                        </span>
                                    ) : (
                                        <span className="bg-red-600 p-1 rounded-md text-white">
                                            Stock out
                                        </span>
                                    )}
                                </div>
                                <div
                                    className=""
                                    style={{ marginTop: "-100px" }}
                                >
                                    <div className="grid-cols-2 mx-auto">
                                        <div className="mb-4">
                                            <input
                                                type="number"
                                                name="qty"
                                                id=""
                                                className="border border-gray-500 p-1 w-32 rounded-sm
                                                focus:ring-0 focus:border-none focus:border-indigo-200"
                                                placeholder="Qty"
                                                value={qty}
                                                onChange={(e) =>
                                                    setQty(e.target.value)
                                                }
                                                min={1}
                                                max={
                                                    product?.qty > 1
                                                        ? product?.qty
                                                        : 1
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="">
                                        <button
                                            className="flex bg-indigo-500 text-white
                                            p-2 rounded-sm cursor-pointer"
                                            disabled={
                                                !selectedColors ||
                                                !selectedSizes ||
                                                product?.qty == 0 ||
                                                !product?.status
                                            }
                                            type="button"
                                            onClick={() => {
                                                dispatch(
                                                    addToCart({
                                                        product_id: product.id,
                                                        ref: makeUnique(10),
                                                        slug: product.slug,
                                                        name: product.name,
                                                        coupon_id: null,
                                                        price: parseInt(
                                                            product.price
                                                        ),
                                                        qty: parseInt(qty),
                                                        color: selectedColors.name,
                                                        size: selectedSizes.name,
                                                        maxQty: parseInt(
                                                            product.qty
                                                        ),
                                                        image: product.thumbnail,
                                                    })
                                                );
                                                setSelectedColors(null);
                                                setSelectedSizes(null);
                                                setQty(1);
                                            }}
                                        >
                                            <ShoppingCartIcon
                                                className="w-5 h-5"
                                                style={{
                                                    marginTop: "1px",
                                                    marginRight: "2px",
                                                    fontWeight: "bold",
                                                }}
                                            />
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {product?.reviews?.length > 0 && (
                        <div className="flex-row my-4">
                            <div className="grid grid-cols-1 ml-10 mr-10">
                                <div className="text-center bg-gray-50 py-4 border border-gray-200">
                                    <h3 className="mt-2">
                                        Reviews({product?.reviews?.length})
                                    </h3>
                                </div>
                                <div className="mt-2">
                                    <Reviews
                                        product={product}
                                        setLoading={setLoading}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
