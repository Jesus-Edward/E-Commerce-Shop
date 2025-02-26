import React from 'react';
import { Link } from 'react-router-dom';

export default function PageNotFound() {
    return (
        <div className="flex-row my-5">
            <div className="grid grid-cols-1 mx-auto">
                <div className="bg-white shadow-md mx-5 flex flex-col justify-center">
                    <h3 className="text-center my-2">404 Page Not Found</h3>
                    <Link
                        to="/"
                        className="text-center underline my-4 text-blue-500"
                    >
                        Back Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
