import React, { useState } from 'react';
import { Button, TextField, Container, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically validate the credentials and perform the login
        console.log('Login', { username, password });
        history.push('/dashboard'); // Redirect to dashboard or another page after successful login
    };

    // Define the style for the background image
    const backgroundStyle = {
        backgroundImage: "url('school-bg/happyTeache.jpg')", // Replace '/path/to/your/image.jpg' with the actual path to your image
        height: "100vh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
    };

    return (
        <div style={backgroundStyle}>
            <Container maxWidth="sm" className='loginModal'>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Box
                        sx={{
                            width: '100%',
                            bgcolor: 'background.paper',
                            boxShadow: 4,
                            my: 15,
                            p: 4,
                            borderRadius: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <div className="text-center text-2xl font-bold py-4 roboto-font-h1">
                            <span className="letter">R</span>
                            <span className="letter">E</span>
                            <span className="letter">G</span>
                            <span className="letter">I</span>
                            <span className="letter">S</span>
                            <span className="letter">T</span>
                            <span className="letter">E</span>
                            <span className="letter">R</span>
                        </div>
                        <Box component="form" onSubmit={handleLogin}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="submit"
                                className='signInBtn w-full h-10 mt-6'
                            >
                                SIGN UP
                            </button>
                            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                            Have already an account ? <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>Login now</a>
                        </Typography>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </div>
    );
};

export default Login;
