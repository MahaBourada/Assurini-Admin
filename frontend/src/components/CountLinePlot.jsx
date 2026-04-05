import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const OfferChart = ({ data, ylabel }) => {
  // Parse offer data and calculate count per date
  const offerCountByDate = () => {
    const counts = {};
    data.forEach((element) => {
      const date = new Date(element.createdAt).toLocaleDateString();
      counts[date] = (counts[date] || 0) + 1;
    });
    return Object.entries(counts).map(([date, count]) => ({ date, count }));
  };

  return (
    <LineChart width={650} height={400} data={offerCountByDate()}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis label={{ value: ylabel, angle: -90, position: 'insideLeft' }} />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="count" name="Date" stroke="#239095" />
    </LineChart>
  );
};

export default OfferChart;
