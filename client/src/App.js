import './App.css';
import Layout from './Layout'
import AdminPage from './AdminPage'
import SubmitEvent from './submitEvent';
import Login from './Login';
import Register from './Register';
import UpcomingEvents from './UpcomingEvents';
import { Outlet, Route, Routes } from 'react-router-dom';
import { useState } from 'react';


function App() {
  const [admin, setAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  async function submitLogin(e) {
    e.preventDefault()
    const response = await fetch("http://localhost:5050/users")
    const users = await response.json()
    users.forEach(element => {
      if(Object.values(element).includes(email)){
        if(Object.values(element).includes(password)){
          setEmail("")
          setPassword("")
          setLoggedIn(true)
          if(Object.values(element).includes("admin")){
            setAdmin(true)
          }
        }
      }
    });
  }

  async function submitRegister(e) {
    e.preventDefault()
    const response = await fetch("http://localhost:5050/users", {
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email: email, password: password}),
    })
    setEmail("")
    setPassword("")
    setLoggedIn(true)
  }
  return (
    <Routes>
      <Route path='/' element={<Layout admin={admin} loggedIn={loggedIn} setAdmin={setAdmin} setLoggedIn={setLoggedIn}/>}>
        <Route index element={<UpcomingEvents />} />
        <Route path='/login' element={<Login 
        submitLogin={submitLogin}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        />}/>
        <Route path='/register' element={<Register 
        submitRegister={submitRegister}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        />}/>
        <Route path='/editor' element={<AdminPage 
        admin={admin}/>}/>
        <Route path='/editor/:id' element={<AdminPage />}/>
        <Route path='/submitEvent' element={<SubmitEvent 
        loggedIn={loggedIn}
        />}/>


      </Route>
    </Routes>
  );
}

export default App;
