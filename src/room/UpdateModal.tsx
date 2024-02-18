import { Modal, Box, Typography, TextField, IconButton, InputAdornment } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListNumeric, faPrescription, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

const UpdateModal = ({ open, handleClose, handleUpdateSubmit, classroomData }) => {
  const [codesalle, setCodesalle] = useState('');
  const [designation, setDesignation] = useState('');
  const [classroomId, setClassroomId] = useState('');

  useEffect(() => {
    if (classroomData) {
      setCodesalle(classroomData.codesalle);
      setDesignation(classroomData.designation);
      setClassroomId(classroomData.id);
    }
  }, [classroomData]);
  

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Call the handleSubmit prop with the form values
    handleUpdateSubmit({ codesalle, designation, id: classroomId });
    // Reset the form fields
    setCodesalle('');
    setDesignation('');
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
          width:   400,
          bgcolor: 'background.paper',
          boxShadow:   24,
          p:   4,
        }}
      >
        <Typography
          id="modal-title"
          variant="h6"
          component="h2"
          sx={{ mb:   2, fontWeight: 'bold', color: 'blueviolet'}}
        >
          UPDATE
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right:   8,
            top:   8,
            color: 'text.secondary',
          }}
        >
          <FontAwesomeIcon icon={faTimes} />
        </IconButton>
        <form onSubmit={handleFormSubmit}>
          <TextField
            fullWidth
            label="Classroom Number"
            variant="outlined"
            required
            sx={{ mb:   2 }}
            value={codesalle}
            onChange={(e) => setCodesalle(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FontAwesomeIcon icon={faListNumeric} className='mr-1.5' />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Designation"
            variant="outlined"
            required
            sx={{ mb:   2 }}
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FontAwesomeIcon icon={faPrescription} className='mr-1.5' />
                </InputAdornment>
              ),
            }}
          />
          <input type="hidden" value={classroomId} /> {/* Hidden input for the teacher ID */}
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

export default UpdateModal;
