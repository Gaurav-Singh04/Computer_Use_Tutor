import React, { useState } from 'react'
import { startOfMonth, startOfWeek, addDays, format, isSameMonth, isSameDay } from 'date-fns'

function buildMonthMatrix(monthStart) {
  const start = startOfWeek(startOfMonth(monthStart), { weekStartsOn: 0 })
  const matrix = []
  let day = start
  for (let week = 0; week < 6; week++) {
    const row = []
    for (let i = 0; i < 7; i++) {
      row.push(new Date(day))
      day = addDays(day, 1)
    }
    matrix.push(row)
  }
  return matrix
}

export default function Sidebar({ cursor, events = [], onEventClick, selectedDate, onDaySelect }) {
  const [showOnlyTasks, setShowOnlyTasks] = useState(false)
  const monthStart = startOfMonth(cursor)
  const matrix = buildMonthMatrix(monthStart)

  function eventsForDay(date) {
    return events.filter((e) => isSameDay(new Date(e.start), date))
  }

  // tasks list: show all events sorted by start; apply simple "Tasks" filter by checking title contains 'task'
  let tasks = [...events].sort((a, b) => new Date(a.start) - new Date(b.start))
  if (showOnlyTasks) tasks = tasks.filter((t) => (t.title || '').toLowerCase().includes('task'))
  const today = new Date()

  return (
    <aside className="sidebar">
      <div className="mini-month">
        <div className="mini-month-header">{format(cursor, 'MMMM yyyy')}</div>
        <div className="mini-weekdays">
          {['S','M','T','W','T','F','S'].map((d) => (
            <div key={d} className="mini-weekday">{d}</div>
          ))}
        </div>
        <div className="mini-grid">
          {matrix.map((week, wi) => (
            <div className="mini-week-row" key={wi}>
              {week.map((day, di) => {
                const classes = ['mini-day']
                if (!isSameMonth(day, monthStart)) classes.push('muted')
                if (selectedDate && isSameDay(day, selectedDate)) classes.push('selected')
                if (isSameDay(day, today)) classes.push('today')
                return (
                  <div key={di} className={classes.join(' ')} onClick={() => onDaySelect && onDaySelect(day)} onDoubleClick={() => onDayDouble && onDayDouble(day)}>
                    <div className="mini-day-num">{format(day, 'd')}</div>
                    {eventsForDay(day).length > 0 && <div className="mini-dot" />}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="tasks-list">
        <div className="tasks-header">
          <span>Tasks</span>
          <button className="tasks-filter-btn" onClick={() => setShowOnlyTasks((s) => !s)}>{showOnlyTasks ? 'Show all' : 'Show tasks'}</button>
        </div>
        <div className="tasks-scroll">
          {tasks.length === 0 && <div className="muted">No tasks</div>}
          {tasks.map((t) => (
            <div key={t.id} className="task-item" onClick={() => onEventClick && onEventClick(t)}>
              <div className="task-time">{new Date(t.start).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
              <div className="task-title">{t.title}</div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
