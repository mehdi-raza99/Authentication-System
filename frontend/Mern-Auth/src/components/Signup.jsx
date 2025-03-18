import React from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <div>
        <form className='bg-indigo-400 flex flex-col items-center gap-12 p-12 rounded-4xl min-w-[520px] text-2xl font-mono' action="">
            <span className='text-4xl'>SignUp Here!</span>
            <input className='bg-white py-2 px-4' type="email" name="email" id="" placeholder='Enter Email'/>
            <input className='bg-white py-2 px-4' type="password" name="password" id="" placeholder='Enter Password'/>
            <button className='bg-green-700 py-2 px-5 rounded-2xl cursor-pointer' type='submit'>Submit</button>
            <Link className='bg-cyan-700 py-2 px-5 rounded-2xl cursor-pointer' to={"/signin"}>SignIn Here</Link>
        </form>
    </div>
  )
}

export default Signup
