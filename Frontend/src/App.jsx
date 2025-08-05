import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';

function App() {
  const [currentView, setCurrentView] = useState('login');
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('login');
  };

  return (
    <div className="App">
      <header className="App-header">
        {currentView === 'login' && !user && (
          <Login onLoginSuccess={handleLoginSuccess} onSwitchToSignup={() => setCurrentView('signup')} />
        )}
        
        {currentView === 'signup' && !user && (
          <Signup onSignupSuccess={() => setCurrentView('login')} onSwitchToLogin={() => setCurrentView('login')} />
        )}
        
        {user && (
          <Dashboard user={user} onLogout={handleLogout} />
        )}
      </header>
    </div>
  );
}

export default App;