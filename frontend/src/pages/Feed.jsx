import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getToken } from "../utils/api";
import "../styles/components.css";

export default function Feed() {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/plans/user/feed", {
          headers: {
            Authorization: getToken(),
          },
        });

        if (!res.ok) throw new Error("Failed to load feed");

        const data = await res.json();
        setFeed(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Unable to load feed");
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, []);

  if (loading) {
    return <p style={{ padding: "30px" }}>Loading feed...</p>;
  }

  if (error) {
    return <p style={{ padding: "30px", color: "red" }}>{error}</p>;
  }

  return (
    <div className="feed-page">
      <h2>Your Feed</h2>

      {feed.length === 0 && (
        <p>No plans in your feed. Follow trainers to see plans.</p>
      )}

      <div className="plans-grid">
        {feed.map((plan) => (
          <Link
            key={plan._id}
            to={`/plan/${plan._id}`}
            className="feed-card-link"
          >
            <div className="feed-card">
              <h3>{plan.title}</h3>
              <p className="muted">
                Trainer: {plan.trainerId?.name || "Unknown"}
              </p>
              <p><strong>₹{plan.price}</strong></p>
              <p>Duration: {plan.duration}</p>
              <button className="view-btn">View Details</button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
