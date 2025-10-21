import React from 'react'

const TaskInput = ({ input, handleChange, handleAdd }) => {


    return (
        <div className='flex flex-col sm:flex-row mb-4 gap-2 sm:gap-0'>
            <input
                type="text"
                placeholder='Enter Task Name'
                value={input}
                onChange={handleChange}
                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                className='flex-1 border border-gray-300 px-3 py-2 sm:py-3 rounded-lg 
                            sm:rounded-l-lg sm:rounded-r-none focus:outline-none 
                            focus:ring-2 focus:ring-blue-400 text-sm sm:text-base'
            />

            <button
                onClick={handleAdd}
                className='bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-lg 
                    sm:rounded-r-lg sm:rounded-l-none hover:bg-blue-600 
                    transition text-sm sm:text-base'
            >
                Add
            </button>
        </div>
    )
}

export default TaskInput
