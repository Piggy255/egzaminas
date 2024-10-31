import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function getEvents() {
      const response = await fetch(`http://localhost:5050/approvedEvents/`);
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

  async function addStar(event) {
    try{
    const response = await fetch(
      `http://localhost:5050/approvedEvents/${event._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...event, starCount: event.starCount+1}),
      })
    } catch(error){
        console.log(`Error while trying to add star: ${error}`)
    }
  }
  return (
    <>
    <ul>
      {events.map((event) => (
        <li>
          {event.name}
          {event.category}
          {event.time}
          {event.location}
          {event.image}
          <button
            onClick={(e) => {
              addStar(event);
            }}
          >
            {event.starCount}
          </button>
        </li>
      ))}
    </ul>
    </>
  );
};

export default UpcomingEvents;
