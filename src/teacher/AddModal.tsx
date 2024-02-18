
import { Modal, Box, Typography, TextField, IconButton, InputAdornment } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Person, Star, Code } from '@mui/icons-material';
import { useState } from 'react';

const AddModal = ({ open, handleClose, handleSubmit }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [grade, setGrade] = useState('');
  const [teacherNumber, setTeacherNumber] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Call the handleSubmit prop with the form values
    handleSubmit({ firstName, lastName, grade, teacherNumber });
    // Reset the form fields
    setFirstName('');
    setLastName('');
    setGrade('');
    setTeacherNumber('');
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        className="border-4 border-indigo-100"
        sx={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width:  400,
          bgcolor: 'background.paper',
          boxShadow:  24,
          p:  4,
        }}
      >
        <Typography
          id="modal-title"
          variant="h6"
          component="h2"
          sx={{ mb:  2, fontWeight: 'bold' }}
        >
          Add New Teacher
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right:  8,
            top:  8,
            color: 'text.secondary',
          }}
        >
          <FontAwesomeIcon icon={faTimes} />
        </IconButton>
        <form onSubmit={handleFormSubmit}>
          <TextField
            fullWidth
            label="First Name"
            variant="outlined"
            required
            sx={{ mb:  2 }}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Last Name"
            variant="outlined"
            required
            sx={{ mb:  2 }}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Grade"
            variant="outlined"
            required
            sx={{ mb:  2 }}
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Star />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Teacher Number"
            variant="outlined"
            required
            sx={{ mb:  2 }}
            value={teacherNumber}
            onChange={(e) => setTeacherNumber(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Code />
                </InputAdornment>
              ),
            }}
          />
          <div className='mt-3 d-grid gap-2 mx-auto'>
            <button type="submit" className='insertBtn'>
              S U B M I T   
            </button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default AddModal;
