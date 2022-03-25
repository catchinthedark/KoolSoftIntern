import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { productAdded } from "./productsSlice"


const ProductAddForm = () => {
    const id = Date.now() + Math.random()
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onAddClicked = () => {
        dispatch(productAdded({id, title, price, category, description, image}))
        navigate(`/product/${id}`)
    }

    return (
        <form>
            <fieldset className="add-form">
                <legend>Add Product</legend>
                <div>
                    <label form="image">Product's Image</label>
                    <input
                        id="image" 
                        value={image}
                        type="url"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.value)}
                    /> 
                </div>
                <div>
                    <label form="title">Title</label>
                    <input 
                        id="title"
                        value={title}
                        type="text"
                        placeholder="product A"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label form="price">Price</label>
                    <input
                        id="price"
                        value={price}
                        type="text"
                        placeholder="10"
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div>
                    <label form="category">Category</label>
                    <select 
                        id="category" 
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="men's clothing">men's clothing</option>
                        <option value="jewelery">jewelery</option>
                        <option value="electronics">electronics</option>
                        <option value="women's clothing">women's clothing</option>
                    </select>
                </div>
                <div>
                    <label form="description">Description</label>
                    <textarea 
                        id="description"
                        rows={3}
                        cols={60}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button onClick={onAddClicked}>
                    Add 
                </button>
            </fieldset>
        </form>
    )
}

export default ProductAddForm