import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Task from './pages/Task'
import Protectedroute from './Protectedroute'
import Products from './pages/Products'
import AddProduct from './components/AddProduct'
import EditProduct from './pages/EditProduct'
import ProductDetails from './components/ProductDetails'


const AllRoutes = () => {
  return (
    
    <Routes>
      <Route path='/' element={<Login />}></Route>

      <Route path='/dashboard' element={
        <Protectedroute>
          <Dashboard />
        </Protectedroute>

      }></Route>
      
      <Route path='/tasks' element={
        <Protectedroute>
          <Task />
        </Protectedroute>

      }></Route>

      <Route path='/products' element={
        <Protectedroute>
          <Products />
        </Protectedroute>

      }></Route>

      <Route path='/products/add' element={
        <Protectedroute>
          <AddProduct />
        </Protectedroute>
      }>
      </Route>

      <Route path='/edit/:id' element={<EditProduct />}></Route>
      <Route path='/products/:id' element={<ProductDetails />}></Route>

      <Route path='*' element={<h1>Page not Found</h1>}></Route>

    </Routes>
  )
}

export default AllRoutes
