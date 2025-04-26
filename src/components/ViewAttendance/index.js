// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
// import "./ViewAttendance.css";
// import Card from '../Card';

// const COLORS = ['#4CAF50', '#FFC107', '#F44336']; // Green, Yellow, Red

// const ViewAttendance = () => {
//   const [attendanceRecords, setAttendanceRecords] = useState([]);
//   const [stats, setStats] = useState(null);
//   const [error, setError] = useState("");
//   const [totalEntries, setTotalEntries] = useState(0); // New state for total number of entries
//   const navigate = useNavigate();


//   useEffect(() => {
//     // Retrieve username and password from localStorage
//     const storedUsername = localStorage.getItem("username");
//     const storedPassword = localStorage.getItem("password");

//     // Check if both are available, else redirect to login
//     if (!storedUsername || !storedPassword) {
//       setError("Please login first");
//       navigate("/login");
//     } else {
//       // Fetch attendance data if credentials are available
//       handleViewAttendance(storedUsername, storedPassword);
//       fetchAttendanceStats(storedUsername, storedPassword);

//     }
//   }, [navigate]);

//   // Function to fetch attendance records
//   const handleViewAttendance = async (username, password) => {
//     try {
//       const data = { username, password };
//       const response = await axios.post("http://localhost:5000/api/view-attendance", data);
  
//       if (response.status === 500 || response.status === 200) {
//         const attendance = response.data.attendance || [];
//         console.log("Attendance Data:", attendance); // Debugging log
//         setAttendanceRecords(attendance);
//         setTotalEntries(attendance.length);
//       } else {
//         setError(response.data.error || "No attendance records found.");
//       }
//     } catch (err) {
//       console.error("Error fetching attendance:", err);
//       setError("Error fetching attendance. Check console for details.");
//     }
//   };
  
//   const fetchAttendanceStats = async (username, password) => {
//     try {
//       const response = await axios.post("http://localhost:5000/api/attendance-stats", {
//         username,
//         password
//       });
//       if (response.data?.stats) {
//         setStats(response.data);
//       }
//     } catch (err) {
//       console.error("Error fetching stats:", err);
//     }
//   };
//   // Prepare data for pie chart
//   const pieData = stats ? [
//     { name: 'On Time', value: stats.stats.ontime },
//     { name: 'Late', value: stats.stats.late },
//     { name: 'Absent', value: stats.stats.absent }
//   ] : [];


//   return (
//     <div className="dashboard">
//       <h2>Attendance Dashboard</h2>

//       {error && <p className="error">{error}</p>}

//       {stats && (
//         <div className="chart-section">
//           <div className="pie-chart-container">
//             <ResponsiveContainer width="100%" height={400}>
//               <PieChart>
//                 <Pie
//                   data={pieData}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={false}
//                   outerRadius={150}
//                   fill="#8884d8"
//                   dataKey="value"
//                   label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                 >
//                   {pieData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip 
//                   formatter={(value, name, props) => [
//                     `${value} days`, 
//                     `${name} (${stats.percentages[name.toLowerCase().replace(' ', '')]}%)`
//                   ]}
//                 />
//                 <Legend />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       )}

//       <div className="attendance-container">
//         <h3>Attendance Records</h3>
//         {attendanceRecords.length > 0 && <p>Total Entries: {totalEntries}</p>}

//         {attendanceRecords.length > 0 ? (
//           <table className="attendance-table">
//             <thead>
//               <tr>
//                 <th>Date</th>
//                 <th>Scheduled Time</th>
//                 <th>Check In Time</th>
//                 <th>Check Out Time</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {attendanceRecords.map((record, index) => (
//                 <tr key={index}>
//                   <td>{record.date || "N/A"}</td>
//                   <td>{record.scheduledTime || "N/A"}</td>
//                   <td>{record.checkInTime || "N/A"}</td>
//                   <td>{record.checkOutTime || "N/A"}</td>
//                   <td>
//                     <span className={`status-badge ${record.status.toLowerCase().replace(' ', '-')}`}>
//                       {record.status || "N/A"}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <p>No attendance records found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ViewAttendance;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
// import "./ViewAttendance.css";
// import Card from '../Card';
// import { 
//   ViewAttendanceContainer,
//   SummaryContainer,
//   StatsInfo,
//   StatsDetails,
//   StatItem,
//   StatLabel,
//   StatValue,
//   PieChartWrapper,
//   PieChartContainer,
//   AttendanceContainer,
//   AttendanceTable,
//   TableHeader,
//   TableCell,
//   StatusBadge,
//   ErrorMessage,
//   LoadingMessage
// } from "./style"; 

// const COLORS = ['#4CAF50', '#FFC107', '#F44336']; // Green, Yellow, Red

