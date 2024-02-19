import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem, Select, InputLabel, FormControl, Box } from '@mui/material';

const UpdateModal = ({ open, handleClose, handleUpdate, reservation }) => {
  const formatDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() +   1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  };

  const [teachers, setTeachers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [dateTime, setDateTime] = useState(reservation ? reservation.date : formatDateTime());
  const [selectedTeacher, setSelectedTeacher] = useState(reservation ? reservation.teacher : '');
  const [selectedRoom, setSelectedRoom] = useState(reservation ? reservation.room : '');
  const [reservationId, setReservationId] = useState('');
  useEffect(() => {
    if (open) {
      const fetchTeachers = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/teachers/list');
          setTeachers(response.data);
        } catch (error) {
          console.error('Error fetching teachers:', error);
        }
      };

      const fetchRooms = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/room/list');
          setRooms(response.data);
        } catch (error) {
          console.error('Error fetching rooms:', error);
        }
      };

      fetchTeachers();
      fetchRooms();
    }
  }, [open]);

  const handleUpdateClick = () => {
    const updatedReservation = {
      // id: reservationId,
      teacher: `${selectedTeacher}`,
      room: `${selectedRoom}`,
      date: dateTime,
    };
    handleUpdate(updatedReservation)
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Update Reservation</DialogTitle>
      <DialogContent>
        <Box sx={{ mb:   2 }}>
          <TextField
            fullWidth
            label="Date and Time"
            type="datetime-local"
            defaultValue={dateTime}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setDateTime(e.target.value)}
          />
        </Box>
        <Box sx={{ mb:   2 }}>
          <InputLabel>Teacher</InputLabel>
          <FormControl fullWidth>
            <Select
              value={selectedTeacher}
              onChange={(e) => setSelectedTeacher(e.target.value)}
            >
              {teachers.map((teacher) => (
                <MenuItem key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ mb:   2 }}>
          <InputLabel>Room</InputLabel>
          <FormControl fullWidth>
            <Select
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
            >
              {rooms.map((room) => (
                <MenuItem key={room.id} value={room.id}>
                  {room.codesalle}
                </MenuItem>
              ))}
            </Select>
            <input type="hidden" value={reservationId} /> {/* Hidden input for the teacher ID */}
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined" color="secondary">Cancel</Button>
        <Button onClick={handleUpdateClick} variant="contained" color="primary">Update</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateModal;
