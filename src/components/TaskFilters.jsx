import React from 'react'

const TaskFilters = ({ filter, setfilter }) => {
  return (
    <div className='flex flex-wrap justify-center gap-2 sm:gap-4 mb-4'>
      {["all", "completed", "pending"].map(f => (
        <button
          key={f}
          onClick={() => setfilter(f)}
          className={`px-3 py-1 cursor-pointer sm:px-4 sm:py-2 rounded-md text-sm sm:text-base transition 
            ${filter === f
              ? "bg-blue-500 text-white font-semibold"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}

        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}

    </div>
  )
}

export default TaskFilters
