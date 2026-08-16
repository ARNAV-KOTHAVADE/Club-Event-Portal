import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./Firebase";
import "./Form.css";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const snapshot = await getDocs(collection(db, "events"));
      const eventList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(eventList);
      setLoading(false);
    };

    fetchEvents();
  }, []);

  if (loading) return <div className="container"><p>Loading events...</p></div>;

  return (
    <div className="container" style={{ flexDirection: "column", alignItems: "center" }}>
      <h1 style={{ color: "#fff" }}>Upcoming Events</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "400px" }}>
        {events.map((event) => (
          <Link
            key={event.id}
            to={`/events/${event.id}`}
            style={{ textDecoration: "none" }}
          >
            <div className="form-box" style={{ width: "100%", textAlign: "left", cursor: "pointer" }}>
              <h2 style={{ color: "#fff" }}>{event.title}</h2>
              <p style={{ color: "#ccc" }}>{event.eventDate} · {event.location}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Events;