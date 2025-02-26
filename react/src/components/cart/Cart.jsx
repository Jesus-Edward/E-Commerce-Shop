import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../layouts/Alert';
import { Link } from 'react-router-dom';
import { ArrowLongRightIcon, CheckIcon, ChevronDownIcon, ChevronUpDownIcon, ChevronUpIcon, HomeIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { decrementQ, incrementQ, removeFromCart } from '../../redux/slices/cartSlice';

export default function Cart() {

    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.cart);
    const total = cartItems.reduce((acc, item) => acc += item.price * item.qty, 0);

 return (
     <div className="flex-row my-4">
         <div className="mb-8 flex justify-center bg-orange-400 p-2 text-white">
             <h3 className='font-bold'>Cart</h3>
         </div>
         <div className="grid grid-cols-1">
             <div className="bg-white shadow-md">
                 {cartItems.length > 0 ? (
                     <>
                         <table className="table-auto min-w-full border-collapse mb-5">
                             <thead>
                                 <tr className="text-center">
                                     <th>S/N</th>
                                     <th>Image</th>
                                     <th>Name</th>
                                     <th>Qty</th>
                                     <th>Price</th>
                                     <th>Color</th>
                                     <th>Size</th>
                                     <th>Subtotal</th>
                                     <th>Remove</th>
                                 </tr>
                             </thead>
                             <tbody>
                                 {cartItems.map((item, index) => (
                                     <tr key={item.ref} className="text-center">
                                         <td>{index + 1}</td>
                                         <td className="">
                                             <div className="flex justify-center">
                                                 <img
                                                     src={item.image}
                                                     alt=""
                                                     className="w-20 h-20"
                                                 />
                                             </div>
                                         </td>
                                         <td>{item.name}</td>
                                         <td>
                                             <div className="flex flex-row justify-center">
                                                 <ChevronDownIcon
                                                     className="h-6 w-6 text-black cursor-pointer font-bold"
                                                     onClick={() =>
                                                         dispatch(
                                                             decrementQ(item)
                                                         )
                                                     }
                                                 />
                                                 <span className="mx-2">
                                                     {item.qty}
                                                 </span>
                                                 <ChevronUpIcon
                                                     className="h-6 w-6 text-black cursor-pointer font-bold"
                                                     onClick={() =>
                                                         dispatch(
                                                             incrementQ(item)
                                                         )
                                                     }
                                                 />
                                             </div>
                                         </td>
                                         <td>${item.price}</td>
                                         <td className="lg:flex lg:justify-center lg:mt-7">
                                             <div
                                                 className="ml-4 border border-gray-500"
                                                 style={{
                                                     backgroundColor:
                                                        item.color.toLowerCase(),
                                                     width: "20px",
                                                     height: "20px",
                                                 }}
                                             ></div>
                                         </td>
                                         <td>
                                             <span className="text-black me-2 font-bold bg-gray-50">
                                                 <small className="mx-2">
                                                     {item.size}
                                                 </small>
                                             </span>
                                         </td>
                                         <td>${item.qty * item.price}</td>
                                         <td>
                                             <div className="flex justify-center">
                                                 <XMarkIcon
                                                     className="h-6 w-6 cursor-pointer text-red-600 font-bold"
                                                     onClick={() =>
                                                         dispatch(
                                                             removeFromCart(
                                                                 item
                                                             )
                                                         )
                                                     }
                                                 />
                                             </div>
                                         </td>
                                     </tr>
                                 ))}
                             </tbody>
                         </table>
                         <hr className="border border-orange-500" />
                         <div className="flex justify-end mt-5 mb-5 mr-3">
                             <div className="border border-orange-500 border-spacing-3 font-bold p-2 rounded">
                                 Total: ${total}
                             </div>
                         </div>
                     </>
                 ) : (
                     <Alert
                         type="primary"
                         content="Your cart is empty, make a purchase now"
                     />
                 )}
                 <div className="my-3 flex justify-end mr-3">
                     <Link
                         to="/"
                         className="bg-orange-500 text-white p-2 rounded-md"
                     >
                         <button className="flex">
                             Go to Shop
                             <ArrowLongRightIcon className="h-6 w-6 text-white ml-2 font-bold" />
                         </button>
                     </Link>
                     {cartItems.length > 0 && (
                         <Link
                             to="/checkout"
                             className="bg-indigo-500 text-white p-2 rounded-md ml-2"
                         >
                             <button className="flex">
                                 Checkout
                                 <CheckIcon className="h-4 w-4 text-white ml-2 font-bold mt-1" />
                             </button>
                         </Link>
                     )}
                 </div>
             </div>
         </div>
     </div>
 );
}
