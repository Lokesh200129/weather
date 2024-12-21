// src/components/PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = (props) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { Component } = props;
  return (
    <div>
      {isAuthenticated ? <Component /> : <Navigate to="/"  />}

    </div>
  );
};

export default PrivateRoute;