// const ViewAttendance = () => {
//   const [attendanceRecords, setAttendanceRecords] = useState([]);
//   const [stats, setStats] = useState(null);
//   const [error, setError] = useState("");
//   const [totalEntries, setTotalEntries] = useState(0);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedUsername = localStorage.getItem("username");
//     const storedPassword = localStorage.getItem("password");

//     if (!storedUsername || !storedPassword) {
//       setError("Please login first");
//       navigate("/login");
//     } else {
//       handleViewAttendance(storedUsername, storedPassword);
//       fetchAttendanceStats(storedUsername, storedPassword);
//     }
//   }, [navigate]);

//   const handleViewAttendance = async (username, password) => {
//     try {
//       const data = { username, password };
//       const response = await axios.post("http://localhost:5000/api/view-attendance", data);
  
//       if (response.status === 500 || response.status === 200) {
//         const attendance = response.data.attendance || [];
//         setAttendanceRecords(attendance);
//         setTotalEntries(attendance.length);
//       } else {
//         setError(response.data.error || "No attendance records found.");
//       }
//     } catch (err) {
//       console.error("Error fetching attendance:", err);
//       setError("Error fetching attendance. Check console for details.");
//     }
//   };
  
//   const fetchAttendanceStats = async (username, password) => {
//     try {
//       const response = await axios.post("http://localhost:5000/api/attendance-stats", {
//         username,
//         password
//       });
//       if (response.data?.stats) {
//         setStats(response.data);
//       }
//     } catch (err) {
//       console.error("Error fetching stats:", err);
//     }
//   };

//   const pieData = stats ? [
//     { name: 'On Time', value: stats.stats.ontime },
//     { name: 'Late', value: stats.stats.late },
//     { name: 'Absent', value: stats.stats.absent }
//   ] : [];

  

//   return (
//     <div className="dashboard">
//       <h2>Attendance Dashboard</h2>

//       {error && <p className="error">{error}</p>}

//       {/* Summary Section with Border */}
//       <div className="summary-container">
//         {/* Left Side - Statistics */}
//         <div className="stats-info">
//           <h3>Attendance Summary</h3>
//           {stats && (
//             <div className="stats-details">
//               <div className="stat-item">
//                 <span className="stat-label">Total Days:</span>
//                 <span className="stat-value">{stats.stats.total_days}</span>
//               </div>
//               <div className="stat-item">
//                 <span className="stat-label">Present:</span>
//                 <span className="stat-value">
//                   {stats.stats.ontime + stats.stats.late} days
//                 </span>
//               </div>
//               <div className="stat-item">
//                 <span className="stat-label">On Time:</span>
//                 <span className="stat-value">
//                   {stats.stats.ontime} days ({stats.percentages.ontime}%)
//                 </span>
//               </div>
//               <div className="stat-item">
//                 <span className="stat-label">Late:</span>
//                 <span className="stat-value">
//                   {stats.stats.late} days ({stats.percentages.late}%)
//                 </span>
//               </div>
//               <div className="stat-item">
//                 <span className="stat-label">Absent:</span>
//                 <span className="stat-value">
//                   {stats.stats.absent} days ({stats.percentages.absent}%)
//                 </span>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Right Side - Pie Chart (smaller size) */}
//         {stats && (
//           <div className="pie-chart-wrapper">
//             <div className="pie-chart-container">
//               <ResponsiveContainer width="100%" height={300}>
//                 <PieChart>
//                   <Pie
//                     data={pieData}
//                     cx="50%"
//                     cy="50%"
//                     labelLine={false}
//                     outerRadius={100}  
//                     fill="#8884d8"
//                     dataKey="value"
//                     label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                   >
//                     {pieData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip 
//                     formatter={(value, name, props) => [
//                       `${value} days`, 
//                       `${name} (${stats.percentages[name.toLowerCase().replace(' ', '')]}%)`
//                     ]}
//                   />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Attendance Records Table */}
//       <div className="attendance-container">
//         <h3>Attendance Records</h3>
//         {attendanceRecords.length > 0 && <p>Total Entries: {totalEntries}</p>}

//         {attendanceRecords.length > 0 ? (
//           <table className="attendance-table">
//             <thead>
//               <tr>
//                 <th>Date</th>
//                 <th>Scheduled Time</th>
//                 <th>Check In Time</th>
//                 <th>Check Out Time</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {attendanceRecords.map((record, index) => (
//                 <tr key={index}>
//                   <td>{record.date || "N/A"}</td>
//                   <td>{record.scheduledTime || "N/A"}</td>
//                   <td>{record.checkInTime || "N/A"}</td>
//                   <td>{record.checkOutTime || "N/A"}</td>
//                   <td>
//                     <span className={`status-badge ${record.status.toLowerCase().replace(' ', '-')}`}>
//                       {record.status || "N/A"}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <p>No attendance records found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ViewAttendance;



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
} from "./style"; // Update the path as needed

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