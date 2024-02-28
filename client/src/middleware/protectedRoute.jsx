import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ redirectTo, component: Component, ...rest}) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkIsAdmin = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/isAdmin`,
          {
            credentials: "include",
          },
        );
        const data = await response.json();
        setIsAdmin(data.isAdmin);
        setIsLoading(false);
      } catch (error) {
        console.error("Error al obtener el estado de isAdmin", error);
        setIsLoading(false);
      }
    };

    checkIsAdmin();
  }, []);

  if (isLoading) {
    return <img src="/assets/loading.gif" alt="cargando" />;
  } else if (isAdmin) {
    return <Component {...rest} />;
  } else {
    console.log("Redirecting")
    return <Navigate to={redirectTo} />;
  }
};

export default ProtectedRoute;
