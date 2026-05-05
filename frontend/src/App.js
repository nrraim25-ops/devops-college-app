import React, { useState } from "react";
import axios from "axios";

function App() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [events, setEvents] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const res = await axios.post("/api/auth/register", form);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post("/api/auth/login", {
        email: form.email,
        password: form.password
      });

      localStorage.setItem("token", res.data.token);
      alert("Login successful");

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  const getProtectedData = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("/api/protected", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert(res.data.message);

    } catch (err) {
      alert("Access denied");
    }
  };

  const fetchEvents = async () => {
    try {
      const res = await axios.get("/api/events");
      setEvents(res.data);
    } catch (err) {
      alert("Failed to fetch events");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        <h1 style={styles.title}>College Activity System</h1>

        <input
          style={styles.input}
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />

        <input
          style={styles.input}
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          style={styles.input}
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button style={styles.button} onClick={handleRegister}>
          Register
        </button>

        <button style={styles.button} onClick={handleLogin}>
          Login
        </button>

        <button style={styles.button} onClick={getProtectedData}>
          Access Protected
        </button>

        <button style={styles.button} onClick={fetchEvents}>
          Load Events
        </button>

        <div style={{ marginTop: "20px", textAlign: "left" }}>
          {events.map((event) => (
            <div key={event._id} style={{ marginBottom: "10px" }}>
              <strong>{event.title}</strong>
              <p>{event.description}</p>
              <small>{event.date}</small>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    color: "white",
    fontFamily: "Poppins, sans-serif"
  },
  card: {
    textAlign: "center",
    padding: "40px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
    width: "320px"
  },
  title: {
    marginBottom: "20px"
  },
  input: {
    display: "block",
    width: "100%",
    margin: "10px 0",
    padding: "10px",
    borderRadius: "6px",
    border: "none"
  },
  button: {
    marginTop: "10px",
    padding: "10px",
    width: "100%",
    border: "none",
    borderRadius: "6px",
    background: "#38bdf8",
    color: "black",
    cursor: "pointer",
    fontWeight: "bold"
  }
};

export default App;