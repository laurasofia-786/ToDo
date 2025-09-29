import React, { useState } from 'react'

const USERS = [
  { username: 'DYLAM', password: '123456' },
  { username: 'LAURA', password: '123456' }
]

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  function submit(e) {
    e.preventDefault()
    const found = USERS.find(u => u.username === username && u.password === password)
    if (found) {
      setError(null)
      onLogin(username)
    } else {
      setError('Usuario o contraseña incorrectos')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-slate-200 to-white p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-2">Team To-Do</h2>
        <p className="text-sm text-slate-500 text-center mb-4">
          Inicia sesión con uno de los usuarios de prueba
        </p>
        <form onSubmit={submit} className="space-y-3">
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Usuario"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg">
            Entrar
          </button>
          {error && <div className="text-red-500 text-center">{error}</div>}
          <div className="text-xs mt-2 text-gray-500 text-center">
            Usuarios de prueba:<br />
            DYLAM / 123456<br />
            LAURA / 123456
          </div>
        </form>
      </div>
    </div>
  )
}
