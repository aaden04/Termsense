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
        <h1>Termsense</h1>
        
        {!user && (
          <div className="auth-buttons">
            <button 
              onClick={() => setCurrentView('login')}
              className={currentView === 'login' ? 'active' : ''}
            >
              Login
            </button>
            <button 
              onClick={() => setCurrentView('signup')}
              className={currentView === 'signup' ? 'active' : ''}
            >
              Signup
            </button>
          </div>
        )}

        {currentView === 'login' && !user && (
          <Login onLoginSuccess={handleLoginSuccess} />
        )}
        
        {currentView === 'signup' && !user && (
          <Signup onSignupSuccess={() => setCurrentView('login')} />
        )}
        
        {user && (
          <Dashboard user={user} onLogout={handleLogout} />
        )}
      </header>
    </div>
  );
}

export default App;