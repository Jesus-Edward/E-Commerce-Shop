import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Bars3Icon, BellIcon, ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import { axiosRequest, getConfig } from "../../helpers/config";
import { setCurrentUser, setIsLoggedInOut, setToken } from "../../redux/slices/userSlice";
import { toast } from "react-toastify";


// import { Link } from "react-router-dom";

export default function Header() {
    const { cartItems } = useSelector((state) => state.cart);
    const { isLoggedIn, token, user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const navigation = [
        { name: "Home", to: "/" },
        { name: "Contact", to: "/contact" },
        { name: "About", to: "/about" },
        { name: "Calendar", to: "/calender" },
    ];

    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
    }

    // cartItems.pop();

    useEffect(() => {
        const getLoggedInUser = async () => {
            try {
                const response = await axiosRequest.get('user', getConfig(token));

                dispatch(setCurrentUser(response.data.user))

            } catch (error) {
                if (error?.response?.status === 401) {
                    dispatch(setCurrentUser(null));
                    dispatch(setToken(''));
                    dispatch(setIsLoggedInOut(false));
                }
                console.log(error);

            }
        };

        if(token) getLoggedInUser();

    }, [token]);

    const logoutUser = async () => {

        try {

            const response = await axiosRequest.post("user/logout/",null,getConfig(token));

            dispatch(setCurrentUser(null));
            dispatch(setToken(" "));
            dispatch(setIsLoggedInOut(false));
            toast.success(response.data.message);
            navigate('/');

        } catch (error) {

            console.log(error);

        }
    };

    return (
        <Disclosure as="nav" className="bg-gray-800">
            <div
                className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8"
                style={{ height: "80px" }}
            >
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button*/}
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon
                                aria-hidden="true"
                                className="block size-6 group-data-[open]:hidden"
                            />
                            <XMarkIcon
                                aria-hidden="true"
                                className="hidden size-6 group-data-[open]:block"
                            />
                        </DisclosureButton>
                    </div>
                    <div
                        className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start text-white"
                        style={{ marginTop: "20px" }}
                    >
                        <div className="flex shrink-0 items-center">
                            <img
                                alt="My E Shop"
                                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                                className="h-8 w-auto"
                            />
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {navigation.map((item) => (
                                    <NavLink
                                        key={item.name}
                                        to={item.to}
                                        aria-current={
                                            item.current ? "page" : undefined
                                        }
                                        className={({ isActive }) =>
                                            classNames(
                                                isActive
                                                    ? "bg-gray-900 text-white"
                                                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                                "rounded-md px-3 py-2 text-sm font-medium"
                                            )
                                        }
                                    >
                                        {item.name}
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div
                        className="absolute inset-y-0 right-0 flex items-center pr-2 sm:ml-6 sm:pr-0"
                        style={{ marginTop: "20px" }}
                    >
                        <a href="/cart" className=" mr-20">
                            {cartItems.length < 1 ? (
                                ""
                            ) : (
                                <span className="relative bottom-3 left-4 bg-white text-gray-800 px-1 rounded-full">
                                    {cartItems.length}
                                </span>
                            )}

                            <ShoppingCartIcon
                                className="size-6 mb-6 text-white absolute top-8"
                                style={{ marginTop: "-20px" }}
                            />
                        </a>

                        <button
                            type="button"
                            className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">View notifications</span>
                            <BellIcon aria-hidden="true" className="size-6" />
                        </button>

                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3">
                            <div>
                                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">
                                        Open user menu
                                    </span>
                                    <img
                                        alt=""
                                        src={user?.profile_image}
                                        className="size-8 rounded-full"
                                    />
                                </MenuButton>
                            </div>
                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                            >
                                {isLoggedIn ? (
                                    <>
                                        <MenuItem>
                                            <a
                                                href="#"
                                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                                            >
                                                {user?.name}
                                            </a>
                                        </MenuItem>
                                        <MenuItem>
                                            <a
                                                href="/profile"
                                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                                            >
                                                Your Profile
                                            </a>
                                        </MenuItem>
                                        <MenuItem>
                                            <Link
                                                to="#"
                                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                                                onClick={logoutUser}
                                            >
                                                logout
                                            </Link>
                                        </MenuItem>
                                    </>
                                ) : (
                                    <>
                                        <MenuItem>
                                            <Link
                                                to="/login"
                                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                                            >
                                                Login
                                            </Link>
                                        </MenuItem>
                                        <MenuItem>
                                            <Link
                                                to="/register"
                                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                                            >
                                                Register
                                            </Link>
                                        </MenuItem>
                                    </>
                                )}
                                <MenuItem>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                                    >
                                        Settings
                                    </a>
                                </MenuItem>
                            </MenuItems>
                        </Menu>
                    </div>
                </div>
            </div>

            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    {navigation.map((item) => (
                        <DisclosureButton
                            key={item.name}
                            as="a"
                            href={item.href}
                            aria-current={item.current ? "page" : undefined}
                            className={classNames(
                                item.current
                                    ? "bg-gray-900 text-white"
                                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                "block rounded-md px-3 py-2 text-base font-medium"
                            )}
                        >
                            {item.name}
                        </DisclosureButton>
                    ))}
                </div>
            </DisclosurePanel>
        </Disclosure>
    );
}
