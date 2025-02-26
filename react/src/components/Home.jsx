import React, { useEffect, useState } from "react";
import ProductList from "./products/ProductList";
import { axiosRequest } from "../helpers/config";
import { useDebounce } from "use-debounce";
import Alert from "./layouts/Alert";
import Spinner from "./layouts/Spinner";

export default function Home() {
    const [products, setProducts] = useState([]);
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedColors, setSelectedColors] = useState("");
    const [selectedSizes, setSelectedSizes] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [message, setMessage] = useState("");
    const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

    const handleColorSelectBox = (e) => {
        setSelectedSizes("");
        setSearchTerm("");
        setSelectedColors(e.target.value);
    };
    const handleSizeSelectBox = (e) => {
        setSelectedColors("");
        setSearchTerm("");
        setSelectedSizes(e.target.value);
    };
    const clearFilter = () => {
        setSelectedColors("");
        setSelectedSizes("");
    };

    useEffect(() => {
        const fetchAllProducts = async () => {
            setMessage("");
            setLoading(true);
            try {
                if (selectedColors) {
                    const response = await axiosRequest.get(
                        `products/${selectedColors}/color`
                    );
                    setProducts(response.data.data);
                    setColors(response.data.colors);
                    setSizes(response.data.sizes);
                    setLoading(false);
                } else if (selectedSizes) {
                    const response = await axiosRequest.get(
                        `products/${selectedSizes}/size`
                    );
                    setProducts(response.data.data);
                    setColors(response.data.colors);
                    setSizes(response.data.sizes);
                    setLoading(false);
                } else if (debouncedSearchTerm[0]) {
                    const response = await axiosRequest.get(
                        `products/${searchTerm}/search`
                    );
                    if (response.data.data.length > 0) {
                        setProducts(response.data.data);
                        setColors(response.data.colors);
                        setSizes(response.data.sizes);
                        setLoading(false);
                    } else {
                        setMessage("No Product found!");
                    }
                } else {
                    const response = await axiosRequest.get("products");
                    setProducts(response.data.data);
                    setColors(response.data.colors);
                    setSizes(response.data.sizes);
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };

        fetchAllProducts();
    }, [selectedColors, selectedSizes, debouncedSearchTerm[0]]);

    return (
        <div>
            <div className="flex my-5">
                <div className="grid md:grid-cols-3 sm:grid-cols-1">
                    <div className="md:ml-16 lg:ml-36 ml-48">
                        <div className="mb-2">
                            <span className="font-bold">Filter by Color:</span>
                        </div>
                        <select
                            name="color"
                            id="color"
                            defaultValue=""
                            onChange={(e) => handleColorSelectBox(e)}
                            disabled={selectedSizes || searchTerm}
                            className="block w-40 p-2 border border-gray-300 bg-white
                            rounded-sm shadow-sm focus:outline-none focus:right-2 focus:ring-indigo-200 focus:border-indigo-200"
                        >
                            <option
                                value=""
                                disabled={!selectedColors}
                                onChange={() => clearFilter()}
                            >
                                All Colors
                            </option>
                            {colors.map((color) => (
                                <option key={color.id} value={color.id}>
                                    {color.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="ml-48 lg:ml-32 md:ml-16">
                        <div className="mb-2">
                            <span className="font-bold">Size:</span>
                        </div>
                        <select
                            name="size"
                            id="size"
                            defaultValue=""
                            onChange={(e) => handleSizeSelectBox(e)}
                            disabled={selectedColors || searchTerm}
                            className="block w-40 p-2 border border-gray-300 bg-white
                            rounded-sm shadow-sm focus:outline-none focus:right-2 focus:ring-indigo-200 focus:border-indigo-200"
                        >
                            <option
                                value=""
                                disabled={!selectedSizes}
                                onChange={() => clearFilter()}
                            >
                                All Sizes
                            </option>
                            {sizes.map((size) => (
                                <option key={size.id} value={size.id}>
                                    {size.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="md:ml-16 lg:ml-32 ml-48">
                        <div className="mb-2">
                            <span className="font-bold">Search:</span>
                        </div>
                        <div className="lg:mr-32">
                            <form action="">
                                <input
                                    type="search"
                                    className="block w-40 border border-gray-300 p-1.5
                                    rounded-sm focus:right-2 focus:ring-indigo-200 focus:border-indigo-200 focus:outline-none"
                                    value={searchTerm}
                                    disabled={selectedColors || selectedSizes}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    placeholder="Search..."
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {message ? (
                <Alert type="primary" content={message} />
            ) : loading ? (
                <Spinner />
            ) : (
                <ProductList products={products} />
            )}
        </div>
    );
}
