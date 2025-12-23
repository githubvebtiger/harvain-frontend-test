import React from 'react';
import Navigation from './components/Navigation';
import { ModalProvider } from './provider/ModalContext';
import { useTheme } from './provider/ThemeProvider';
import { AuthProvider } from './provider/AuthProvider';
import { ToastProvider, ToastInitializer } from './components/Toast';

function App() {
  const {theme} = useTheme()
  return (
    <div className={theme}>
      <ToastProvider>
        <ToastInitializer />
        <AuthProvider>
          <ModalProvider>
            <Navigation/>
          </ModalProvider>
        </AuthProvider>
      </ToastProvider>
    </div>
  );
}

export default App;
