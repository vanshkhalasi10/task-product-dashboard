import React, { useContext, useState } from 'react'
import Loader from '../components/Loader'
import ProductItem from '../components/ProductItem'
import { Link } from 'react-router-dom'
import { ProductConext } from '../Context/ProductContext'
import { useDebounce } from '../useDebounce'

const Products = () => {
  const { products, loading, error, handleDelete } = useContext(ProductConext)

  const [searchTerm, setSearchTerm] = useState("")
  const [priceRange, setPriceRange] = useState({ min: "", max: "" })
  const [sortOrder, setSortOrder] = useState("high-to-low")

  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  const filteredProducts = products
    .filter((p) =>
      p.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase().trim())
    )
    .filter((p) => {
      const min = priceRange.min ? parseFloat(priceRange.min) : 0
      const max = priceRange.max ? parseFloat(priceRange.max) : Infinity
      return p.price >= min && p.price <= max
    })
    .sort((a, b) =>
      sortOrder === "high-to-low" ? b.price - a.price : a.price - b.price
    )

  return (
    <div className="w-full p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 md:gap-0">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Products</h1>
        <Link
          to="/products/add"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          + Add Product
        </Link>
      </div>

      {/* Loader & Error */}
      {loading && <Loader />}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* No products */}
      {!loading && filteredProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-6 text-lg">No products available</p>
      )}

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
        />

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
        >
          <option value="high-to-low">Price: High to Low</option>
          <option value="low-to-high">Price: Low to High</option>
        </select>
      </div>

      {/* Price Range */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="number"
          placeholder="Min Price"
          value={priceRange.min}
          onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
          className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={priceRange.max}
          onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
          className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
        />
      </div>

      {/* Products Grid */}
      {!loading && filteredProducts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((p) => (
            <ProductItem key={p.id} product={p} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Products
