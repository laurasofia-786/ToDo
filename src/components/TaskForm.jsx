import React, { useState } from 'react'

export default function TaskForm({ onAdd, defaultAuthor = '' }) {
  const [author, setAuthor] = useState(defaultAuthor)
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')

  function submit(e) {
    e.preventDefault()
    if (!author.trim() || !title.trim() || !text.trim()) return
    onAdd({ author: author.trim(), title: title.trim(), text: text.trim(), completed: false })
    setTitle('')
    setText('')
  }

  return (
    <form onSubmit={submit} className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
      <h3 className="font-semibold mb-2">Crear tarea</h3>

      <input
        value={author}
        onChange={e => setAuthor(e.target.value)}
        placeholder="Autor"
        className="w-full mb-2 border rounded px-3 py-2 focus:ring-2 focus:ring-blue-200"
      />

      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Título"
        className="w-full mb-2 border rounded px-3 py-2 focus:ring-2 focus:ring-blue-200"
      />

      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Descripción"
        className="w-full mb-2 border rounded px-3 py-2 h-24 focus:ring-2 focus:ring-blue-200"
      />

      <button
        type="submit"
        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg"
      >
        Agregar
      </button>
    </form>
  )
}
