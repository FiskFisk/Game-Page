import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Snackbar, Alert, IconButton, CircularProgress } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';

const AuthPanel: React.FC<{ onLogin: (username: string) => void }> = ({ onLogin }) => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false); // Loading state

    const handleLogin = async () => {
        setLoading(true); // Set loading to true
        try {
            const response = await axios.post('http://10.2.3.46:5000/api/login', {
                email,
                password,
            }, { withCredentials: true }); // Include withCredentials
            if (response.status === 200) {
                const { username } = response.data; // Expect username from server response
                onLogin(username); // Pass the username to App
            }
        } catch (err) {
            setError('Invalid credentials. Please try again.');
            setOpenSnackbar(true);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    const handleRegister = async () => {
        setLoading(true); // Set loading to true
        try {
            const response = await axios.post('http://10.2.3.46:5000/api/register', {
                username,
                email,
                password,
            }, { withCredentials: true }); // Include withCredentials
            if (response.status === 201) {
                setIsRegistering(false); // Switch back to login
                setError('Registration successful! Please log in.');
                setOpenSnackbar(true);
            }
        } catch (err) {
            setError('Registration failed. Please check your details and try again.');
            setOpenSnackbar(true);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 8 }}>
                <Typography component="h1" variant="h5">
                    {isRegistering ? 'Register' : 'Login'}
                </Typography>
                <Box sx={{ mt: 1 }}>
                    {isRegistering ? (
                        <>
                            <TextField
                                label="Username"
                                variant="outlined"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Email"
                                type="email"
                                variant="outlined"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                variant="outlined"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    endAdornment: (
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    ),
                                }}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleRegister}
                                fullWidth
                                sx={{ mt: 2 }}
                                disabled={loading} // Disable button while loading
                            >
                                {loading ? <CircularProgress size={24} /> : 'Register'}
                            </Button>
                            <Button onClick={() => setIsRegistering(false)} fullWidth sx={{ mt: 1 }}>
                                Already have an account? Login
                            </Button>
                        </>
                    ) : (
                        <>
                            <TextField
                                label="Email"
                                type="email"
                                variant="outlined"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                variant="outlined"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    endAdornment: (
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    ),
                                }}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleLogin}
                                fullWidth
                                sx={{ mt: 2 }}
                                disabled={loading} // Disable button while loading
                            >
                                {loading ? <CircularProgress size={24} /> : 'Login'}
                            </Button>
                            <Button onClick={() => setIsRegistering(true)} fullWidth sx={{ mt: 1 }}>
                                Don't have an account? Register
                            </Button>
                        </>
                    )}
                </Box>
            </Box>

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={error.includes('successful') ? 'success' : 'error'} sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default AuthPanel;
