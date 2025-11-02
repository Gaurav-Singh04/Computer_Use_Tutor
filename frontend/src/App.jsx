import React, { useEffect, useState } from 'react'
import Calendar from './components/Calendar'
import { fetchEvents } from './services/api'
import QuickAdd from './components/QuickAdd'
import AccountArea from './components/AccountArea'

export default function App() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    (async () => {
      const res = await fetchEvents()
      setEvents(res || [])
    })()
  }, [])

  return (
    <div className="app-root">
      <header className="topbar compact">
        <div className="topbar-left">
          <h1>Calendar — Clone</h1>
        </div>

        <div className="topbar-center">
          <QuickAdd defaultDate={new Date()} setEvents={setEvents} />
        </div>

        <div className="topbar-right">
          <AccountArea name="Gaurav Singh" />
        </div>
      </header>

      <main>
        <Calendar events={events} setEvents={setEvents} />
      </main>
    </div>
  )
}
