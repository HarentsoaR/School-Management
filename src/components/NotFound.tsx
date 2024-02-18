import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const NotFound: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
        }}
      >
        <Typography variant="body1">
          We're sorry, but the page you were looking for doesn't exist.
        </Typography>
        {/* Add the image from the public folder */}
        <img src="/robot404.jpg" alt="404 Robot" />
      </Box>
    </Container>
  );
};

export default NotFound;
