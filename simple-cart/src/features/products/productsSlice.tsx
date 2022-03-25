import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

export interface Product {
    "id": number,
    "title": string,
    "price": string,
    "category": string,
    "description": string,
    "image": string
}

const initialState = {
    products: new Array<Product>(),
    status: 'idle',
    error: null
}

export const selectAllProducts = (state: RootState) => state.products.products

export const selectProductById = (state: RootState, productId: number) => {
    return state.products.products.find(product => product.id === productId)
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        productAdded(state, action){
            state.products.push(action.payload)
        },
        productUpdated(state, action){
            const { id, price, description} = action.payload
            const foundProduct = state.products.find(product => product.id === id)
            if (foundProduct) {
                foundProduct.price = price;
                foundProduct.description = description
            } 
        },
        productRemoved(state, action){
            const { id } = action.payload
            return {
                ...state,
                products: state.products.filter(product => product.id !== id)
            }
        }
    },
    extraReducers(builder: any) {
        builder
        .addCase(fetchProducts.pending, (state: RootState, action: any) => {
            return {
                state,
                status: "pending"
            }
        })
        .addCase(fetchProducts.fulfilled, (state: RootState, action: any) => {
            return {
                state,
                status: "fulfilled",
                products: action.payload
            }
        })
        .addCase(fetchProducts.rejected, (state: RootState, action: any) => {
            return {
                state,
                status: "rejected",
                error: action.error.message
            }
        })
    }
})

export const fetchProducts = createAsyncThunk('fetch-products', async () => {
    const response = await fetch("https://fakestoreapi.com/products")
    const data = await response.json()
    return data
})


export const { productAdded, productUpdated, productRemoved } = productsSlice.actions
export default productsSlice.reducer
