import React from "react";
import { useRouteError } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  console.log(err);
  return (
    <div className="error-page">
      <h1>404</h1>
      <p>Page not found</p>
      <p>{err.statusText}</p>
    </div>
  );
};
export default Error;
