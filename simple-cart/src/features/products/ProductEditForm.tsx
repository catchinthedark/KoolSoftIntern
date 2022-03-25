import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { RootState } from "../../app/store"
import { itemUpdated } from "../cart/cartSlice"
import { productUpdated, selectProductById } from "./productsSlice"

const ProductEditForm = () => {
    const { productId } = useParams()
    const product = useSelector((state: RootState) => selectProductById(state, parseFloat(productId!)))

    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    if (!product) {
        return <div>Product not found!</div>
    }

    const onSubmitEditClicked = () => {
        const changePrice = (parseFloat(product.price) - parseFloat(price)).toFixed(2)
        dispatch(productUpdated({id: product.id, price, description}))
        dispatch(itemUpdated({productId: product.id, price: changePrice}))
        navigate(`/product/${product.id}`)
    }

    return (
        <form>
            <fieldset className="form">
                <legend>{product.title}</legend>
                <img src={product.image} alt="product" width="180"></img>
                <div className="formElement">
                    <div className="price">
                        <label form="price">Price</label>
                        <input id="price" type="text" 
                            value={price} 
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div className="description">
                        <label form="description">Description</label>
                        <input id="description" type="text" 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <button onClick={onSubmitEditClicked}>
                        Submit Edit
                    </button>
                </div>
            </fieldset>
        </form>
    )
}

export default ProductEditForm