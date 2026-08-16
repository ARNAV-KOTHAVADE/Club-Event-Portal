import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./Firebase";
import { useAuth } from "../context/AuthContext";
import "./Form.css";

function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registered, setRegistered] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      const eventSnap = await getDoc(doc(db, "events", id));
      if (eventSnap.exists()) {
        setEvent(eventSnap.data());
      }

      if (user) {
        const regSnap = await getDoc(doc(db, "registrations", `${id}_${user.uid}`));
        setRegistered(regSnap.exists());
      }

      setLoading(false);
    };

    fetchEvent();
  }, [id, user]);

  const handleRegister = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setSubmitting(true);
    try {
      await setDoc(doc(db, "registrations", `${id}_${user.uid}`), {
        eventId: id,
        userId: user.uid,
        userEmail: user.email,
        registeredAt: new Date().toISOString(),
      });
      setRegistered(true);
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="container"><p>Loading...</p></div>;
  if (!event) return <div className="container"><p>Event not found.</p></div>;

  return (
    <div className="container">
      <div className="form-box" style={{ textAlign: "left" }}>
        <h2>{event.title}</h2>
        <p>{event.eventDate} · {event.location}</p>
        <p style={{ marginTop: "16px" }}>{event.description}</p>

        {registered ? (
          <button disabled style={{ marginTop: "20px", backgroundColor: "#555" }}>
            Already Registered
          </button>
        ) : (
          <button onClick={handleRegister} disabled={submitting} style={{ marginTop: "20px" }}>
            {submitting ? "Registering..." : "Register"}
          </button>
        )}
      </div>
    </div>
  );
}

export default EventDetail;