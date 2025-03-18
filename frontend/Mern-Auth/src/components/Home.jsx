import React from 'react'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div className='h-[100vh] bg-emerald-950 flex justify-center items-center'>
      <Outlet />
    </div>
  )
}

export default Home
