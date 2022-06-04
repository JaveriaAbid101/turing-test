import React from 'react'
import {Routes, Route} from 'react-router-dom'

import CallDashboard from './components/CallDashboard'
import CallDetails from './components/CallDetails'
import Login from './components/login'

export default function Routing() {
  return (
    <div>
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/calls" element={<CallDashboard/>} />
      <Route path="/details/:id" element={<CallDetails/>} />
      
    </Routes>
    </div>
  )
}
