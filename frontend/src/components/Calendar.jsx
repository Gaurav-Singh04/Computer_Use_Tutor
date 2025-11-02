import React, { useMemo, useState } from 'react'
import { startOfMonth, endOfMonth, startOfWeek, addDays, format, addMonths, subMonths, isSameDay, isSameMonth } from 'date-fns'
import MonthView from './MonthView'
import WeekView from './WeekView'
import DayView from './DayView'
import Sidebar from './Sidebar'
import { updateEvent } from '../services/api'
import EventModal from './EventModal'

export default function Calendar({ events, setEvents }) {
  const [cursor, setCursor] = useState(new Date())
  const [view, setView] = useState('month')
  const [modal, setModal] = useState({ open: false, date: null, event: null })

  const monthStart = startOfMonth(cursor)

  const next = () => setCursor(addMonths(cursor, 1))
  const prev = () => setCursor(subMonths(cursor, 1))

  return (
    <div className="calendar-root layout-with-sidebar">
      <div className="calendar-controls">
        <button onClick={prev}>‹</button>
        <div className="current">{format(cursor, 'MMMM yyyy')}</div>
        <button onClick={next}>›</button>
        <div className="view-controls">
          <button onClick={() => setView('month')}>Month</button>
          <button onClick={() => setView('week')}>Week</button>
          <button onClick={() => setView('day')}>Day</button>
        </div>
      </div>

      <div className="calendar-body">
  <Sidebar cursor={cursor} events={events} selectedDate={cursor} onDaySelect={(day) => { setCursor(day); setView('week') }} onDayDouble={(day) => { setCursor(day); setView('day') }} onEventClick={(event) => setModal({ open: true, date: new Date(event.start), event })} />

        <div className="main-view">
          {view === 'month' && (
          <MonthView
            monthStart={monthStart}
            events={events}
            onDayClick={(date) => setModal({ open: true, date, event: null })}
            onEventClick={(event) => setModal({ open: true, date: new Date(event.start), event })}
            onEventDrop={async (id, newStart, newEnd) => {
              try {
                const updated = await updateEvent(id, { start: newStart, end: newEnd })
                setEvents((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
              } catch (err) {
                console.error('drop update failed', err.message)
              }
            }}
          />
          )}

          {view === 'week' && (
          <WeekView
            cursor={cursor}
            events={events}
            onDayClick={(date) => setModal({ open: true, date, event: null })}
            onEventClick={(event) => setModal({ open: true, date: new Date(event.start), event })}
            onEventDrop={async (id, newStart, newEnd) => {
              try {
                const updated = await updateEvent(id, { start: newStart, end: newEnd })
                setEvents((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
              } catch (err) {
                console.error('drop update failed', err.message)
              }
            }}
          />
        )}

        {view === 'day' && (
          <DayView
            date={cursor}
            events={events}
            onDayClick={(date) => setModal({ open: true, date, event: null })}
            onEventClick={(event) => setModal({ open: true, date: new Date(event.start), event })}
            onEventDrop={async (id, newStart, newEnd) => {
              try {
                const updated = await updateEvent(id, { start: newStart, end: newEnd })
                setEvents((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
              } catch (err) {
                console.error('drop update failed', err.message)
              }
            }}
          />
        )}

        {modal.open && (
          <EventModal
            date={modal.date}
            event={modal.event}
            close={() => setModal({ open: false })}
            setEvents={setEvents}
          />
        )}

        </div>
      </div>
    </div>
  )
}
