import React, { useState } from 'react';
import GameList from './GameList';
import AuthPanel from './AuthPanel';
import './App.css';

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState<string | null>(null); // State to track username

    const handleLogin = (loggedInUsername: string) => {
        setIsAuthenticated(true);
        setUsername(loggedInUsername); // Store the logged-in username
    };

    return (
        <div>
            {!isAuthenticated ? (
                <AuthPanel onLogin={handleLogin} />
            ) : (
                <>
                    <header className="app-header">
                        <div className="user-info"> {username}</div>
                    </header>
                    <GameList />
                </>
            )}
        </div>
    );
};

export default App;
