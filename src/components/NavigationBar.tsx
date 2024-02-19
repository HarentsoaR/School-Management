
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faDashboard, faHome, faUser } from '@fortawesome/free-solid-svg-icons';

const NavigationBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar position="static">
      <Toolbar>
        {isMobile ? (
          // Mobile view: hamburger menu or mobile-specific navigation
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            School Management
          </Typography>
        ) : (
          // Desktop view: full navigation  
          <>
            <Button color="inherit" href="/home"><FontAwesomeIcon icon={faDashboard} className='mr-2' />Dashboard</Button>
            <Button color="inherit" href="/teacher"><FontAwesomeIcon icon={faUser} className='mr-2' />Teacher</Button>
            <Button color="inherit" href="/room"><FontAwesomeIcon icon={faHome} className='mr-2' />Room</Button>
            <Button color="inherit" href="/reservation"><FontAwesomeIcon icon={faCalendar} className='mr-2' />Reservation</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
