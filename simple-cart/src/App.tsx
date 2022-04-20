import React from 'react'
import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './features/products/productsSlice';
import { fetchUsers } from './features/users/usersSlice';

import NavBar from './views/NavBar';
import HomePage from './views/HomePage';
import SingleProduct from './features/products/SingleProduct';
import Category from './features/products/Category';
import ProductsByCategory from './features/products/ProductsByCategory';
import ProductEditForm from './features/products/ProductEditForm';
import ProductAddForm from './features/products/ProductAddForm';
import CartList from './features/cart/CartList';
import CartAddForm from './features/cart/CartAddForm';
import { RootState } from './app/store';
import LoginForm from './features/users/LoginForm';
import UserPage from './features/users/UserPage';

function App() {
  const dispatch = useDispatch()
  const productsStatus = useSelector((state: RootState) => state.products.status)
  if (productsStatus === "idle") dispatch(fetchProducts())
  const usersStatus = useSelector((state: RootState) => state.users.status)
  if (usersStatus === "idle") dispatch(fetchUsers())
  const users = useSelector((state: RootState) => state.users.users)
  console.log(users)

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:productId" element={<SingleProduct />} />
        <Route path="/category" element={<Category />} />
        <Route path="/category/:categoryName" element={<ProductsByCategory />} />
        <Route path="/edit/:productId" element={<ProductEditForm />} />
        <Route path="/add-product" element={<ProductAddForm />} />
        <Route path="/cart" element={<CartList />} />
        <Route path="/cart/add/:productId" element={<CartAddForm />} />
        <Route path="/profile" element={<UserPage />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Router>
  );
}

export default App;
