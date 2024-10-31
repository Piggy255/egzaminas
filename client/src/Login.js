import React from 'react'
import { Link } from 'react-router-dom'

const Login = ({ submitLogin, email, setEmail, password, setPassword}) => {


  return (
    <>
    <form onSubmit={submitLogin}>
        <input type='email' placeholder='email' value={email} onChange={(e) => {setEmail(e.target.value)}}></input>
        <input type='password' placeholder='password' value={password} onChange={(e) => {setPassword(e.target.value)}}></input>
        <button>login</button>
    </form>
    <Link to="/register">Register</Link>
    </>
  )
}

export default Login