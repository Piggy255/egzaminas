import './App.css';
import Layout from './Layout'
import AdminPage from './AdminPage'
import SubmitEvent from './submitEvent';
import UpcomingEvents from './UpcomingEvents';
import { Outlet, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<UpcomingEvents />} />
        <Route path='/editor' element={<AdminPage />}/>
        <Route path='/editor/:id' element={<AdminPage />}/>
        <Route path='/submitEvent' element={<SubmitEvent />}/>


      </Route>
    </Routes>
  );
}

export default App;
