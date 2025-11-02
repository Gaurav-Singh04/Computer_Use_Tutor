import React, { useState } from 'react'
import { formatISO } from 'date-fns'
import { createEvent, updateEvent, deleteEvent } from '../services/api'

export default function EventModal({ date, event, close, setEvents }) {
  const [title, setTitle] = useState(event ? event.title : '')
  const [description, setDescription] = useState(event ? event.description : '')
  const [start, setStart] = useState(event ? new Date(event.start).toISOString().slice(0,16) : new Date(date).toISOString().slice(0,16))
  const [end, setEnd] = useState(event ? new Date(event.end).toISOString().slice(0,16) : new Date(date).toISOString().slice(0,16))
  const [color, setColor] = useState(event ? event.color : '#1976d2')

  async function onSave(e) {
    e.preventDefault()
    const payload = { title, description, start: new Date(start).toISOString(), end: new Date(end).toISOString(), color }
    if (event) {
      const updated = await updateEvent(event.id, payload)
      setEvents((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
    } else {
      const created = await createEvent(payload)
      setEvents((prev) => [created, ...prev])
    }
    close()
  }

  async function onDelete() {
    if (!event) return
    await deleteEvent(event.id)
    setEvents((prev) => prev.filter((p) => p.id !== event.id))
    close()
  }

  return (
    <div className="modal-overlay" onClick={close}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={onSave}>
          <h3>{event ? 'Edit event' : 'Create event'}</h3>
          <label>Title</label>
          <input value={title} onChange={(e)=>setTitle(e.target.value)} required />

          <label>Start</label>
          <input type="datetime-local" value={start} onChange={(e)=>setStart(e.target.value)} required />

          <label>End</label>
          <input type="datetime-local" value={end} onChange={(e)=>setEnd(e.target.value)} required />

          <label>Color</label>
          <input type="color" value={color} onChange={(e)=>setColor(e.target.value)} />

          <label>Description</label>
          <textarea value={description} onChange={(e)=>setDescription(e.target.value)} />

          <div className="modal-actions">
            <button type="submit">Save</button>
            {event && <button type="button" className="danger" onClick={onDelete}>Delete</button>}
            <button type="button" onClick={close}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}
