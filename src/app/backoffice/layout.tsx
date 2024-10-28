import React, {ReactNode} from 'react'
import Sidebar from '@/components/features/backoffice/sidebar'
import Navbar from '@/components/features/backoffice/navbar'

const Layout = ({children}: {children: ReactNode}) => {
  return (
    <div>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <Sidebar />
        <div className='h-screen relative overflow-y-auto'>
          <Navbar />
          <main className=' gap-4 p-4 lg:gap-6 lg:p-6 '>
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

export default Layout