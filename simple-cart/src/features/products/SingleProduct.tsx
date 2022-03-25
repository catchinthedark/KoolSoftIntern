import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { RootState } from "../../app/store"
import { itemRemoved } from "../cart/cartSlice"
import { selectProductById, productRemoved } from "./productsSlice"

const SingleProduct = () => {
    const { productId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const product = useSelector((state: RootState) => selectProductById(state, parseFloat(productId!)))

    if (!product) {
        return <div>Product Not Found!</div>
    }

    const onRemoveProductClicked = () => {
        dispatch(productRemoved( {id: product.id} ))
        dispatch(itemRemoved({product}))
        navigate('/')
    }

    return (
    <div className="single-product">
        <img src={product.image} alt="product" width="300"></img>
        <div className="container">
            <h2>{product.title}</h2>
            <h3>Category: {product.category}</h3>
            <h3>Price: {product.price}</h3>
            <p>{product.description}</p>
            <Link to={`/edit/${product.id}`} style={{ padding: '0.5rem 1rem', textDecoration: 'none', color:"white", backgroundColor: "darkolivegreen" }}>
                Edit Product
            </Link>
            <button 
                style={{ padding: '0.5rem 1rem', textDecoration: 'none', color:"white", backgroundColor: "darkolivegreen" }}
                onClick={onRemoveProductClicked}
            >
                Remove Product
            </button>
            <Link to={`/cart/add/${product.id}`} style={{ padding: '0.5rem 1rem', textDecoration: 'none', color:"white", backgroundColor: "darkolivegreen" }}>
                Add To Cart
            </Link>
        </div>
    </div>
    )
}

export default SingleProduct