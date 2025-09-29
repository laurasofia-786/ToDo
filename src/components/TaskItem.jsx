import React, { useState } from 'react'

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [newTitle, setNewTitle] = useState(task.title)
  const [newText, setNewText] = useState(task.text)

  function saveEdit() {
    if (!newTitle.trim() || !newText.trim()) return
    onEdit(newTitle, newText)
    setIsEditing(false)
  }

  return (
    <li className="bg-white p-4 rounded-lg shadow-sm flex items-start justify-between border border-slate-100">
      <div className="flex-1 pr-4">
        {isEditing ? (
          <div className="space-y-2">
            <input
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              className="w-full border rounded px-2 py-1 focus:ring-2 focus:ring-blue-200"
            />
            <textarea
              value={newText}
              onChange={e => setNewText(e.target.value)}
              className="w-full border rounded px-2 py-1 focus:ring-2 focus:ring-blue-200"
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={saveEdit}
                className="px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600"
              >
                Guardar
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="font-semibold text-lg">{task.title}</div>
            <div className="text-sm text-slate-500">{task.text}</div>
            <div className="text-xs text-slate-400">Autor: {task.author}</div>
          </div>
        )}
      </div>

      <div className="flex flex-col items-end gap-2">
        {!isEditing && (
          <>
            <button
              onClick={onToggle}
              className={`px-3 py-1 rounded ${
                task.completed ? 'bg-green-500 text-white' : 'bg-slate-200'
              }`}
            >
              {task.completed ? 'Completada' : 'Marcar'}
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="text-sm text-blue-600 hover:underline"
            >
              Editar
            </button>
            <button
              onClick={onDelete}
              className="text-sm text-red-600 hover:underline"
            >
              Eliminar
            </button>
          </>
        )}
      </div>
    </li>
  )
}
