import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { RootState } from "../../app/store"
import { ProductReview } from "./ProductsList"


const ProductsByCategory = () => {
    const { categoryName } = useParams()
    const category = decodeURIComponent(categoryName!)
    const products = useSelector((state: RootState) => {
        return state.products.products.filter(product => product.category === category)
    })

    if (!products) {
        return <div>No products found in this category!</div>
    }

    let content = products.map(product => <ProductReview product={product} />)

    return (
        <section className="products-list"> 
            {content}
        </section>
    )
}

export default ProductsByCategory