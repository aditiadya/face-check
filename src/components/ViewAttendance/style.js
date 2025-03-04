import styled from "styled-components";

export const StyledAttendanceTable = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

  h2 {
    text-align: center;
    font-size: 1.8rem;
    color: #333;
    margin-bottom: 1rem;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    overflow: hidden;
    border-radius: 8px;
  }

  th, td {
    padding: 12px;
    text-align: left;
    font-size: 1rem;
    border: 1px solid #ddd;
  }

  th {
    background-color: #4a90e2;
    color: #fff;
    font-weight: bold;
  }

  tr {
    border-bottom: 1px solid #ddd;
  }

  tr:hover {
    background-color: #f1f1f1;
  }

  td {
    color: #555;
  }

  .absent td {
    color: #e74c3c;
    font-weight: bold;
  }
`;
