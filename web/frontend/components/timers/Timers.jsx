// frontend/pages/Timers.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const TIMERS_API = import.meta.env.VITE_TIMERS_API;
const SHOP = import.meta.env.VITE_SHOP_DOMAIN;

export default function Timers() {
  const [timers, setTimers] = useState([]);
  const [form, setForm] = useState({});

  useEffect(() => {
    axios.get(`${TIMERS_API}?shop=${SHOP}`).then((res) => {
      setTimers(res.data);
    });
  }, []);

  const handleSubmit = async () => {
    await axios.post(`${TIMERS_API}`, { ...form, shop: SHOP });
    alert("Timer added");
  };

  return (
    <div>
      <h1>Create Timer</h1>
      <button onClick={handleSubmit}>Submit</button>

      <h2>Timers</h2>
      <ul>
        {timers.map((t) => (
          <li key={t._id}>{t.promotionText}</li>
        ))}
      </ul>
    </div>
  );
}
