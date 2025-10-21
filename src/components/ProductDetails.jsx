import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../services/api'
import "../App.css"
const ProductDetails = () => {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`)
        setProduct(res.data)
      } catch (err) {
        setError("Failed to load product details")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  if (loading) return <p className="text-center mt-10 text-gray-500 animate-pulse">Loading...</p>
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>
  if (!product) return <p className="text-center mt-10 text-gray-500">Product not found</p>

  return (
    <div className="bg-gray-100 min-h-screen px-4 py-8">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl mx-auto grid md:grid-cols-2 overflow-hidden">
        
        {/* Left: Image */}
        <div className="flex items-center justify-center bg-gray-50 p-6 sm:p-8">
          {product.image && (
            <img
              src={product.image}
              alt={product.title}
              className="w-full max-w-xs sm:max-w-sm object-contain drop-shadow-lg transition-transform duration-300 hover:scale-105"
            />
          )}
        </div>

        {/* Right: Details */}
        <div className="p-6 sm:p-8 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => navigate("/products")}
              className="text-gray-500 cursor-pointer hover:text-gray-800 text-sm font-medium transition-colors"
            >
              ⬅ Back
            </button>
            <button
              onClick={() => navigate("/products")}
              className="text-gray-400 cursor-pointer hover:text-black text-2xl font-bold leading-none"
            >
              ×
            </button>
          </div>

          <div>
            <h2 className="text-gray-800 text-sm tracking-wider font-semibold uppercase mb-1">
              {product.category}
            </h2>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
              {product.title}
            </h1>

            <p className="text-gray-500 text-base leading-relaxed mb-6 line-clamp-5">
              {product.description}
            </p>

            <p className="text-3xl font-bold text-gray-900 mb-6">₹{product.price}</p>

            <button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 rounded-xl transition-all duration-200">
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
