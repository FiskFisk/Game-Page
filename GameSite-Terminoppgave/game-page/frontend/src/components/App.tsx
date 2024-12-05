// src/components/App.tsx
import React, { useState } from 'react';
import GameList from './GameList';
import AuthPanel from './AuthPanel';
import './App.css';

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    return (
        <div>
            {!isAuthenticated ? (
                <AuthPanel onLogin={handleLogin} />
            ) : (
                <GameList />
            )}
        </div>
    );
};

export default App;
