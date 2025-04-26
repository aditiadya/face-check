import styled from "styled-components";

// Main container
export const ViewAttendanceContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

// Summary container with border
export const SummaryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 30px;
  border: 1px solidrgb(184, 193, 236);
  width: 900px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

// Stats info section (left side)
export const StatsInfo = styled.div`
  flex: 1;
  padding-right: 20px;
  
  @media (max-width: 768px) {
    padding-right: 0;
    margin-bottom: 20px;
    width: 100%;
  }
`;

// Stats details
export const StatsDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top:25px;
`;

// Individual stat item
export const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  background:rgb(236, 245, 255);
  border-radius: 6px;
  width: 90%
`;

// Stat labels and values
export const StatLabel = styled.span`
  font-weight: bold;
  color: #495057;
`;

export const StatValue = styled.span`
  color: #212529;
`;

// Pie chart wrapper (right side)
export const PieChartWrapper = styled.div`
  flex: 1;
  max-width: 400px;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
  }
`;

// Pie chart container
export const PieChartContainer = styled.div`
  width: 100%;
  height: 300px;
`;

// Attendance records section
export const AttendanceContainer = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

// Attendance table
export const AttendanceTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
`;

// Table headers and cells
export const TableHeader = styled.th`
  padding: 12px 15px;
  text-align: center;
  border-bottom: 1px solid #e0e0e0;
  background-color:rgb(236, 245, 255);
  font-weight: 600;
`;

export const TableCell = styled.td`
  padding: 12px 15px;
  text-align: center;
  border-bottom: 1px solid #e0e0e0;
`;

// Status badges
export const StatusBadge = styled.span`
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.8em;
  font-weight: 500;
  text-transform: capitalize;
  background-color: ${props => {
    switch(props.status) {
      case 'ontime': return '#e8f5e9';
      case 'late': return '#fff8e1';
      case 'absent': return '#ffebee';
      default: return '#cce5ff';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'ontime': return '#2e7d32';
      case 'late': return '#ff8f00';
      case 'absent': return '#c62828';
      default: return '#004085';
    }
  }};
`;

// Error message
export const ErrorMessage = styled.div`
  color: #d32f2f;
  background-color: #fde8e8;
  padding: 10px;
  border-radius: 4px;
  margin: 10px 0;
`;

// Loading message
export const LoadingMessage = styled.div`
  text-align: center;
  padding: 50px;
  font-size: 1.2em;
`;