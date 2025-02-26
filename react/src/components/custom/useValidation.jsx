import React from 'react';

export default function useValidation(errors, field) {

    const renderErrors = (field) => {

        return errors?.[field]?.map((error, index) => (
            <div style={{ marginLeft: "14px" }}>
                <li>
                    <small key={index} className="text-red-500 my-2 ml-2">
                        {error}
                    </small>
                </li>
            </div>
        ));
    }

    return renderErrors(field)
}
