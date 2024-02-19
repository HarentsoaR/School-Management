import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TableContainer, Grid, Button, TextField, InputAdornment, Table, TableHead, TableRow, TableCell, TableBody, Container } from '@mui/material';
import NavigationBar from '../components/NavigationBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faPlus, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import SearchIcon from '@mui/icons-material/Search';
import AddModal from './AddModal';
import UpdateModal from './UpdateModal';
import SideBar from '../components/SideBar';
import './tailwind.css';

const Reservation = () => {
    const [reservations, setReservations] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState(null);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchError, setSearchError] = useState(false);

    // Function to open the add modal
    const handleOpen = () => setOpen(true);

    // Function to close the add modal
    const handleClose = () => setOpen(false);

    // Function to open the update modal and set the selected reservation data
    const handleUpdateOpen = (reservationId) => {
        setSelectedReservation(reservationId);
        console.log(reservationId)
        setUpdateOpen(true);
    }

    // Function to close the update modal
    const handleUpdateClose = () => {
        setSelectedReservation(null);
        setUpdateOpen(false);
    };

    // Function to handle the update submission
    const handleUpdateSubmit = async (updatedReservationData) => {
        try {
            // Assuming the API expects the data in the following format
            const updatedReservation = {
                id: selectedReservation.id,
                teacher: updatedReservationData.teacher, // The teacher ID is required for the update operation
                room: updatedReservationData.room,
                date: updatedReservationData.date,
            };

            const response = await axios.put(`http://localhost:8080/api/reserve/update/${selectedReservation}`, updatedReservation);
            console.log(response.data); // 
        } catch (error) {
            handleUpdateClose();
            fetchReservations();
            console.error('Error updating resersvation:', error);
        }
    };

    const fetchReservations = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/reserve/list`);
            setReservations(response.data);
        }
        catch (error) {
            console.log("Error while retrieving users list")
        }
    };

    // Function to format the date and time from the reservation
    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        const formattedTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
        return { formattedDate, formattedTime };
    };

    const handleSearch = async (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        setSearchError(false);
        try {
            let response;
            if (term === '') {
                // Fetch all teachers if the search term is empty
                response = await axios.get('http://localhost:8080/api/teachers/list')
            } else {
                // Perform a search if there is a search term
                response = await axios.get(`http://localhost:8080/api/teachers/search/${term}`)
            }
            setReservations(response.data); // Update the teachers state with the search results or all teachers
        } catch (error) {
            setSearchError(true);
            console.error('Error fetching search results or all teachers:', error);
        }
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    const handleSubmit = async (reservationData) => {
        try {
            // Ensure that reservationData contains the teacher and room IDs
            if (!reservationData.teacher || !reservationData.room) {
                throw new Error('Teacher and room IDs are required');
            }
    
            // Construct the reservation object with the IDs from reservationData
            const reservation = {
                teacher: reservationData.teacher, // This should be the teacher's ID
                room: reservationData.room, // This should be the room's ID
                date: reservationData.date,
            };
    
            // Send the POST request to the backend
            const response = await axios.post(`http://localhost:8080/api/reserve/save`, reservation);
            console.log(response.data);
            handleClose();
            fetchReservations(); // Refresh the list of reservations
        } catch (error) {
            console.error('Error saving reservations:', error);
        }
    };
    

    const handleDelete = async (reservationId) => {
        try {
            await axios.delete(`http://localhost:8080/api/reserve/delete/${reservationId}`);
            fetchReservations();
            console.log("Reserve deleted!");
        }
        catch (error) {
            console.error('Error deleting Reserve:', error);
        }
    };

    return (
        <>
            <Grid container className='grid-cols-12'>
                <Grid item xs={2}>
                    <SideBar />
                </Grid>
                <Grid item xs={10} className='w-full h-full'>
                    <div className="flex flex-col items-center">
                        {/* Add and Update Modals */}
                        <AddModal open={open} handleClose={handleClose} handleSubmit={handleSubmit} />
                        <UpdateModal open={updateOpen} handleClose={handleUpdateClose} handleUpdate={handleUpdateSubmit} reservation={selectedReservation} />
                        {/* Table and other elements */}
                        <h1 className="text-center text-3xl font-light mt-10"><FontAwesomeIcon icon={faList} className='mr-5' />R E S E R V A T I O N S<span className='ms-10'>L I S T</span></h1>
                        <TableContainer component={Container} className='container mt-3'>
                            <Grid container className='mt-4'>
                                <Grid item xs={0} sm={6}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleOpen}
                                        className="py-2 px-3 mt-3"
                                    >
                                        <FontAwesomeIcon icon={faPlus} />
                                    </Button>
                                </Grid>
                                        </Grid>
                                <Table className="my-4 min-w-full divide-y divide-gray-200" aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className='th text-center fw-bold'>Date</TableCell>
                                            <TableCell className='th text-center fw-bold'>Time</TableCell>
                                            <TableCell className='th text-center fw-bold'>Teacher</TableCell>
                                            <TableCell className='th text-center fw-bold'>Room</TableCell>
                                            <TableCell className='th text-center fw-bold'>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {reservations.map((reservation) => {
                                            const { formattedDate, formattedTime } = formatDateTime(reservation.date);
                                            return (
                                                <TableRow key={reservation.id}>
                                                    <TableCell className='text-center'>{formattedDate}</TableCell>
                                                    <TableCell className='text-center'>{formattedTime}</TableCell>
                                                    <TableCell className='text-center'>{reservation.teacher.name}</TableCell>
                                                    <TableCell className='text-center'>{reservation.room.designation}</TableCell>
                                                    <TableCell>
                                                        <div className='flex justify-around'>
                                                            <button className='updateBtn px-8 py-1.5' onClick={() => handleUpdateOpen(reservation.id)}>
                                                                <FontAwesomeIcon icon={faEdit} />
                                                            </button>
                                                            <button className='deleteBtn px-8 py-1.5' onClick={() => handleDelete(reservation.id)}>
                                                                <FontAwesomeIcon icon={faTrashAlt} />
                                                            </button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>

                                </Table>
                        </TableContainer>
                    </div>
                </Grid>
            </Grid>
        </>
    );
};

export default Reservation;
