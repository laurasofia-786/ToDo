import React from 'react'
import TaskItem from './TaskItem'

export default function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  return (
    <ul className="space-y-3">
      {tasks.map(t => (
        <TaskItem
          key={t.id}
          task={t}
          onToggle={() => onToggle(t.id)}
          onDelete={() => onDelete(t.id)}
          onEdit={(newTitle, newText) => onEdit(t.id, newTitle, newText)}
        />
      ))}
    </ul>
  )
}
