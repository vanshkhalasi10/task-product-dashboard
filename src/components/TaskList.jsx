import React from 'react'

const TaskList = ({
  tasks,
  handleToggle,
  handleDelete,
  editingId,
  seteditingId,
  editText,
  seteditText,
  handleEdit
}) => {
  return (
    <div>
      <ul className="space-y-3">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`flex flex-col sm:flex-row justify-between sm:items-center 
            p-3 rounded-lg border text-sm sm:text-base bg-gray-50 `}
          >
            {editingId === task.id ? (
              <input
                value={editText}
                onChange={(e) => seteditText(e.target.value)}
                onBlur={() => {
                  handleEdit(task.id, editText)
                  seteditingId(null)
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleEdit(task.id, editText)
                    seteditingId(null)
                  }
                }}
                autoFocus
                className='border p-1 rounded flex-1 mr-2'
              />
            ) : (
              <span
                className={`mb-2 cursor-pointer sm:mb-0 ${task.completed ? "line-through text-gray-500" 
                  : "text-gray-800"}`}
                onDoubleClick={() => {
                  seteditingId(task.id)
                  seteditText(task.text)
                }}
                onClick={() => handleToggle(task.id)}
              >
                {task.text}
              </span>
            )}


            <div className="flex gap-2">
              <button
                onClick={() => handleToggle(task.id)}
                className="bg-green-500 cursor-pointer text-white px-3 py-1 rounded 
                  hover:bg-green-600 transition text-xs sm:text-sm"
              >
                {task.completed ? "Undo" : "Complete"}
              </button>
              <button
                onClick={() => handleDelete(task.id)}
                className="bg-red-500 cursor-pointer text-white px-3 py-1 rounded
                 hover:bg-red-600 transition text-xs sm:text-sm"
              >
                ❌ Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TaskList
