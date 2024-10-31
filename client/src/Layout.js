import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const Layout = ({admin, loggedIn, setLoggedIn, setAdmin}) => {
  return (
    <>
        <Navbar admin={admin} loggedIn={loggedIn} setAdmin={setAdmin} setLoggedIn={setLoggedIn}/>
        <Outlet />
    </>
  )
}

export default Layout