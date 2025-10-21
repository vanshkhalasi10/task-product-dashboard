import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../services/api'

const initialstate = {
    title: '',
    image: '',
    category: '',
    price: '',
    description: '',
}

const EditProduct = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const [formdata, setformData] = useState(initialstate)
    const { image, title, price, category, description } = formdata;

     const inputClass = "w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none";

    useEffect(() => {
        const fetchProduct = async () => {
            const res = await api.get(`/products/${id}`)
            setformData(res.data)
        }
        fetchProduct()
    }, [id])

    const handlechange = (e) => {
        setformData({ ...formdata, [e.target.name]: e.target.value })
    }

    const handlesubmit = async (e) => {
        e.preventDefault()
        try {
            await api.put(`/products/${id}`,formdata)
            alert ("Product updated successfully!")
            navigate("/products")
        } catch (err) {
             console.error("Failed to update product", err)
        }
    }

    return (
        <>
        <button 
            onClick={() => navigate("/products")}
            className='cursor-pointer'
        >
            ⬅ Back to Products
        </button>

        <form
            onSubmit={handlesubmit}
            className="max-w-lg mx-auto bg-white mt-5 p-8 rounded-2xl shadow-lg space-y-5"
        >
            <h2 className="text-2xl font-bold text-center text-blue-600">
                Edit Product
            </h2>

            <input
                type="text"
                name="title"
                placeholder="Product Title"
                value={title}
                onChange={handlechange}
                className={inputClass}
            />

            <input
                type="number"
                name="price"
                placeholder="Price"
                value={price}
                onChange={handlechange}
                className={inputClass}
            />

            <select
                name="category"
                value={category}
                onChange={handlechange}
                className={inputClass}
            >
                <option value="">Select Category</option>
                <option value="mens clothing">Men's Clothing</option>
                <option value="womens clothing">Women's Clothing</option>
                <option value="electronics">Electronics</option>
                <option value="jewelery">Jewelery</option>
            </select>

            <textarea
                placeholder="Description"
                name="description"
                value={description}
                onChange={handlechange}
                className={inputClass}
            />

            <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={image}
                onChange={handlechange}
                className={inputClass}
            />

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold
                     shadow-md hover:bg-blue-700 transition duration-200"
            >
                Update Product
            </button>
        </form>
        </>
    )
}

export default EditProduct
