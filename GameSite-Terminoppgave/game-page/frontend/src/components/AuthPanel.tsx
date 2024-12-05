import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Snackbar, Alert, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material'; // Import icons
import axios from 'axios';

const AuthPanel: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://10.2.3.46:5000/api/login', {
                email,
                password,
            });
            if (response.status === 200) {
                onLogin(); // Call onLogin prop to update authentication state
            }
        } catch (error) {
            setError('Invalid credentials. Please try again.');
            setOpenSnackbar(true); // Show error message in Snackbar
        }
    };

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://10.2.3.46:5000/api/register', {
                username,
                email,
                password,
            });
            if (response.status === 201) {
                setIsRegistering(false); // Switch to login after registration
            }
        } catch (error) {
            setError('Registration failed. Please try again.');
            setOpenSnackbar(true); // Show error message in Snackbar
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
                    {error && <Typography color="error">{error}</Typography>}
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
                                type={showPassword ? 'text' : 'password'} // Toggle between text and password
                                variant="outlined"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    endAdornment: (
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)} // Toggle visibility
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    ),
                                }}
                            />
                            <Button variant="contained" color="primary" onClick={handleRegister} fullWidth sx={{ mt: 2 }}>
                                Register
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
                                type={showPassword ? 'text' : 'password'} // Toggle between text and password
                                variant="outlined"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    endAdornment: (
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)} // Toggle visibility
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    ),
                                }}
                            />
                            <Button variant="contained" color="primary" onClick={handleLogin} fullWidth sx={{ mt: 2 }}>
                                Login
                            </Button>
                            <Button onClick={() => setIsRegistering(true)} fullWidth sx={{ mt: 1 }}>
                                Don't have an account? Register
                            </Button>
                        </>
                    )}
                </Box>
            </Box>

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default AuthPanel;
