import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./Firebase";
import { useAuth } from "../context/AuthContext";
import "./Form.css";

function Admin() {
  const { user } = useAuth();
  const [registrations, setRegistrations] = useState([]);
  const [events, setEvents] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Get all events first, so we can show event titles instead of just IDs
      const eventsSnap = await getDocs(collection(db, "events"));
      const eventsMap = {};
      eventsSnap.docs.forEach((doc) => {
        eventsMap[doc.id] = doc.data();
      });
      setEvents(eventsMap);

      // Get all registrations
      const regSnap = await getDocs(collection(db, "registrations"));
      const regList = regSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRegistrations(regList);

      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <div className="container"><p>Loading...</p></div>;

  return (
    <div className="container" style={{ flexDirection: "column", alignItems: "center" }}>
      <h1 style={{ color: "#fff" }}>Admin — All Registrations</h1>

      <div style={{ width: "700px" }}>
        {registrations.length === 0 && <p style={{ color: "#ccc" }}>No registrations yet.</p>}

        {registrations.map((reg) => (
          <div key={reg.id} className="form-box" style={{ textAlign: "left", marginBottom: "12px" }}>
            <p><strong>Event:</strong> {events[reg.eventId]?.title || reg.eventId}</p>
            <p><strong>User:</strong> {reg.userEmail}</p>
            <p><strong>Registered At:</strong> {reg.registeredAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;