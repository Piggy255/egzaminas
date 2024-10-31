import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Event(props) {
  return(
  <li>
    {props.event.name}
    {props.event.category}
    {props.event.time}
    {props.event.location}
    {props.event.image}
    <Link to={`/editor/${props.event._id}`}>Edit</Link>
    <button
      onClick={() => {
        props.deleteEvent(props.event._id);
      }}
    >
      Delete
    </button>
    <button
      onClick={() => {
        props.approveEvent(props.event._id)
      }}
    >
      Approve
    </button>
  </li>);
}

const AdminEventList = () => {
  const [events, setEvents] = useState([]);

  // get all events
  useEffect(() => {
    async function getEvents() {
      const response = await fetch(`http://localhost:5050/events/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const events = await response.json();
      setEvents(events);
    }
    getEvents();
    return;
  }, [events.length]);

  // delete an event
  async function deleteEvent(id) {
    await fetch(`http://localhost:5050/events/${id}`, {
      method: "DELETE",
    });
    const newEvents = events.filter((el) => el._id !== id);
    setEvents(newEvents);
  }

  // approve an event
  async function approveEvent(event) {
    try{
    const response = await fetch(`http://localhost:5050/approvedEvents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } 
    }catch(error){
      console.log(`An error occured while approving an event: ${error}`)
    }
  }

  return <ul>
    {events.map((event) => (
      <Event 
      event={event}
      deleteEvent={() => deleteEvent(event._id)}
      key={event._id}
      approveEvent={() => {approveEvent(event); deleteEvent(event._id)}}
      />
    ))}
  </ul>;
};

export default AdminEventList;
