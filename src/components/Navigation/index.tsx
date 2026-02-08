import React from 'react';
import './styles.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routesConfig } from './const';
import ProtectedRoute from './ProtectedRoute';
import { useAuth } from '../../provider/AuthProvider';

type Props = {
  children?: React.ReactNode;
};


export default function Navigation(props: Props) {
  const {isAuthenticated} = useAuth();


  return (
    <BrowserRouter>
      {props.children}
      <Routes>
        {routesConfig.map(route => (
          route.isProtected ? (
            <Route
              key={route.path}
              path={route.path}
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <route.component/>
                </ProtectedRoute>
              }
            />
          ) : (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component/>}
            />
          )
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export { ROUTES } from './const';
