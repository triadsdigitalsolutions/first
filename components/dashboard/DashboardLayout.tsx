
import React from 'react'

import DashNavbar from './DashNavbar'
import Sidebar from './Sidebar'

function DashboardLayout({ children }: { children: React.ReactNode }) {


  return (
    <div>
      <DashNavbar />
      <div className='flex flex-col sm:flex-row  justify-center items-center sm:items-start sm:justify-start'>
        <div>
          <Sidebar />
        </div>
        <div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout