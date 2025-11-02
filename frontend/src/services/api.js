import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:4000' })

export async function fetchEvents(start, end) {
  try {
    const params = {}
    if (start) params.start = start
    if (end) params.end = end
    const res = await API.get('/events', { params })
    return res.data
  } catch (err) {
    console.error('fetchEvents', err.message)
    return []
  }
}

export async function createEvent(payload) {
  const res = await API.post('/events', payload)
  return res.data
}

export async function updateEvent(id, payload) {
  const res = await API.put(`/events/${id}`, payload)
  return res.data
}

export async function deleteEvent(id) {
  const res = await API.delete(`/events/${id}`)
  return res.data
}
