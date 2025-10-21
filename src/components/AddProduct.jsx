import React, { useRef, useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const initialState = {
    image: "",
    title: "",
    category: "",
    price: "",
    description: "",
};

const AddProduct = () => {

    const inputClass = "w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none";

    const [formdata, setFormdata] = useState(initialState);
    const { image, title, price, category, description } = formdata;

    const titleRef = useRef(null);
    const navigate = useNavigate()

    useEffect(() => {
        titleRef.current.focus();
    }, []);

    const handlechange = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
    };

    const handlesubmit = async (e) => {
        e.preventDefault()
        if(!title || !price ){
            return alert("Tile & price required")
        }
        try {
            await api.post("/products",formdata)
            alert("Product added successfully!");
            navigate("/products")
            
        } catch (error) {
            console.error("Failed To Add Product",error)
        }
    }

    return (
        <form
            onSubmit={handlesubmit}
            className="max-w-lg mx-auto bg-white mt-5 p-8 rounded-2xl shadow-lg space-y-5"
        >
            <h2 className="text-2xl font-bold text-center text-blue-600">
                Add Product
            </h2>

            <input
                type="text"
                name="title"
                placeholder="Product Title"
                ref={titleRef}
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
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition duration-200"
            >
                Add Product
            </button>
        </form>
    );
};

export default AddProduct;
