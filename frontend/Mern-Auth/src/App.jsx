import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Signup from './components/Signup'
import Signin from './components/Signin'
import Home from './components/Home'
import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const router=createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: (
        <h1>The page you are asking for is not available.</h1>
      ),
      children: [
        {
          path: "/signup",
          element: <Signup />
        },
        {
          path: "/signin",
          element: <Signin />
        }
      ]
    }
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
