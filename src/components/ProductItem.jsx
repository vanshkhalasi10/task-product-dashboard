import React from 'react'
import { useNavigate } from 'react-router-dom'

const ProductItem = React.memo(({ product, onDelete }) => {
  const navigate = useNavigate()

  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-sm flex flex-col gap-2 cursor-pointer hover:shadow-md transition"> 

      {product.image && (
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-contain bg-gray-100 cursor-pointer rounded-t-xl"
          onClick={() => navigate(`/products/${product.id}`)}
        />
      )}


      <div className="flex flex-col justify-between p-4  flex-1">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-600 cursor-pointer"
            onClick={() => navigate(`/products/${product.id}`)}>
            {product.title}
          </h2>
          <p className="text-gray-700 mt-1 text-sm">
            <span className="font-semibold">Price:</span> ₹{product.price}
          </p>
          <p className="text-gray-700 mt-1 text-sm">
            <span className="font-semibold">Category:</span> {product.category}
          </p>
          <p className="text-gray-600 mt-2 text-sm line-clamp-3">{product.description}</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => navigate(`/edit/${product.id}`)}
            className="flex-1 bg-yellow-400 text-white py-2 rounded-lg hover:bg-yellow-500 transition duration-200"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
})

export default ProductItem
