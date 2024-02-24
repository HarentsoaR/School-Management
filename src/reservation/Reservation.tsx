import { useState, useEffect } from 'react';
import { TableContainer, Grid, Table, TableHead, TableRow, TableCell, TableBody, Container } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrashAlt, faPen, faClock, faCalendar, faHomeAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import AddModal from './AddModal';
import UpdateModal from './UpdateModal';
import SideBar from '../components/SideBar';
import './tailwind.css';
import { Toast } from '../components/Toast';
import axiosInstance from '../components/axiosInstance';

const Reservation = () => {
    const [reservations, setReservations] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState(null);
    const [updateOpen, setUpdateOpen] = useState(false);

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
            Toast.fire({
                icon: "error",
                title: "Error while updating a resrevation !"
            })
            const response = await axiosInstance.put(`/reserve/update/${selectedReservation}`, updatedReservation);
            console.log(response.data); // 
        } catch (error) {
            handleUpdateClose();
            fetchReservations();
            Toast.fire({
                icon: "success",
                title: "Classroom reservation updated successfully !"
            })
            console.error('Error updating resersvation:', error);
        }
    };

    const fetchReservations = async () => {
        try {
            const response = await axiosInstance.get(`/reserve/list`);
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
            const response = await axiosInstance.post(`/reserve/save`, reservation);
            console.log(response.data);
            handleClose();
            fetchReservations(); // Refresh the list of reservations
            Toast.fire({
                icon: "success",
                title: "Classroom is reserved successfully !"
            })
        } catch (error) {
            console.error('Error saving reservations:', error);
        }
    };


    const handleDelete = async (reservationId) => {
        try {
            await axiosInstance.delete(`/reserve/delete/${reservationId}`);
            fetchReservations();
            console.log("Reserve deleted!");
            Toast.fire({
                icon: "success",
                title: "Classroom reservation was successfully deleted !"
            })
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
                    <div style={{
                        backgroundImage: `url(school-bg/pen3.jpg)`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        minHeight: '100vh',
                        position: 'relative',
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(255,   255,   255,   0.5)', // Semi-transparent white overlay
                            zIndex: -1,
                        }}></div>
                        <div className="text-center text-4xl font-bold py-10 roboto-font-h1">
                            <span className="letter">R</span>
                            <span className="letter">E</span>
                            <span className="letter">S</span>
                            <span className="letter">E</span>
                            <span className="letter">R</span>
                            <span className="letter">V</span>
                            <span className="letter">A</span>
                            <span className="letter">T</span>
                            <span className="letter">I</span>
                            <span className="letter">O</span>
                            <span className="letter">N</span>
                        </div>
                        <div className="flex flex-col items-center mx-20 bg-slate-200 rounded-2xl shadow-2xl shadow-blue-200 reservationModal">
                            {/* Add and Update Modals */}
                            <AddModal open={open} handleClose={handleClose} handleSubmit={handleSubmit} />
                            <UpdateModal open={updateOpen} handleClose={handleUpdateClose} handleUpdate={handleUpdateSubmit} reservation={selectedReservation} />
                            {/* Table and other elements */}
                            <TableContainer component={Container} className='container mt-3'>
                                <Grid container className='mt-4'>
                                    <Grid item xs={0} sm={6}>
                                        <button
                                            color="primary"
                                            onClick={handleOpen}
                                            className="updateBtn py-2 px-3"
                                        >
                                            <FontAwesomeIcon icon={faPlus} />
                                        </button>
                                    </Grid>
                                </Grid>
                                <Table className="min-w-full divide-y divide-gray-200 mt-3" aria-label="simple table">
                                    <TableHead>
                                        <TableRow className='tableH'>
                                            <TableCell className='text-center fw-light'><FontAwesomeIcon icon={faCalendar} className='mr-1.5' />Date</TableCell>
                                            <TableCell className='text-center fw-light'><FontAwesomeIcon icon={faClock} className='mr-1.5' />Time</TableCell>
                                            <TableCell className='text-center fw-light'><FontAwesomeIcon icon={faUserCircle} className='mr-1.5' />Teacher</TableCell>
                                            <TableCell className='text-center fw-light'><FontAwesomeIcon icon={faHomeAlt} className='mr-1.5' />Classroom</TableCell>
                                            <TableCell className='text-center fw-light'><FontAwesomeIcon icon={faPen} className='mr-1.5' />Actions</TableCell>
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
                        </div></div>
                </Grid>
            </Grid>
        </>
    );
};

export default Reservation;
