// src/App.tsx
import React from 'react';
import GameList from './GameList';
import './App.css';  // Import the CSS file

const App: React.FC = () => {
    return (
        <div>
            <GameList />
        </div>
    );
};

export default App;
