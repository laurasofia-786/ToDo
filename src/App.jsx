import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Login from './components/Login'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import SearchBar from './components/SearchBar'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const STORAGE_KEY = 'team-todo-tasks-v1'

export default function App() {
  const [user, setUser] = useState(null)
  const [tasks, setTasks] = useState([])
  const [query, setQuery] = useState('')
  const [filterCompleted, setFilterCompleted] = useState('all')
  const [loading, setLoading] = useState(true)

  
  // Cargar tareas desde la API
  function fetchTasks() {
    setLoading(true)
    axios.get('http://localhost:4000/tasks')
      .then(res => setTasks(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  // Agregar tarea
  function handleAdd(task) {
    axios.post('http://localhost:4000/tasks', task)
      .then(() => {
        toast.success('Tarea agregada ✅')
        fetchTasks()
      })
      .catch(() => toast.error('Error al agregar tarea'))
  }

  // Marcar como completada
  function handleToggle(id) {
    const task = tasks.find(t => t.id === id)
    if (!task) return

    axios.patch(`http://localhost:4000/tasks/${id}`, {
      completed: !task.completed,
    })
      .then(() => fetchTasks())
      .catch(() => toast.error('Error al actualizar tarea'))
  }

  // Eliminar tarea
  function handleDelete(id) {
    axios.delete(`http://localhost:4000/tasks/${id}`)
      .then(() => {
        toast.info('Tarea eliminada 🗑️')
        fetchTasks()
      })
      .catch(() => toast.error('No se pudo borrar la tarea'))
  }

  // Editar tarea
  function handleEdit(id, newTitle, newText) {
    axios.patch(`http://localhost:4000/tasks/${id}`, {
      title: newTitle,
      text: newText,
    })
      .then(() => {
        toast.success('Tarea editada ✏️')
        fetchTasks()
      })
      .catch(() => toast.error('Error al editar tarea'))
  }

  // Filtros y búsqueda
  function filteredTasks() {
    const q = query.trim().toLowerCase()
    return tasks.filter(t => {
      if (filterCompleted === 'done' && !t.completed) return false
      if (filterCompleted === 'todo' && t.completed) return false
      if (!q) return true
      return (
        (t.author || '').toLowerCase().includes(q) ||
        (t.title || '').toLowerCase().includes(q) ||
        (t.text || '').toLowerCase().includes(q)
      )
    })
  }

  if (!user) {
    return <Login onLogin={(username) => {
      setUser(username)
      toast.success(`Bienvenido, ${username}! 🎉`)
    }} />
  }

  return (
    <>
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
        <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          {/* Header */}
          <header className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-blue-600">Team To-Do</h1>
            <div className="flex items-center gap-3">
              <div className="text-sm text-slate-600">
                Usuario: <span className="font-medium text-blue-500">{user}</span>
              </div>
              <button
                className="text-sm text-red-600 hover:text-red-700 hover:underline transition"
                onClick={() => {
                  toast.warn(`Sesión cerrada 👋`)
                  setUser(null)
                }}
              >
                Cerrar sesión
              </button>
            </div>
          </header>

          <main>
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Columna izquierda */}
              <div className="lg:col-span-1 flex flex-col gap-4">
                <TaskForm onAdd={handleAdd} defaultAuthor={user} />

                {/* Caja de filtros */}
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 shadow-sm">
                  <h3 className="text-sm font-semibold text-slate-700 mb-2">
                    Filtros
                  </h3>
                  <div className="flex gap-2 flex-wrap">
                    <button
                      className={`px-3 py-1 rounded-full text-sm transition ${
                        filterCompleted === 'all'
                          ? 'bg-blue-500 text-white'
                          : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                      }`}
                      onClick={() => setFilterCompleted('all')}
                    >
                      Todas
                    </button>
                    <button
                      className={`px-3 py-1 rounded-full text-sm transition ${
                        filterCompleted === 'todo'
                          ? 'bg-blue-500 text-white'
                          : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                      }`}
                      onClick={() => setFilterCompleted('todo')}
                    >
                      Pendientes
                    </button>
                    <button
                      className={`px-3 py-1 rounded-full text-sm transition ${
                        filterCompleted === 'done'
                          ? 'bg-blue-500 text-white'
                          : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                      }`}
                      onClick={() => setFilterCompleted('done')}
                    >
                      Completadas
                    </button>
                  </div>
                </div>
              </div>

              {/* Columna derecha */}
              <div className="lg:col-span-3">
                <SearchBar value={query} onChange={setQuery} />

                <div className="mt-4">
                  {loading ? (
                    <div className="text-center py-6 text-slate-500">
                      Cargando tareas...
                    </div>
                  ) : filteredTasks().length === 0 ? (
                    <div className="text-center py-6 text-slate-400 italic">
                      No hay tareas que coincidan.
                    </div>
                  ) : (
                    <TaskList
                      tasks={filteredTasks()}
                      onToggle={handleToggle}
                      onDelete={handleDelete}
                      onEdit={handleEdit}
                    />
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}
