import React from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function Alert({ type, content }) {
    return (
        <div className="flex flex-row mt-4 justify-center">
            <div className="grid grid-cols-1">
                <div
                    className={`w-96 ml-24 mr-24 mt-4 mb-5 p-4 border-1-4 border-blue-500 bg-red-500 text-white
                 -${type} flex justify-center`}
                >
                    <ExclamationTriangleIcon className="h-6 w-6 mr-2 text-white" />
                    <div>{content}</div>
                </div>
            </div>
        </div>
    );
}
