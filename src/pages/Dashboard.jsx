import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Dashboard = () => {

  

  return (
    <div className='p-6 text-center'>
      <h2 className='text-2xl font-bold mb-4 text-blue-600 text-center'>
        Task Dashboard ✅
      </h2>
      <p>You Are Logged in Successfully</p>
      <Link to="/tasks" >
        <button>Go To Task Management</button>
      </Link>

      
    </div>
  )
}

export default Dashboard
