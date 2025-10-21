import React, { useEffect, useState } from 'react'
import TaskInput from '../components/TaskInput'
import TaskFilters from '../components/TaskFilters'
import TaskActions from '../components/TaskActions'
import TaskList from '../components/TaskList'

const Task = () => {

  const [filter, setfilter] = useState("all")
  const [input, setinput] = useState("")
  const [search, setsearch] = useState("")
  const [editingId,seteditingId] = useState(null)
  const [editText,seteditText] = useState("")

  const [tasks, settask] = useState(() => {
    const savedTasks = localStorage.getItem("tasks")
    return savedTasks ? JSON.parse(savedTasks) : []
  })

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  const handleChange = (e) => {
    setinput(e.target.value)
  }

  const handleAdd = () => {
    if (input.trim() === "") return;
    const newTask = { id: Date.now(), text: input, completed: false }
    settask([newTask,...tasks])
    setinput("")
  }

  const handleToggle = (id) => {
    settask(
      tasks.map((task) => task.id === id ? { ...task, completed: !task.completed } : task)
    )
  }

  const handleEdit=(id,newText)=>{
    settask(tasks.map((task)=>task.id === id ? {...task,text:newText}:task))
  }

  const handleDelete = (id) => {
    settask(tasks.filter((tasks) => tasks.id !== id))

  }

  const filteredTasks = tasks
    .filter(task =>
      (filter === "all" || (filter === "completed" && task.completed) ||
        (filter === "pending" && !task.completed)) &&
      task.text.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => b.id - a.id);


  const handleclearcompleted = () => {
    settask(tasks.filter((task) => !task.completed))
  }

  const totalTasks = tasks.length
  const completedTasks = tasks.filter(task=>task.completed).length
  const pendingTasks = totalTasks -completedTasks

  return (
    <div className="max-w-md w-full mx-auto bg-white shadow-lg rounded-xl p-6 mt-6 sm:mt-10">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-blue-600 text-center">
        Task Management ✅
      </h2>

      <TaskInput
        input={input}
        handleChange={handleChange}
        handleAdd={handleAdd}
      />

      <input
        type="text"
        placeholder='Search Tasks...'
        value={search}
        onChange={(e) => setsearch(e.target.value)}
        className='w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
      />

      <TaskFilters
        filter={filter}
        setfilter={setfilter}
      />

      <TaskList
        tasks={filteredTasks}
        handleToggle={handleToggle}
        handleDelete={handleDelete}
        editingId={editingId}
        seteditingId={seteditingId}
        editText={editText}
        seteditText={seteditText}
        handleEdit={handleEdit}
      />

      <TaskActions
        tasks={tasks}
        handleclearcompleted={handleclearcompleted}
      />

      <div className='mt-4 text-center text-gray-700'>
        Total : {totalTasks} | Completed : {completedTasks} | Pending : {pendingTasks}
      </div>

    </div>
  )
}

export default Task 