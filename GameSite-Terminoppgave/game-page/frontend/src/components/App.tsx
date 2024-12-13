import React, { useState } from 'react';
import GameList from './GameList';
import AuthPanel from './AuthPanel';
import { Button, AppBar, Toolbar, Typography, createTheme, ThemeProvider } from '@mui/material'; // Import Material-UI components
import './App.css';

// Define a custom theme using the specified colors
const theme = createTheme({
    palette: {
        primary: {
            main: '#031716', // Main primary color
        },
        secondary: {
            main: '#0C969C', // Secondary color for buttons and highlights
        },
        success: {
            main: '#27AD60', // Success color
        },
        background: {
            default: '#f4f4f4', // Background color
        },
        text: {
            primary: '#0A7075', // Main text color
            secondary: '#6BA3BE', // Secondary text color
        },
    },
});

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState<string | null>(null); // State to track username

    const handleLogin = (loggedInUsername: string) => {
        setIsAuthenticated(true);
        setUsername(loggedInUsername); // Store the logged-in username
    };

    return (
        <ThemeProvider theme={theme}>
            <div>
                {!isAuthenticated ? (
                    <AuthPanel onLogin={handleLogin} />
                ) : (
                    <>
                        <AppBar position="static">
                            <Toolbar>
                                <Typography variant="h6" style={{ flexGrow: 1 }}>
                                    Welcome, {username}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => {
                                        setIsAuthenticated(false);
                                        setUsername(null);
                                    }}
                                    style={{ marginLeft: '16px' }}
                                >
                                    Logout
                                </Button>
                            </Toolbar>
                        </AppBar>
                        <GameList username={username} /> {/* Pass username to GameList */}
                    </>
                )}
            </div>
        </ThemeProvider>
    );
};

export default App;
