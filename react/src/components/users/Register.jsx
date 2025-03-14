import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosRequest } from "../../helpers/config";
import { toast } from "react-toastify";
import Spinner from '../layouts/Spinner';
import renderErrors from '../../components/custom/useValidation';
import { useSelector } from "react-redux";

export default function Register() {

    const { isLoggedIn } = useSelector(state => state.user);

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const [validationErrors, setValidationErrors] = useState([]);

    const registerUser = async (e) => {

        e.preventDefault();

        setValidationErrors([]);

        setLoading(true);

        try {
            const response = await axiosRequest.post("register/user", user);

            setLoading(false);

            toast.success(response.data.message);

            navigate('/login');

        } catch (error) {

            if (error?.response?.status == 422) {
                setValidationErrors(error.response.data.errors);
            }

            console.log(error);

            setLoading(false);

            navigate('/register');

        }

    }

    useEffect(() => {

        if(isLoggedIn) {

            navigate('/');

        }
    }, [isLoggedIn]);

    return (
        <div className="my-4 flex-row">
            <div className="mb-8 flex justify-center bg-orange-400 p-2 text-white">
                <h3 className="font-bold">Register Page</h3>
            </div>

            <div className="grid grid-cols-1 mx-auto">
                <div className="bg-white shadow-md rounded-b-md">
                    <div className="bg-white shadow-lg mx-auto my-6 rounded-b-md w-96 md:ml-44 lg:ml-bigMarginLeft">
                        <div className="bg-orange-400 text-white">
                            <div className="text-center mt-2 p-1">
                                <h5 className="">
                                    You'll like your journey here, please
                                    register
                                </h5>
                            </div>
                        </div>
                        <div className="mt-5 mx-3">
                            <form
                                action="#"
                                method="post"
                                onSubmit={registerUser}
                            >
                                <div className="">
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        value={user.name}
                                        className="border border-orange-400 bg-white shadow-sm
                                        w-full py-1.5 px-3 focus:border-none sm:text-sm sm:leading-6"
                                        name="name"
                                        onChange={(e) =>
                                            setUser({
                                                ...user,
                                                name: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                {renderErrors(validationErrors, "name")}
                                <div className="mt-1">
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Email address
                                    </label>
                                    <input
                                        type="text"
                                        className="border border-orange-400 bg-white shadow-sm
                                        w-full py-1.5 px-3 focus:border-none sm:text-sm sm:leading-6"
                                        name="email"
                                        value={user.email}
                                        onChange={(e) =>
                                            setUser({
                                                ...user,
                                                email: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                {renderErrors(validationErrors, "email")}
                                <div className="mt-1">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="border border-orange-400 bg-white shadow-sm
                                        w-full py-1.5 px-3 focus:border-none sm:text-sm sm:leading-6"
                                        name="password"
                                        value={user.password}
                                        onChange={(e) =>
                                            setUser({
                                                ...user,
                                                password: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                {renderErrors(validationErrors, "password")}

                                {loading ? (
                                    <Spinner />
                                ) : (
                                    <div className="flex justify-between mt-5">
                                        <div className="mt-5 flex">
                                            <Link className="-mt-3" to="/login">
                                                <span className="text-orange-400">
                                                    Login
                                                </span>
                                            </Link>
                                            <div className="w-36 h-0 border-b border-orange-400 mb-3 ml-12"></div>
                                            <span className="-mt-3 ml-0 h-6 w-6 bg-orange-400 rounded-full text-white px-1 py-0">
                                                or
                                            </span>
                                        </div>
                                        <button className="mb-5 bg-orange-400 p-2 text-white rounded-sm hover:bg-orange-500 cursor-pointer">
                                            Register
                                        </button>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
