import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const [productOpen, setProductOpen] = useState(false)

    const handlelogout = () => {
        localStorage.removeItem("auth")
        navigate("/")
    }

    const navClass = ({ isActive }) =>
        `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive
            ? "bg-white text-blue-600 font-bold"
            : "text-white hover:bg-blue-500"
        }`

    return (
        <nav className="sticky top-0 z-50 bg-blue-600 text-white shadow-md w-full">
            {/* <div className="mx-auto px-4 sm:px-6 lg:px-8"> */}
                <div className="flex justify-between items-center h-16 px-2 sm:px-4 md:px-6 lg:px-8">
                    <div className="text-xl font-bold">MyApp</div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6 items-center relative">
                        <NavLink to="/" className={navClass}>
                            Home
                        </NavLink>
                        <NavLink to="/dashboard" className={navClass}>
                            Dashboard
                        </NavLink>
                        <NavLink to="/tasks" className={navClass}>
                            Tasks
                        </NavLink>

                        {/* Products Dropdown */}
                        <div className="relative ">
                            <button
                                onClick={() =>{ 
                                    setProductOpen(!productOpen)
                                    navigate("/products")
                                }}
                                
                                className="px-3 py-2 cursor-pointer rounded-md text-sm font-medium hover:bg-blue-500"
                            >
                                Products ▾
                            </button>
                            {productOpen && (
                                <div className="absolute  left-0 mt-2 w-40 bg-white text-blue-600 rounded-md shadow-lg py-2 z-50">
                                    <NavLink
                                        to="/products"
                                        className="block px-4 py-2 hover:bg-blue-100"
                                        onClick={() => setProductOpen(false)}
                                    >
                                        All Products
                                    </NavLink>
                                    <NavLink
                                        to="/products/add"
                                        className="block px-4 py-2 hover:bg-blue-100"
                                        onClick={() => setProductOpen(false)}
                                    >
                                        Add Product
                                    </NavLink>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={handlelogout}
                            className="bg-red-500 cursor-pointer px-4 py-2 rounded hover:bg-red-600"
                        >
                            Logout
                        </button>
                    </div>

                    {/* Mobile Hamburger Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-md hover:bg-blue-500 focus:outline-none"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d={
                                        isOpen
                                            ? "M6 18L18 6M6 6l12 12"
                                            : "M4 6h16M4 12h16M4 18h16"
                                    }
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            {/* </div> */}

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-blue-600 px-4 pb-4 space-y-2 flex flex-col items-start">
                    <NavLink to="/" className={navClass}>
                        Home
                    </NavLink>
                    <NavLink to="/dashboard" className={navClass}>
                        Dashboard
                    </NavLink>
                    <NavLink to="/tasks" className={navClass}>
                        Tasks
                    </NavLink>

                    {/* Mobile Products Submenu */}
                    <div className="flex flex-col space-y-1">
                        <button
                            onClick={() => setProductOpen(!productOpen)}
                            className="text-left w-full px-3 py-2 rounded-md hover:bg-blue-500"
                        >
                            Products ▾
                        </button>
                        {productOpen && (
                            <div className="ml-4 flex flex-col space-y-1">
                                <NavLink
                                    to="/products"
                                    className="px-3 py-2 rounded-md hover:bg-blue-500"
                                    onClick={() => setIsOpen(false)}
                                >
                                    All Products
                                </NavLink>
                                <NavLink
                                    to="/products/add"
                                    className="px-3 py-2 rounded-md hover:bg-blue-500"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Add Product
                                </NavLink>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handlelogout}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            )}
        </nav>
    )
}

export default Navbar
    