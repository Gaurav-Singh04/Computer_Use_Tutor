import React from 'react'

export default function AccountArea({ name = 'Gaurav' }) {
  const initials = name.split(' ').map(s => s[0]).join('').slice(0,2).toUpperCase()
  return (
    <div className="account-area">
      <button className="today-btn">Today</button>
      <div className="tz">GMT+05:30</div>
      <div className="avatar" title={name}>{initials}</div>
    </div>
  )
}
