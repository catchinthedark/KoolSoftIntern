import { useDispatch, useSelector } from "react-redux"
import { itemAdded, itemRemoved, itemSubtracted, selectAllItems, selectTotalPrice, selectTotalQuantity } from "./cartSlice"
import { cartItem } from "./cartSlice"
import { ProductReview } from "../products/ProductsList"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { RootState } from "../../app/store"
import { selectProductById } from "../products/productsSlice"

export const ItemCard = ({item} : {item: cartItem}) => {
    const [price, setPrice] = useState(0)
    const product = useSelector((state: RootState) => selectProductById(state, item.productId))

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        setPrice(parseFloat(product!.price) * item.quantity)
    }, [item.quantity, product])

    if (!product) {
        return <div>Product not found!</div>
    }

    const onAddItemClicked = () => {
        dispatch(itemAdded({productId: product.id, price: product.price, quantity: 1}))
    }

    const onSubtractItemClicked = () => {
        if (item.quantity === 1) onRemoveItemClicked()
            else dispatch(itemSubtracted({productId: product.id, price: product.price, quantity: 1}))
    }

    const onRemoveItemClicked = () => {
        dispatch(itemRemoved({productId: product.id, price: product.price}))
        navigate('/cart')
    }

    return (
        <div className="itemCard">
            <ProductReview product={product} />
            <div className="container1">
                <h3>Quantity: {item.quantity}</h3>
                <h3>Price: {price}</h3>
            </div>
            <div className="container1">
                <button onClick={onAddItemClicked}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="darkolivegreen" className="bi bi-bag-plus-fill" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zM8.5 8a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V12a.5.5 0 0 0 1 0v-1.5H10a.5.5 0 0 0 0-1H8.5V8z"/>
                    </svg> 
                </button>
                <button onClick={onSubtractItemClicked}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="darkolivegreen" className="bi bi-bag-dash-fill" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zM6 9.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1H6z"/>
                </svg>
                </button>
                <button onClick={onRemoveItemClicked}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="darkolivegreen" className="bi bi-bag-x-fill" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zM6.854 8.146a.5.5 0 1 0-.708.708L7.293 10l-1.147 1.146a.5.5 0 0 0 .708.708L8 10.707l1.146 1.147a.5.5 0 0 0 .708-.708L8.707 10l1.147-1.146a.5.5 0 0 0-.708-.708L8 9.293 6.854 8.146z"/>
                </svg>
                </button>
            </div>
        </div>
    )
}

const CartList = () => {
    const items = useSelector(selectAllItems)
    const cartQuanity = useSelector(selectTotalQuantity)
    const totalPrice = useSelector(selectTotalPrice).toFixed(2)

    let content
    if (!items.length) content = <div>Cart Empty!</div>
        else content = items.map(item => <ItemCard item={item} />)

    return (
        <section>
            <form>
                <fieldset>
                    <legend>Cart Total</legend>
                    <h1>Total Quantity: {cartQuanity}</h1>
                    <h1>Total Price: {totalPrice}</h1>
                </fieldset>
            </form>
            <div className="products-list">
                {content}    
            </div>
            
        </section>
    )
}

export default CartList