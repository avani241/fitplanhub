import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getToken } from "../utils/api";
import "../styles/components.css";

export default function PlanDetails() {
  const { id } = useParams(); // plan ID from URL
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [enrolled, setEnrolled] = useState(false);

  // Fetch plan details
  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/plans/${id}`, {
          headers: { Authorization: getToken() },
        });
        if (!res.ok) throw new Error("Plan not found");
        const data = await res.json();
        setPlan(data);

        // Check if user is already enrolled
        if (data.enrolledUsers?.includes(localStorage.getItem("userId"))) {
          setEnrolled(true);
        }
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to fetch plan");
      } finally {
        setLoading(false);
      }
    };
    fetchPlan();
  }, [id]);

  // Enroll in plan
  const handleEnroll = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/plans/${id}/enroll`, {
        method: "POST",
        headers: { Authorization: getToken() },
      });
      const data = await res.json();
      if (res.ok) {
        alert("Successfully enrolled!");
        setEnrolled(true);
      } else {
        alert(data.message || "Enrollment failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to server");
    }
  };

  if (loading) return <p style={{ padding: "30px" }}>Loading plan details...</p>;
  if (error) return <p style={{ padding: "30px", color: "red" }}>{error}</p>;

  return (
    <div className="plan-details-page">
      <Link to="/feed" className="back-link">&larr; Back to Feed</Link>
      <div className="plan-details-card">
        <h2>{plan.title}</h2>
        <p><strong>Description:</strong> {plan.description}</p>
        <p><strong>Trainer:</strong> {plan.trainerId?.name || "Unknown"}</p>
        <p><strong>Price:</strong> ₹{plan.price}</p>
        <p><strong>Duration:</strong> {plan.duration}</p>
        <button
          onClick={handleEnroll}
          disabled={enrolled}
          className={enrolled ? "enrolled-btn" : "enroll-btn"}
        >
          {enrolled ? "Already Enrolled" : "Enroll Now"}
        </button>
      </div>
    </div>
  );
}
