import React from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import useRedirectLoggedOutUser  from '../customHook/useRedirectLoggedOutUser.js'
function Dashboard() {
  useRedirectLoggedOutUser('/login')
  return (
    <div>
      <Sidebar/>
    </div>
  )
}

export default Dashboard