import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute2 = ({ children }) => {
  const [isIpAllowed, setIsIpAllowed] = useState(null); // State to hold IP status

  useEffect(() => {
    const checkIp = async () => {
        try {
            const response = await fetch("http://localhost:3003/check-ip", {
                method: "GET",
            });

            const result = await response.json();
            console.log("IP Check Result:", result); // Debugging line

            if (response.ok && result.success) {
                setIsIpAllowed(true); // IP is allowed
            } else {
                setIsIpAllowed(false); // IP is not allowed
            }
        } catch (error) {
            console.error("IP check failed", error);
            setIsIpAllowed(false); // Assume IP not allowed if error occurs
        }
    };

    checkIp();
}, []);


  if (isIpAllowed === null) {
    return <div>Loading...</div>; // You can show a loading state while checking
  }

  if (!isIpAllowed) {
    return <Navigate to="/access-denied" />;
  }

  return children;
};

export default ProtectedRoute2;
