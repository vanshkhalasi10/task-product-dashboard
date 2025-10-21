import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [form,setform] =useState({
    username:"",
    password:""
  })

  const navigate= useNavigate()

  const handlechange = (e) => {
    setform({...form,[e.target.name]:e.target.value})
  }

  const handlesubmit=(e)=>{
    e.preventDefault()

    if(form.username ==="admin" && form.password ==="1234"){
      localStorage.setItem("auth","true")
      navigate("/dashboard")
    }else{
      alert("Invalid Credentials")
    }
  }

  return (
    <div className='flex justify-center items-center h-screen bg-gray-100'>
      <form onSubmit={handlesubmit}>
        <h1 className='text-2xl font-bold text-center mb-4'>Login</h1>
        <input
          type="text"
          name='username'
          value={form.username}
          onChange={handlechange}
          placeholder='Username'
          className='w-full border rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:-ring-blue-500'

        />

        <input
          type="text"
          name='password'
          value={form.password}
          onChange={handlechange}
          placeholder='Password'
          className='w-full border rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500'

        />

        <button
          type='submit'
          className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700'
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
