import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { RootState } from "../../app/store"
import { Spinner } from "../spinner"

import { selectAllProducts, Product } from "./productsSlice"

export const ProductReview = ({ product } : { product: Product }) => {
    return (
    <div className="card">
        <img src={product.image} alt="product" width="180"></img>
        <div className="container">
            <h2>{product.title}</h2>
            <h3>Price: {product.price}</h3>
            <Link to={`/product/${product.id}`} style={{ padding: '0.5rem 1rem', textDecoration: 'none', color:"white", backgroundColor: "darkolivegreen" }}>
                View Product
            </Link> 
        </div>
    </div>
    )
}

const ProductsList = () => {
    const products = useSelector(selectAllProducts)
    const status = useSelector((state: RootState) => state.products.status)
    const error = useSelector((state: RootState) => state.products.error)

    let content

    if (status === "pending") {
        content = <Spinner text="Pending..." />
    } else if (status === "fulfilled") {
        content = products.map(product => <ProductReview product={product}/>)
    } else if (status === "rejected") {
        content = <div>{error}</div>
    }

    return (
        <section className="products-list">
            {content}
        </section>
    )
}

export default ProductsList