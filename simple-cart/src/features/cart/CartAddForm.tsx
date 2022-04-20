import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { RootState } from "../../app/store"
import { selectProductById } from "../products/productsSlice"
import { itemAdded } from "./cartSlice"


const CartAddForm = () => {
    const { productId } = useParams()
    const product = useSelector((state: RootState) => selectProductById(state, parseFloat(productId!)))

    const [quantity, setQuantity] = useState(0)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    if (!product) return <div>Product not found!</div>

    const onAddToCartClicked = () => {
        dispatch(itemAdded({productId: product.id, price: product.price, quantity}))
        navigate('/cart')
    }

    return (
        <form>
            <fieldset className="form">
                <legend>Add To Cart: {product.title}</legend>
                <img src={product.image} alt="product" width="180"></img>
                <div className="formElement">
                    <div className="quantity">
                        <label form="quantity">Quantity</label>
                        <input id="quantity" 
                            type="number" 
                            min={0}
                            value={quantity} 
                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                        />
                    </div>
                    <button onClick={onAddToCartClicked}>
                        Add
                    </button>
                </div>
            </fieldset>
        </form>
    )
}

export default CartAddForm