import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = ({admin, loggedIn, setLoggedIn, setAdmin}) => {
  return (
    <nav>
        <ul>
            <NavLink to="/login">Log in</NavLink>
            <NavLink to="/"><li>Upcoming</li></NavLink>
            <NavLink to="/submitEvent"><li>Submit</li></NavLink>
            {admin ? (<><NavLink to="/editor">Admin</NavLink><a onClick={() => {setAdmin(false)}}>turn off admin</a></>) : (<></>)}
            {loggedIn ? (<a onClick={() => {setLoggedIn(false)}}>Log out</a>): (<></>)}
            
        </ul>
    </nav>
  )
}

export default Navbar