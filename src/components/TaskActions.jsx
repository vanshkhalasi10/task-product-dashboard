import React from 'react'

const TaskActions = ({tasks,handleclearcompleted}) => {

  return (
    <>
        {tasks.some((task) => task.completed) && (

        <button
          onClick={handleclearcompleted}
          className="w-full sm:w-auto bg-red-600 text-white cursor-pointer 
            px-4 py-2 rounded hover:bg-red-700 mt-4 text-sm sm:text-base"
        >
          Clear Completed
        </button>
      )}
    </>
  )
}

export default TaskActions
