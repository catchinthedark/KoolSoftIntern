import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { RootState } from "../../app/store"

const CategoryReview = ({category} : {category: string}) => {
    return (
        <div className="category">
            <h2>{category}</h2>
            <Link to={`/category/${category}`} style={{ padding: '0.5rem 1rem', textDecoration: 'none', color:"white", backgroundColor: "darkolivegreen" }}>
                View Products
            </Link>
        </div>
    )
}

const Category = () => {
    const categories = useSelector((state: RootState) => {
        return state.products.products.map(product => product.category)
    }).filter((x, i, a) => a.indexOf(x) === i)
    console.log(categories)

    let content =  categories.map(category => <CategoryReview category={category} />)

    return (
        <section className="categories-list">
            <h1>CATEGORY LIST</h1>
            {content}
        </section>
    )
}

export default Category