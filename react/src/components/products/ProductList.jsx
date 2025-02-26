import React, { useState } from 'react';
import ProductListItem from './ProductListItem';
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

export default function ProductList({products}) {

    const [productsToShow, setProductsToShow] = useState(6);

    const loadMoreProducts = () => {
        if (productsToShow > products?.length) {
            return;
        } else {
            setProductsToShow(prevProductsToShow => prevProductsToShow += 6);
        }
    }

 return (
        <div className="flex justify-between">
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mx-auto mb-5 mt-5">
                {products?.slice(0, productsToShow).map((product) => (
                    <ProductListItem key={product.id} product={product} />
                ))}

                {productsToShow < products?.length && (
                    <div className="flex justify-start my-3">
                        <button
                            className="flex py-2 px-3 bg-indigo-400 text-white rounded-md
                                hover:bg-indigo-600"
                        onClick={(e) => loadMoreProducts()}
                        >
                            <ArrowDownTrayIcon className="h-6 w-6 text-white mr-1 -mt-1" />
                            Load More
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
