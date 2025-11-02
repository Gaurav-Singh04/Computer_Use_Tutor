import React, { useState } from 'react'
import { createEvent } from '../services/api'
import { addHours } from 'date-fns'

export default function QuickAdd({ defaultDate, setEvents }) {
  const [title, setTitle] = useState('')
  const [dateTime, setDateTime] = useState(() => {
    const d = defaultDate ? new Date(defaultDate) : new Date()
    d.setHours(9,0,0,0)
    return d.toISOString().slice(0,16)
  })
  const [loading, setLoading] = useState(false)

  async function submit(e) {
    e.preventDefault()
    if (!title.trim()) return
    setLoading(true)
    try {
      const start = new Date(dateTime)
      const end = addHours(start, 1)
      const created = await createEvent({ title: title.trim(), start: start.toISOString(), end: end.toISOString(), color: '#1976d2', description: '' })
      setEvents((prev) => [created, ...prev])
      setTitle('')
    } catch (err) {
      console.error('quick add failed', err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="quick-add" onSubmit={submit}>
      <input className="qa-input" placeholder="Quick add (title)" value={title} onChange={(e)=>setTitle(e.target.value)} />
      <input className="qa-dt" type="datetime-local" value={dateTime} onChange={(e)=>setDateTime(e.target.value)} />
      <button className="qa-btn" type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add'}</button>
    </form>
  )
}
