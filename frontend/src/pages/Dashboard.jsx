import { useState, useEffect } from "react";
import { getToken } from "../utils/api";
import "../styles/components.css";

export default function Dashboard() {
  const [plan, setPlan] = useState({
    title: "",
    description: "",
    price: "",
    duration: "",
  });

  const [plans, setPlans] = useState([]);
  const [metrics, setMetrics] = useState({ totalPlans: 0 });

  // Fetch trainer's plans
  const fetchPlans = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/plans/user/feed", {
        headers: { Authorization: getToken() },
      });
      const data = await res.json();
      setPlans(data || []);
      setMetrics({ totalPlans: data?.length || 0 });
    } catch (err) {
      console.error(err);
    }
  };

  // Create plan
  const createPlan = async () => {
    if (!plan.title || !plan.price || !plan.duration) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/plans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: getToken(),
        },
        body: JSON.stringify(plan),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Plan created successfully!");
        setPlan({ title: "", description: "", price: "", duration: "" });
        fetchPlans();
      } else {
        alert(data.message || "Failed to create plan");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <div className="dashboard-page">
      {/* Header */}
      <div className="dashboard-header">
        <h2>Trainer Dashboard</h2>

        <div className="metric-card">
          <h3>{metrics.totalPlans}</h3>
          <p>Total Plans</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-grid">
        {/* Create Plan */}
        <div className="card create-plan-card">
          <h3>Create New Plan</h3>

          <input
            placeholder="Plan Title"
            value={plan.title}
            onChange={(e) => setPlan({ ...plan, title: e.target.value })}
          />

          <textarea
            placeholder="Description"
            value={plan.description}
            onChange={(e) => setPlan({ ...plan, description: e.target.value })}
          />

          <input
            type="number"
            placeholder="Price (₹)"
            value={plan.price}
            onChange={(e) => setPlan({ ...plan, price: e.target.value })}
          />

          <input
            placeholder="Duration (e.g. 30 days)"
            value={plan.duration}
            onChange={(e) => setPlan({ ...plan, duration: e.target.value })}
          />

          <button onClick={createPlan}>Create Plan</button>
        </div>

        {/* Plans List */}
        <div className="card plans-card">
          <h3>Your Plans</h3>

          {plans.length === 0 ? (
            <p className="empty-text">No plans yet. Create one to get started.</p>
          ) : (
            <div className="plans-grid">
              {plans.map((p) => (
                <div key={p._id} className="plan-card">
                  <h4>{p.title}</h4>
                  <p className="desc">{p.description}</p>
                  <p>
                    <strong>₹{p.price}</strong> • {p.duration}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
