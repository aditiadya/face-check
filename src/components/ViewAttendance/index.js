import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  ViewAttendanceContainer,
  SummaryContainer,
  StatsInfo,
  StatsDetails,
  StatItem,
  StatLabel,
  StatValue,
  PieChartWrapper,
  PieChartContainer,
  AttendanceContainer,
  AttendanceTable,
  TableHeader,
  TableCell,
  StatusBadge,
  ErrorMessage,
  LoadingMessage
} from "./style"; 

const COLORS = ['#4CAF50', '#FFC107', '#F44336']; // Green, Yellow, Red

const ViewAttendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const username = localStorage.getItem("username");
      const password = localStorage.getItem("password");

      if (!username || !password) {
        navigate("/login");
        return;
      }

      try {
        const [recordsRes, statsRes] = await Promise.all([
          axios.post("http://localhost:5000/api/view-attendance", { username, password }),
          axios.post("http://localhost:5000/api/attendance-stats", { username, password })
        ]);

        if (recordsRes.data?.attendance) {
          setAttendanceRecords(recordsRes.data.attendance);
        }

        if (statsRes.data) {
          setStats(statsRes.data);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load attendance data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const pieData = stats ? [
    { name: 'On Time', value: stats.stats.ontime },
    { name: 'Late', value: stats.stats.late },
    { name: 'Absent', value: stats.stats.absent }
  ].filter(item => item.value > 0) : [];

  if (loading) return <LoadingMessage>Loading attendance data...</LoadingMessage>;
  if (error) return <ErrorMessage>Error: {error}</ErrorMessage>;

  return (
    <ViewAttendanceContainer>
      <SummaryContainer>
        <StatsInfo>
          <h3>Attendance Summary</h3>
          {stats && (
            <StatsDetails>
              <StatItem>
                <StatLabel>Total Days:</StatLabel>
                <StatValue>{stats.stats.total_days}</StatValue>
              </StatItem>
              <StatItem>
                <StatLabel>Present:</StatLabel>
                <StatValue>
                  {stats.stats.ontime + stats.stats.late} days
                </StatValue>
              </StatItem>
              <StatItem>
                <StatLabel>On Time:</StatLabel>
                <StatValue>
                  {stats.stats.ontime} days ({stats.percentages.ontime}%)
                </StatValue>
              </StatItem>
              <StatItem>
                <StatLabel>Late:</StatLabel>
                <StatValue>
                  {stats.stats.late} days ({stats.percentages.late}%)
                </StatValue>
              </StatItem>
              <StatItem>
                <StatLabel>Absent:</StatLabel>
                <StatValue>
                  {stats.stats.absent} days ({stats.percentages.absent}%)
                </StatValue>
              </StatItem>
            </StatsDetails>
          )}
        </StatsInfo>

        {stats && (
          <PieChartWrapper>
            <PieChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value} days`, 'Count']}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </PieChartContainer>
          </PieChartWrapper>
        )}
      </SummaryContainer>

      <AttendanceContainer>
        <h3>Attendance Records</h3>
        {attendanceRecords.length > 0 ? (
          <AttendanceTable>
            <thead>
              <tr>
                <TableHeader>Date</TableHeader>
                <TableHeader>Scheduled Time</TableHeader>
                <TableHeader>Check In Time</TableHeader>
                <TableHeader>Check Out Time</TableHeader>
                <TableHeader>Status</TableHeader>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((record, index) => (
                <tr key={index}>
                  <TableCell>{record.date || "N/A"}</TableCell>
                  <TableCell>{record.scheduledTime || "N/A"}</TableCell>
                  <TableCell>{record.checkInTime || "N/A"}</TableCell>
                  <TableCell>{record.checkOutTime || "N/A"}</TableCell>
                  <TableCell>
                    <StatusBadge status={record.status.toLowerCase().replace(' ', '-')}>
                      {record.status || "N/A"}
                    </StatusBadge>
                  </TableCell>
                </tr>
              ))}
            </tbody>
          </AttendanceTable>
        ) : (
          <p>No attendance records found.</p>
        )}
      </AttendanceContainer>
    </ViewAttendanceContainer>
  );
};

export default ViewAttendance;