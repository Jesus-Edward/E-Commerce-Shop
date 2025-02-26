import { EllipsisVerticalIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Rating } from 'react-simple-star-rating';
import { axiosRequest, getConfig } from '../../helpers/config';
import { toast } from 'react-toastify';
import { ReviewContext } from './context/ReviewContext';

export default function ReviewListItem({review}) {

    const { user, token } = useSelector(state => state.user)
    const [ open, setOpen ] = useState(false);
    const { product, setLoading, handleRating, clearReview, editReview, updating, setUpdating } = useContext(ReviewContext)

    const renderReviewAction = () =>
        review?.user_id === user?.id && (
            <div class="relative inline-block text-left">
                <button
                    onClick={(e) => setOpen(!open)}
                    class="inline-flex justify-center relative md:left-20 lg:left-[37rem] w-full px-4
                    py-2 text-sm font-medium text-gray-700"
                >
                    <EllipsisVerticalIcon class="h-6 w-6 text-gray-500" />
                </button>
                {open && (
                    <div
                        class="absolute lg:left-[26rem] md:-right-10 specialSmall mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1
                      ring-black ring-opacity-5 focus:outline-none group-hover:block"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div class="py-1">
                            <div
                                className="flex  cursor-pointer"
                                onClick={(e) => editReview(review)}
                            >
                                <button class="text-gray-700 block px-4 py-2 text-sm">
                                    <PencilIcon class="h-4 w-4 text-gray-500" />{" "}
                                </button>
                                <span className="mt-1 -ml-2">Update</span>
                            </div>
                            <div
                                className="flex cursor-pointer"
                                onClick={(e) => deleteReview(review)}
                            >
                                <button class="text-gray-700 block px-4 py-2 text-sm">
                                    <TrashIcon class="h-4 w-4 text-gray-500" />
                                </button>
                                <span className="mt-1 -ml-2">Delete</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );

    const deleteReview = async (review) => {

        if(confirm('Are you sure about your deletion?')) {
            setLoading(true)
            try {
                const response = await axiosRequest.post('review/delete', review, getConfig(token));
                if (response.data.error) {
                    setLoading(false)
                    toast.error(response.data.error);
                    clearReview();

                }else {
                    product.reviews = product?.reviews?.filter(item => item.id !== review.id);
                    toast.success(response.data.message);
                    setLoading(false)
                }

            } catch (error) {
                console.log(error);

            }
        }
    }

    return (
        <li
            className="flex justify-start items-center bg-white border border-gray-200
            mb-2 mr-2 pr-2 my-2 hover:bg-gray-50 rounded-sm shadow-sm"
        >
            <div className="me-2 p-5">
                <img
                    src={review?.user?.image_path}
                    alt={review?.user?.name}
                    className="rounded-full w-14 h-14"
                />
            </div>
            <div className="flex flex-col my-2">
                <h6>{review?.title}</h6>
                <p>{review?.body}</p>
                <Rating
                    initialValue={review.rating}
                    readonly
                    size={20}
                    SVGstyle={{ display: "inline" }}
                />
                <span className="text-gray-500 opacity-70 italic">
                    {review?.created_at} by{" "}
                    <span className="font-bold">{review?.user?.name}</span>
                </span>
            </div>
            {renderReviewAction()}
        </li>
    );
}
