import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    // userCarts: {},
    cartItems: [],
    validCoupon: {
        name: '',
        discount: 0
    },
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action){
            const item = action.payload
            const userId = action.payload
            // const cartItem = state.cartItems[userId] || [];
            // const existingProductIndex = userCart.findIndex(itemIndex => itemIndex.id === item.id)
            let productItem = state.cartItems.find(product => product.product_id === item.product_id
                && product.color == item.color && product.size == item.size
            )

            // if (existingProductIndex >= 0) {
            //     const updatedCart = [...userCart];
            //     updatedCart[existingProductIndex].qty += 1
            //     return {
            //         ...state, userCarts: {
            //             ...state.userCarts, [userId]: updatedCart
            //         }
            //     }
            // }else {
            //     return {
            //         ...state, userCarts: {
            //             ...state.userCarts, [userId]: [...userCart, {...item, qty: 1}]
            //         }
            //     }
            // }

            if (productItem) {
                // productItem.qty += 1
                toast('Product already added to your cart')
            }else {
                state.cartItems = [item, ...state.cartItems]
                toast.success('Product added to your cart')
            }
        },

        incrementQ(state, action) {
            const item = action.payload
            let productItem = state.cartItems.find(product => product.product_id === item.product_id
                && product.color == item.color && product.size == item.size
            )

            if (productItem.maxQty === productItem.qty) {
                toast(`Stock out, only ${productItem.maxQty} available`)
            }else {
                productItem.qty += 1
            }
        },
        decrementQ(state, action) {
            const item = action.payload
            let productItem = state.cartItems.find(product => product.product_id === item.product_id
                && product.color == item.color && product.size == item.size
            )

            productItem.qty -= 1
            if (productItem.qty === 0) {
                state.cartItems = state.cartItems.filter(product => product.ref !== item.ref)
            }
        },
        removeFromCart(state, action) {
            const item = action.payload
            state.cartItems = state.cartItems.filter(product => product.ref !== item.ref)
            toast.warning('Product removed from your cart')
        },
        setValidCoupon(state, action) {
            state.validCoupon = action.payload
        },
        addCouponIdToCartItem(state, action) {
            const coupon_id = action.payload
            state.cartItems = state.cartItems.map(item => {
                return {...item, coupon_id}
            })
        },
        clearCartItems(state, action) {
            state.cartItems = []
        }
    }
})


const cartReducer = cartSlice.reducer;
export const { addToCart, incrementQ, decrementQ, removeFromCart, setUserId, setValidCoupon, addCouponIdToCartItem, clearCartItems }
 = cartSlice.actions;

export default cartReducer;
