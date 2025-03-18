import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Profile from './Profile'
import axios from 'axios'
const Signin = () => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [errorMessage,setErrorMessage]=useState("")
  const [user,setUser]=useState(null)
  const [loginState,setLoginState]=useState(true)

  function getLoginData(email,password){
    axios.post("http://localhost:3000/auth/login",{email,password}).then((response) =>{setUser(response.data.user); setLoginState(false)}).catch((error)=>setErrorMessage(error.response.data.message))
  }

  function handleLogin(e){
    e.preventDefault();
    getLoginData(email,password)
    setEmail("")
    setPassword("")
  }
  return (loginState?
    <div>
        <form className='bg-sky-700 flex flex-col items-center gap-12 p-12 rounded-4xl min-w-[520px] text-2xl font-mono' onSubmit={handleLogin} action="">
            <span className='text-4xl'>SignIn Here!</span>
            <input className='bg-white py-2 px-4' type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Email'/>
            <input className='bg-white py-2 px-4' type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Password'/>
            <button className='bg-green-700 py-2 px-5 rounded-2xl cursor-pointer' type='submit'>Submit</button>
            {errorMessage && <h1>{errorMessage}</h1>}
            <Link className='bg-gray-700 py-2 px-5 rounded-2xl cursor-pointer' to={"/signup"}>SignUp Here</Link>
        </form>
    </div>:<Profile user={user} />
  )
}

export default Signin
