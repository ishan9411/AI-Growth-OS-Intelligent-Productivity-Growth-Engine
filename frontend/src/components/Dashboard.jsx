import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductivityChart from "./ProductivityChart";

function Dashboard({analytics, isUpdating}) {

  if (!analytics) return <p>Loading...</p>;

  return (
    <div style={{ marginTop: "30px",
    opacity: isUpdating ? 0.6 : 1,
    transition: "opacity 0.3 ease" }}>

      <ProductivityChart analytics={analytics} />

      {
        isUpdating && (
          <p style={{color:"red", fontWeight:"bold"}}>AI is recalculating...</p>
        )
      }

      <h2>Dashboard</h2>

      <h1 style={{ fontSize: "40px", color: "green" }}>
        {analytics.productivity_score}
      </h1>
      <p>Productivity Score</p>

      <hr />

      <p>🔥 Average Focus: {analytics.average_focus}</p>
      <p>⏱ Time Accuracy: {analytics.time_accuracy}%</p>
      <p>⚠ Burnout Risk: {analytics.burnout_risk}</p>

      <hr />

      <h3> AI Insights</h3>
      <p>{analytics.ai_insights}</p>

    </div>
  );
}

export default Dashboard;