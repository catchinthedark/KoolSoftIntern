import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

export interface cartItem {
    productId: number,
    quantity: number
}

const initialState = {
    items: new Array<cartItem>(),
    totalQuantity: 0,
    totalPrice: 0
}

export const selectAllItems = (state: RootState) => state.cart.items
export const selectTotalQuantity = (state: RootState) => state.cart.totalQuantity
export const selectTotalPrice = (state: RootState) => state.cart.totalPrice

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        itemAdded(state, action) {
            const { productId, price, quantity } = action.payload
            const foundItem = state.items.find(item => item.productId === productId)
            if (foundItem) {
                foundItem.quantity += quantity
            } else {
                state.items.push(action.payload)
            }
            state.totalQuantity += quantity
            state.totalPrice += parseFloat(price) * quantity
        },
        itemSubtracted(state, action) {
            const { productId, price, quantity } = action.payload
            const foundItem = state.items.find(item => item.productId === productId)
            if (foundItem) {
                foundItem.quantity -= quantity
                state.totalQuantity -= quantity
                state.totalPrice -= parseFloat(price) * quantity
            }      
        },
        itemRemoved(state, action) {
            const { productId, price } = action.payload
            const foundItem = state.items.find(item => item.productId === productId)
            if (foundItem) {
                const totalQuantity = state.totalQuantity - foundItem.quantity
                const totalPrice = state.totalPrice - parseFloat(price) * foundItem.quantity 
                return {
                    ...state,
                    items: state.items.filter(item => item.productId !== productId),
                    totalQuantity,
                    totalPrice
                }
            }
        },
        itemUpdated(state, action) {
            const { productId, price } = action.payload
            const foundItem = state.items.find(item => item.productId === productId)
            if (foundItem) {
                const totalPrice = state.totalPrice - price * foundItem.quantity 
                return {
                    ...state,
                    totalPrice
                }
            }
        }
    }
})

export const { itemAdded, itemSubtracted, itemRemoved, itemUpdated } = cartSlice.actions 
export default cartSlice.reducer