import { faEdit, faListNumeric, faPen, faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { TableContainer, Grid, TextField, InputAdornment, Table, TableHead, TableRow, TableCell, TableBody, Container } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import './tailwind.css'
import { useState, useEffect } from "react";
import { faPrescription } from "@fortawesome/free-solid-svg-icons/faPrescription";
import AddModal from "./AddModal";
import UpdateModal from "./UpdateModal";
import SideBar from "../components/SideBar";
import { Toast } from '../components/Toast';
import axiosInstance from '../components/axiosInstance';

const Room = () => {
    const [classrooms, setClasrooms] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchError, setSearchError] = useState(false);

    //Modal Treatments
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Function to handle opening the update modal and setting the selected teacher data
    const handleUpdateOpen = (classroomId) => {
        setSelectedRoom(classroomId);
        setUpdateOpen(true);
    }

    // Function to handle closing the update modal
    const handleUpdateClose = () => {
        setSelectedRoom(null);
        setUpdateOpen(false);
    };

    // Function to handle the update submission
    const handleUpdateSubmit = async (updatedRoomData) => {
        try {
            // Assuming the API expects the data in the following format
            const updatedRoom = {
                id: selectedRoom.id, // The teacher ID is required for the update operation
                codesalle: updatedRoomData.codesalle,
                designation: updatedRoomData.designation
            };

            const response = await axiosInstance.put(`/room/update/${selectedRoom.id}`, updatedRoom);
            console.log(response.data);
            handleUpdateClose();
            fetchClassRooms(); // Refresh the list of teachers
            Toast.fire({
                icon: "success",
                title: "Classroom updated successfully !"
            })
        } catch (error) {
            console.error('Error updating classroom:', error);
        }
    };

    const fetchClassRooms = async () => {
        try {
            const response = await axiosInstance.get(`/room/list`);
            setClasrooms(response.data);
        }
        catch (error) {
            console.log("Error while retrieving classrooms list")
        }
    }
    useEffect(() => {
        fetchClassRooms();
    }, []);

    const handleSubmit = async (classroomData: { codesalle: string; designation: string }) => {
        try {
            // Assuming the API expects the data in the following format
            const classroom = {
                codesalle: classroomData.codesalle,
                designation: classroomData.designation,
            };

            const response = await axiosInstance.post(`/room/save`, classroom);
            console.log(response.data);
            handleClose();
            fetchClassRooms(); // Refresh the list of teachers
            Toast.fire({
                icon: "success",
                title: "Classroom added successfully !"
            })
        } catch (error) {
            console.error(error)
            handleClose();
            Toast.fire({
                icon: "error",
                title: `Clasroom with number ${classroomData.codesalle} already exists !`
            });
        }
    };

    const handleDelete = async (classroomIdObject) => {
        try {
            // Extract the ID from the object
            const classroomId = classroomIdObject.id;
            await axiosInstance.delete(`/room/delete/${classroomId}`);
            // console.log("Room deleted!");
            // console.log(response.data);
            fetchClassRooms();
            Toast.fire({
                icon: "success",
                title: "Classroom deleted successfully !"
            })
        } catch (error) {
            console.error('Error deleting room:', error);
            Toast.fire({
                icon: "error",
                title: "Error ! Please check your reservation"
            })
        }
    }

    const handleSearch = async (event) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);
        setSearchError(false);

        try {
            let response;
            if (term === '') {
                response = await axiosInstance.get('/room/list')
                setClasrooms(response.data)
            }
            else if (term !== '') {
                // Filter the classrooms based on the search term
                const filteredClassrooms = classrooms.filter(classroom =>
                    classroom.codesalle.toLowerCase().includes(term) ||
                    classroom.designation.toLowerCase().includes(term)
                );
                // Update the state with the filtered classrooms
                setClasrooms(filteredClassrooms);
                // Set the search error to false if matching classrooms are found, otherwise set it to true
                setSearchError(filteredClassrooms.length > 0 ? false : true);
            }

        }
        catch (error) {
            setSearchError(false)
        }

    };



    return (
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
                        <span className="letter">C</span>
                        <span className="letter">L</span>
                        <span className="letter">A</span>
                        <span className="letter">S</span>
                        <span className="letter">S</span>
                        <span className="letter">R</span>
                        <span className="letter">O</span>
                        <span className="letter">O</span>
                        <span className="letter">M</span>
                    </div>
                    <div className="flex flex-col items-center mx-20 bg-slate-200 rounded-2xl shadow-2xl shadow-blue-200 roomModal">
                        <AddModal open={open} handleClose={handleClose} handleSubmit={handleSubmit} />
                        <UpdateModal open={updateOpen} handleClose={handleUpdateClose} handleUpdateSubmit={handleUpdateSubmit} classroomData={selectedRoom} />
                        <TableContainer component={Container} className='container'>
                            <Grid container className="mt-4">
                                <Grid item xs={0} sm={6}>
                                    <button
                                        color="primary"
                                        onClick={handleOpen}
                                        className="updateBtn py-2 px-3 mt-3"
                                    >
                                        <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                </Grid>
                                <Grid item xs={12} sm={5} className='my-auto'>

                                    <TextField
                                        fullWidth
                                        label="Search Classroom"
                                        variant="outlined"
                                        value={searchTerm}
                                        onChange={handleSearch}
                                        className={`m-3 ${searchError ? 'border-red-500' : ''}`}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SearchIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                        error={searchError} // This will show the error state in Material UI
                                        helperText={searchError ? 'Classroom not Found' : ''} // This will show the error message in Material UI
                                    />
                                </Grid>
                            </Grid>
                            <Table className="min-w-full divide-y divide-gray-200 mt-3" aria-label="simple table">
                                <TableHead>
                                    <TableRow className="tableH">
                                        <TableCell className='text-center fw-light'> <FontAwesomeIcon icon={faListNumeric} className='mr-1.5' />Classroom code</TableCell>
                                        <TableCell className='text-center fw-light'> <FontAwesomeIcon icon={faPrescription} className='mr-1.5' />Designation</TableCell>
                                        <TableCell className='text-center fw-light'> <FontAwesomeIcon icon={faPen} className='mr-1.5' />Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {classrooms.map((classroom) => (
                                        <TableRow key={classroom.id}>
                                            <TableCell className='text-center'>{classroom.codesalle}</TableCell>
                                            <TableCell component="th" scope="row" className='text-center'>
                                                {classroom.designation}
                                            </TableCell>
                                            <TableCell>
                                                <div className='flex justify-around'>
                                                    <button className='updateBtn px-8 py-1.5' onClick={() => handleUpdateOpen(classroom)}>
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </button>
                                                    <button className='deleteBtn px-8 py-1.5' onClick={() => handleDelete(classroom)}>
                                                        <FontAwesomeIcon icon={faTrashAlt} />
                                                    </button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div></div>
            </Grid>
        </Grid>
    )
}

export default Room
