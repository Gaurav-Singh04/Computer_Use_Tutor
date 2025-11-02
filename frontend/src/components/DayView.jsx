import React, { useState } from 'react'
import { format, isSameDay, differenceInMinutes } from 'date-fns'

function minutesFromTop(clientY, container) {
  const rect = container.getBoundingClientRect()
  const y = clientY - rect.top
  const pct = Math.max(0, Math.min(1, y / rect.height))
  const mins = Math.round(pct * 24 * 60)
  // snap to nearest 15 minutes
  const snapped = Math.round(mins / 15) * 15
  return snapped
}

export default function DayView({ date, events, onDayClick, onEventClick, onEventDrop }) {
  const [dragPreview, setDragPreview] = useState(null)
  const [draggingEvent, setDraggingEvent] = useState(null)

  function eventsForDay(date) {
    return events.filter((e) => isSameDay(new Date(e.start), date))
  }

  function handleDragOver(e) { 
    e.preventDefault()
    if (!draggingEvent) return
    const mins = minutesFromTop(e.clientY, e.currentTarget)
    setDragPreview({ mins, duration: draggingEvent.duration, color: draggingEvent.color, title: draggingEvent.title })
  }

  function handleDrop(e, date) {
    e.preventDefault()
    try {
      const payload = JSON.parse(e.dataTransfer.getData('text/plain'))
      if (!payload || !payload.id) return
      const mins = minutesFromTop(e.clientY, e.currentTarget)
      const hour = Math.floor(mins / 60)
      const minute = mins % 60
      const originalStart = new Date(payload.start)
      const originalEnd = new Date(payload.end)
      const duration = originalEnd.getTime() - originalStart.getTime()
      const newStart = new Date(date)
      newStart.setHours(hour, minute, 0, 0)
      const newEnd = new Date(newStart.getTime() + duration)
      if (onEventDrop) onEventDrop(payload.id, newStart.toISOString(), newEnd.toISOString())
    } catch (err) { console.error('drop parse failed', err.message) }
    setDragPreview(null)
    setDraggingEvent(null)
  }

  function onEvDragStart(e, ev) {
    e.dataTransfer.setData('text/plain', JSON.stringify({ id: ev.id, start: ev.start, end: ev.end }))
    setDraggingEvent({ id: ev.id, duration: Math.max(15, differenceInMinutes(new Date(ev.end), new Date(ev.start))) , color: ev.color, title: ev.title })
  }

  function onEvDragEnd() {
    setDragPreview(null)
    setDraggingEvent(null)
  }

  function positionStyleForEvent(ev) {
    const start = new Date(ev.start)
    const mins = start.getHours() * 60 + start.getMinutes()
    const topPct = mins / (24 * 60)
    const durationMins = Math.max(15, differenceInMinutes(new Date(ev.end), start))
    const heightPct = durationMins / (24 * 60)
    return { top: `${topPct * 100}%`, height: `${Math.max(0.5, heightPct * 100)}%` }
  }

  return (
    <div className="day-view" onClick={() => onDayClick(date)}>
      <div className="day-header">{format(date, 'EEEE, MMM d')}</div>
      <div className="day-body">
        <div className="time-gutter">
          {[...Array(24)].map((_, i) => (
            <div key={i} className="gutter-slot">{i % 2 === 0 ? `${i}:00` : ''}</div>
          ))}
        </div>

        <div className="day-column" onDragOver={handleDragOver} onDrop={(e)=>handleDrop(e, date)}>
          {[...Array(24)].map((_, i) => (
            <div key={i} className="hour-slot" />
          ))}
          {eventsForDay(date).map((ev) => (
            <div key={ev.id} className="event-pill absolute-ev" style={{ background: ev.color, ...positionStyleForEvent(ev) }} draggable onDragStart={(e)=>onEvDragStart(e, ev)} onDragEnd={onEvDragEnd} onClick={(e)=>{ e.stopPropagation(); onEventClick(ev) }}>
              <div className="ev-time">{new Date(ev.start).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
              <div className="ev-title">{ev.title}</div>
            </div>
          ))}
          {dragPreview && (
            <div className="drag-preview absolute-ev" style={{ background: dragPreview.color || 'rgba(25,118,210,0.15)', opacity:0.95, ...{ top: `${(dragPreview.mins/(24*60))*100}%`, height: `${(dragPreview.duration/(24*60))*100}%` } }}>
              <div className="ev-time">{Math.floor(dragPreview.mins/60).toString().padStart(2,'0')}:{(dragPreview.mins%60).toString().padStart(2,'0')}</div>
              <div className="ev-title">{dragPreview.title}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
