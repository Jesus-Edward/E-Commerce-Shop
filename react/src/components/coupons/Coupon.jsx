import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { axiosRequest, getConfig } from '../../helpers/config';
import { toast } from 'react-toastify';
import { addCouponIdToCartItem, setValidCoupon } from '../../redux/slices/cartSlice';
import { Navigate } from 'react-router-dom';

export default function Coupon() {

    const [coupon, setCoupon] = useState({name: ''});

    const { token } = useSelector(state => state.user);

    const dispatch = useDispatch();

    const applyCoupon = async () => {

        try {

            const response = await axiosRequest.post('apply/coupon',coupon,getConfig(token));

            if (response.data.error) {

                toast.error(response.data.error);

                setCoupon({name: ''});

            }else {

                dispatch(setValidCoupon(response.data.coupon));
                dispatch(addCouponIdToCartItem(response.data.coupon.id));
                setCoupon({ name: " " });
                toast.success(response.data.message);

            }

        } catch (error) {

            console.log(error.response.data.error);

        }
    }

    return (
        <div className="flex-row mb-3">
            <div className="grid grid-cols-1">
                <div className="flex">
                    <div className="relative">
                        <input
                            type="text"
                            value={coupon.name}
                            className="border border-gray-700 rounded-sm py-2 px-3
                                focus:outline-none focus:ring-0 sm:w-smallWidth md:w-bigWidth lg:w-bigWidth"
                            placeholder="Enter your promo code"
                            onChange={(e) =>
                                setCoupon({
                                    ...coupon,
                                    name: e.target.value,
                                })
                            }
                        />

                        <button
                            className="bg-orange-400 text-white py-2.5 px-2
                                    mt-1 ring-2 ring-orange-400 absolute right-0 bottom-0"
                            disabled={!coupon.name}
                            onClick={() => applyCoupon()}
                        >
                            Apply
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
