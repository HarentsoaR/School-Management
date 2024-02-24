import React, { useEffect, useState } from 'react';
import { TextField, Container, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './login.css';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Toast } from '../components/Toast';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission

        try {
            // Make a POST request to /auth/login with username and password
            const response = await axios.post('http://localhost:8080/auth/login', {
                username: username,
                password: password
            });

            // Assuming the response contains a token in the response body
            const token = response.data;
            console.log('Token:', token);


            const decoded = jwtDecode(token);
            console.log('DECODED:', decoded);

            const expirationDate = new Date(decoded.exp * 1000);
            const givenDate = new Date(decoded.iat * 1000);
            console.log('GIV:', givenDate);
            console.log('EXP:', expirationDate);
            // You can now use the token for subsequent requests or save it in local storage
            // For example, to save it in local storage:
            localStorage.setItem('token', token);
            const sub = decoded.sub;
            Toast.fire({
                icon: "success",
                title: `Welcome ${sub}!` // Include the sub value in the title
            });
            // Redirect to teacher or another page after successful login
            history('/teacher');
        } catch (error) {
            Toast.fire({
                icon: "error",
                title: "Incorrect username or password !"
            })
            console.error('Login failed:', error);
            // Handle login failure, e.g., show an error message
        }
    };

    useEffect(() => {
        setUsername('');
        setPassword('');
    }, []);


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
                            <span className="letter">L</span>
                            <span className="letter">O</span>
                            <span className="letter">G</span>
                            <span className="letter">I</span>
                            <span className="letter">N</span>
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
                                SIGN IN
                            </button>
                        </Box>
                        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                            Don't have an account ? <a href="/signup" style={{ textDecoration: 'none', color: 'inherit' }}>Register now</a>
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </div>
    );
};

export default Login;
