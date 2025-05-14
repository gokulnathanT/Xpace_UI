import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-lg border border-gray-200 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function CardContent({ children, className = "" }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

export default function Dashboard() {
  const [metrics, setMetrics] = useState({});
  const [monthlyChart, setMonthlyChart] = useState([]);
  const [myJourney, setMyJourney] = useState([]);
  const token = localStorage.getItem("token");
  const userData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    const fetchJourneys = async () => {
      if (!token || !userData) return;
      try {
        const response = await axios.get(
          `http://localhost:8081/api/journeys/user/${userData.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMyJourney(response.data);
      } catch (error) {
        console.error("Error fetching journeys:", error);
      }
    };
    fetchJourneys();
  }, [token, userData]);

  useEffect(() => {
    const totalBookings = myJourney.length;
    const totalCapacity = myJourney.reduce(
      (acc, j) => acc + (j.totalCapacity || 0),
      0
    );
    const availableCapacity = myJourney.reduce(
      (acc, j) => acc + (j.availableCapacity || 0),
      0
    );
    const avgUtilization = totalCapacity
      ? ((1 - availableCapacity / totalCapacity) * 100).toFixed(1)
      : 0;

    // Most common route
    const routeCount = {};
    myJourney.forEach((j) => {
      const route = `${j.startLocation} → ${j.endLocation}`;
      routeCount[route] = (routeCount[route] || 0) + 1;
    });
    const mostBookedRoute =
      Object.entries(routeCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

    // Monthly trend
    const monthly = {};
    myJourney.forEach((j) => {
      const month = new Date(j.startDate).toLocaleString("default", {
        month: "short",
      });
      monthly[month] = (monthly[month] || 0) + 1;
    });
    const monthlyData = Object.entries(monthly).map(([month, count]) => ({
      month,
      count,
    }));
    const mostActiveMonth =
      monthlyData.sort((a, b) => b.count - a.count)?.[0]?.month || "N/A";

    // Success Rate (assuming a field j.status === 'Completed')
    const cancelled = myJourney.filter((j) => j.status === "CANCELLED").length;
    const total = myJourney.length;
    const successRate = totalBookings
      ? (100-(cancelled / total) * 100).toFixed(1)
      : 0;

    setMetrics({
      totalBookings,
      totalCapacity,
      availableCapacity,
      avgUtilization,
      mostBookedRoute,
      mostActiveMonth,
      successRate,
    });
    setMonthlyChart(monthlyData);
  }, [myJourney]);

  return (
    <div className="p-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-blue-50">
        <CardContent>
          <p className="text-sm text-gray-500">Total Bookings</p>
          <p className="text-2xl font-bold">{metrics.totalBookings}</p>
        </CardContent>
      </Card>

      <Card className="bg-yellow-50">
        <CardContent>
          <p className="text-sm text-gray-500">Total Capacity</p>
          <p className="text-2xl font-bold">{metrics.totalCapacity}</p>
        </CardContent>
      </Card>

      <Card className="bg-green-50">
        <CardContent>
          <p className="text-sm text-gray-500">Available Capacity</p>
          <p className="text-2xl font-bold">{metrics.availableCapacity}</p>
        </CardContent>
      </Card>

      <Card className="bg-purple-50">
        <CardContent>
          <p className="text-sm text-gray-500">Avg Utilization</p>
          <p className="text-2xl font-bold">{metrics.avgUtilization}%</p>
        </CardContent>
      </Card>

      <Card className="bg-red-50">
        <CardContent>
          <p className="text-sm text-gray-500">Success Rate</p>
          <p className="text-2xl font-bold">{metrics.successRate}%</p>
        </CardContent>
      </Card>

      <Card className="bg-orange-50">
        <CardContent>
          <p className="text-sm text-gray-500">Most Active Month</p>
          <p className="text-xl font-bold">{metrics.mostActiveMonth}</p>
        </CardContent>
      </Card>

      <Card className="bg-cyan-50 col-span-1 md:col-span-2">
        <CardContent>
          <p className="text-sm text-gray-500">Most Booked Route</p>
          <p className="text-xl font-bold">{metrics.mostBookedRoute}</p>
        </CardContent>
      </Card>

      <div className="col-span-1 md:col-span-2 lg:col-span-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-lg font-semibold mb-4">Monthly Booking Trend</p>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyChart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#6366f1"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
