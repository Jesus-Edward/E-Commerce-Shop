import {
    BuildingLibraryIcon,
    CameraIcon,
    DocumentTextIcon,
    EnvelopeIcon,
    ShoppingBagIcon,
    UserIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { axiosRequest, getConfig } from "../../../helpers/config";
import { setCurrentUser } from "../../../redux/slices/userSlice";
import { toast } from "react-toastify";
import useValidation from "../../custom/useValidation";

export default function ProfileSidebar() {
    const { user, token } = useSelector((state) => state.user);
    const [validationErrors, setValidationErrors] = useState([]);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);

    const [image, setImage] = useState("");

    const handleImageUpload = async () => {
        setValidationErrors([]);
        setLoading(true);

        const formData = new FormData();
        formData.append("profile_image", image);
        formData.append("_method", "PUT");

        try {
            const response = axiosRequest.post(
                "update/profile/user",
                formData,
                getConfig(token, "multipart/form-data")
            );
            dispatch(setCurrentUser((await response).data.user));
            setImage(" ");
            setLoading(false);
            toast.success((await response).data.message);
        } catch (error) {
            if (error?.response?.status == 422) {
                setValidationErrors(error.response.data.errors);
            }
            console.log(error);
            setLoading(false);
            // navigate("/login");
        }
    };

    function handleImageSave(e) {
        setImage(e.target.files[0]);
    }

    function handleImageChange(e) {
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    return (
        <div className="grid-cols-4 md:w-80 lg:w-80 sm:w-full">
            <div className="bg-white p-2">
                <div className="flex flex-col justify-center items-center relative">
                    <img
                        src={file ? file : user?.profile_image}
                        alt={user?.name}
                        className="w-20 h-20 rounded-full"
                    />
                </div>
                <div className="relative left-44 bottom-7">
                    <label htmlFor="cameraInput">
                        <CameraIcon className="w-5 h-5 cursor-pointer" />
                    </label>
                </div>
                <input
                    type="file"
                    name=""
                    id="cameraInput"
                    hidden
                    onChange={(e) => {
                        handleImageSave(e), handleImageChange(e);
                    }}
                />
                {useValidation(validationErrors, "profile_image")}
                {loading ? (
                    <span className="text-indigo-700 font-bold mx-1 mt-1">
                        Uploading...
                    </span>
                ) : (
                    <button
                        disabled={!image}
                        onClick={(e) => handleImageUpload()}
                        className="bg-indigo-500 text-white -mb-2 p-1 rounded-sm flex"
                        style={{ marginLeft: "252px" }}
                    >
                        Upload
                    </button>
                )}
            </div>
            <ul className="-space-y-3 w-full text-gray-600">
                <li className="bg-white border border-gray-200 py-2 my-2 hover:bg-gray-50 flex">
                    <UserIcon className="h-5 w-5 text-gray-500 ml-2" />
                    <span className="ml-2">{user?.name}</span>
                </li>
                <li
                    className="bg-white border border-gray-200 py-2 my-2 hover:bg-gray-50 flex"
                    style={{ marginBottom: "10px" }}
                >
                    <EnvelopeIcon className="w-5 h-5 ml-2" />
                    <span className="ml-2"> {user?.email}</span>
                </li>
                <li
                    className="bg-white border border-gray-200 py-2 my-2 hover:bg-gray-50"
                    style={{ marginBottom: "8px" }}
                >
                    <Link to="/user/orders" className="flex">
                        <ShoppingBagIcon className="w-5 h-5 ml-2" />
                        <span className="ml-2">Orders</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
}
