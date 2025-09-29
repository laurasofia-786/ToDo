import React from 'react'

export default function SearchBar({ value, onChange }) {
  return (
    <div className="flex items-center gap-3">
      <input value={value} onChange={e=>onChange(e.target.value)} placeholder="Buscar por autor o texto..." className="flex-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-slate-200" />
      <div className="text-sm text-slate-500">Resultados</div>
    </div>
  )
}
