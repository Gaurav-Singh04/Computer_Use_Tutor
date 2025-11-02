import React from 'react'
import { startOfWeek, addDays, format, isSameMonth, isSameDay, startOfMonth } from 'date-fns'

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

export default function MonthView({ monthStart, events = [], onDayClick, onEventClick }) {
  const matrix = buildMonthMatrix(monthStart)

  function eventsForDay(date) {
    return events.filter((e) => isSameDay(new Date(e.start), date))
  }

  return (
    <div className="month-view">
      <div className="weekdays">
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((d) => (
          <div key={d} className="weekday">{d}</div>
        ))}
      </div>

      <div className="month-grid">
        {matrix.map((week, wi) => (
          <div className="week-row" key={wi}>
            {week.map((day, di) => (
              <div
                key={di}
                className={"day-cell " + (isSameMonth(day, monthStart) ? '' : 'muted')}
                onClick={() => onDayClick && onDayClick(day)}
              >
                <div className="day-num">{format(day, 'd')}</div>
                <div className="day-events">
                  {eventsForDay(day).slice(0,3).map((ev) => (
                    <div
                      key={ev.id}
                      className="event-pill"
                      style={{ background: ev.color }}
                      onClick={(e) => { e.stopPropagation(); onEventClick && onEventClick(ev) }}
                    >
                      <div className="ev-time">{new Date(ev.start).toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' })}</div>
                      <div className="ev-title">{ev.title}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
