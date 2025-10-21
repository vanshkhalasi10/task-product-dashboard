import React, { useEffect } from 'react'
import './App.css'
import AllRoutes from './AllRoutes'
import Navbar from './pages/Navbar'


function App() {

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Navbar />
      <AllRoutes />
    </div>

  )
}

export default App
