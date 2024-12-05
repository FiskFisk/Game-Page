// src/AuthPanel.tsx (Modified to include email for login)
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography } from '@mui/material';

const AuthPanel: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState(''); // Added email state
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isRegistering, setIsRegistering] = useState(true);

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://10.2.3.46:5000/api/register', {
                username,
                email,
                password,
            });
            setMessage(response.data.message);
            setUsername('');
            setEmail('');
            setPassword('');
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response) {
                setMessage(error.response.data.message || 'Registration failed!');
            } else {
                setMessage('Registration failed!');
            }
        }
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://10.2.3.46:5000/api/login', {
                username,
                password,
            });
            setMessage(response.data.message);
            setUsername('');
            setPassword('');
            // Redirect to the games page or fetch user info if needed
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response) {
                setMessage(error.response.data.message || 'Login failed!');
            } else {
                setMessage('Login failed!');
            }
        }
    };

    const toggleRegisterLogin = () => {
        setIsRegistering(!isRegistering);
        setMessage('');
        setUsername('');
        setEmail(''); // Clear email if switching to login
        setPassword('');
    };

    return (
        <div>
            <Typography variant="h4">{isRegistering ? 'Register' : 'Login'}</Typography>
            {message && <div>{message}</div>}
            {isRegistering && (
                <TextField
                    label="Username"
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth
                    margin="normal"
                />
            )}
            {isRegistering && (
                <TextField
                    label="Email"
                    variant="outlined"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    margin="normal"
                />
            )}
            {!isRegistering && ( // Show email field only in registration
                <TextField
                    label="Email"
                    variant="outlined"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    margin="normal"
                />
            )}
            <TextField
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                margin="normal"
            />
            {isRegistering ? (
                <Button variant="contained" color="primary" onClick={handleRegister}>
                    Register
                </Button>
            ) : (
                <Button variant="contained" color="primary" onClick={handleLogin}>
                    Login
                </Button>
            )}
            <Button onClick={toggleRegisterLogin}>
                {isRegistering ? 'Already have an account? Login' : 'Don\'t have an account? Register'}
            </Button>
        </div>
    );
};

export default AuthPanel;
