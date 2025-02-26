import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosRequest, getConfig } from "../../helpers/config";
import { toast } from "react-toastify";
import Spinner from "../layouts/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../redux/slices/userSlice";

export default function UpdateUserInfo({ profile }) {
    const { user, token } = useSelector((state) => state.user);

    const [userInfo, setUserInfo] = useState({
        address: user?.address,
        country: user?.country,
        city: user?.city,
        phone: user?.phone_number,
        zip_code: user?.zip_code,
    });

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const UpdateUserInfo = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const response = await axiosRequest.put(
                "update/profile/user",
                userInfo,
                getConfig(token)
            );
            console.log(response);

            dispatch(setCurrentUser(response.data.user));

            setLoading(false);

            toast.success(response.data.message);

            navigate("/profile");
        } catch (error) {
            console.log(error);

            setLoading(false);

            navigate("/profile");
        }
    };

    return (
        <div className="grid grid-cols-1 mb-2">
            <div className="bg-white shadow-lg mx-auto rounded-b-md w-96 lg:w-full md:ml-4 lg:ml-5 lg:mr-lgMargin">
                <div className="bg-orange-400 text-white">
                    <div className="text-center mt-2 p-1">
                        <h5 className="">
                            Update your{" "}
                            {profile ? "Profile Details" : "Billing Details"}
                        </h5>
                    </div>
                </div>
                <div className="mb-5 mx-3">
                    <form action="#" method="put" onSubmit={UpdateUserInfo}>
                        <div className="">
                            <label
                                htmlFor="country"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Country
                            </label>
                            <input
                                type="text"
                                required
                                value={userInfo.country}
                                className="border border-orange-400 bg-white shadow-sm
                                        w-full py-1.5 px-3 focus:border-none sm:text-sm sm:leading-6"
                                name="country"
                                id="country"
                                onChange={(e) =>
                                    setUserInfo({
                                        ...userInfo,
                                        country: e.target.value || "",
                                    })
                                }
                            />
                        </div>
                        {/* {renderErrors(validationErrors, "name")} */}
                        <div className="mt-1">
                            <label
                                htmlFor="city"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                City
                            </label>
                            <input
                                type="text"
                                required
                                className="border border-orange-400 bg-white shadow-sm
                                        w-full py-1.5 px-3 focus:border-none sm:text-sm sm:leading-6"
                                name="city"
                                id="city"
                                value={userInfo.city}
                                onChange={(e) =>
                                    setUserInfo({
                                        ...userInfo,
                                        city: e.target.value || "",
                                    })
                                }
                            />
                        </div>
                        {/* {renderErrors(validationErrors, "email")} */}
                        <div className="mt-1">
                            <label
                                htmlFor="address"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Address
                            </label>
                            <input
                                type="text"
                                required
                                className="border border-orange-400 bg-white shadow-sm
                                        w-full py-1.5 px-3 focus:border-none sm:text-sm sm:leading-6"
                                name="address"
                                id="address"
                                value={userInfo.address}
                                onChange={(e) =>
                                    setUserInfo({
                                        ...userInfo,
                                        address: e.target.value || "",
                                    })
                                }
                            />
                        </div>
                        <div className="mt-1">
                            <label
                                htmlFor="phone"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Phone Number
                            </label>
                            <input
                                type="text"
                                required
                                className="border border-orange-400 bg-white shadow-sm
                                        w-full py-1.5 px-3 focus:border-none sm:text-sm sm:leading-6"
                                name="phone"
                                id="phone"
                                value={userInfo.phone}
                                onChange={(e) =>
                                    setUserInfo({
                                        ...userInfo,
                                        phone: e.target.value || "",
                                    })
                                }
                            />
                        </div>
                        <div className="mt-1">
                            <label
                                htmlFor="zip_code"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Zip Code
                            </label>
                            <input
                                type="text"
                                required
                                className="border border-orange-400 bg-white shadow-sm
                                        w-full py-1.5 px-3 focus:border-none sm:text-sm sm:leading-6"
                                name="zip_code"
                                id="zip_code"
                                value={userInfo.zip_code}
                                onChange={(e) =>
                                    setUserInfo({
                                        ...userInfo,
                                        zip_code: e.target.value || "",
                                    })
                                }
                            />
                        </div>
                        {/* {renderErrors(validationErrors, "password")} */}

                        {loading ? (
                            <Spinner />
                        ) : (
                            //    !user?.profile_completed || profile ?
                            <div className="flex justify-between mt-5">
                                <div className="mt-5 flex">
                                    <Link className="-mt-3" to="/">
                                        <span className="text-orange-400">
                                            home
                                        </span>
                                    </Link>
                                    <div className="w-36 h-0 border-b border-orange-400 mb-3 ml-12"></div>
                                    <span className="-mt-3 ml-0 h-6 w-6 bg-orange-400 rounded-full text-white px-1 py-0">
                                        or
                                    </span>
                                </div>
                                <button className="mb-5 bg-orange-400 p-2 text-white rounded-sm hover:bg-orange-500 cursor-pointer">
                                    Update Info
                                </button>
                            </div>
                            // : ''
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
