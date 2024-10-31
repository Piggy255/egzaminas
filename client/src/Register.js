import React from 'react'
import { Link } from 'react-router-dom'

const Register = ({ submitRegister, email, setEmail, password, setPassword }) => {
  return (
    <>
    <form onSubmit={submitRegister}>
        <input type='email' placeholder='email' value={email} onChange={(e) => {setEmail(e.target.value)}}></input>
        <input type='password' placeholder='password' value={password} onChange={(e) => {setPassword(e.target.value)}}></input>
        <button>register</button>
    </form>
    <Link to="/login">Login</Link>
    </>
  )
}

export default Register