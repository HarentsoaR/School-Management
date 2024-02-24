import React, { useState } from 'react';
import { TextField, Container, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { Toast } from '../components/Toast';
import axios from 'axios';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission

        try {
            // Make a POST request to /auth/login with username and password
            await axios.post('http://localhost:8080/auth/signup', {
                username: username,
                password: password
            })
            // Redirect to teacher or another page after successful login
            Toast.fire({
                icon: "success",
                title: "Register complete !" // Include the sub value in the title
            });
            history('/');
        } catch (error) {
            Toast.fire({
                icon: "error",
                title: "Incorrect username or password !"
            })
            console.error('Signup failed:', error);
            history('/signup');
            Toast.fire({
                icon: "error",
                title: "Error, please check your information!" // Include the sub value in the title
            });
            
            // Handle login failure, e.g., show an error message
        }
    };

    // Define the style for the background image
    const backgroundStyle = {
        backgroundImage: "url('school-bg/teacherDay.jpg')", // Replace '/path/to/your/image.jpg' with the actual path to your image
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
