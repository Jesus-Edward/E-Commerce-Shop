import React from 'react';
import {RotatingLines} from 'react-loader-spinner';

export default function Spinner() {
 return (
     <div className="flex justify-center my-5">
         <RotatingLines
             visible={true}
             height="60"
             width="60"
             color="black"
             strokeWidth="5"
             animationDuration="0.75"
             ariaLabel="rotating-lines-loading"
             wrapperStyle={{}}
             wrapperClass=""
         />
     </div>
 );
}
