import { faEdit, faList, faListNumeric, faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import NavigationBar from "../components/NavigationBar"
import { TableContainer, Paper, Grid, Button, TextField, InputAdornment, Table, TableHead, TableRow, TableCell, TableBody, Container } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import './tailwind.css'
import { useState, useEffect } from "react";
import { faPrescription } from "@fortawesome/free-solid-svg-icons/faPrescription";
import AddModal from "./AddModal";
import UpdateModal from "./UpdateModal";


const Room = () => {
    const [classrooms, setClasrooms] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [updateOpen, setUpdateOpen] = useState(false);

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

            const response = await axios.put(`http://localhost:8080/api/room/update/${selectedRoom.id}`, updatedRoom);
            console.log(response.data);
            handleUpdateClose();
            fetchClassRooms(); // Refresh the list of teachers
        } catch (error) {
            console.error('Error updating teacher:', error);
        }
    };

    const fetchClassRooms = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/room/list`);
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

            const response = await axios.post(`http://localhost:8080/api/room/save`, classroom);
            console.log(response.data);
            handleClose();
            fetchClassRooms(); // Refresh the list of teachers
        } catch (error) {
            console.error('Error saving teacher:', error);
        }
    };

    const handleDelete = async (classroomIdObject) => {
        try {
            // Extract the ID from the object
            const classroomId = classroomIdObject.id;
            const response = await axios.delete(`http://localhost:8080/api/room/delete/${classroomId}`);
            // console.log("Room deleted!");
            // console.log(response.data);
            fetchClassRooms();
        } catch (error) {
            console.error('Error deleting room:', error);
        }
    }
    

    return (
        <div className="flex flex-col items-center">
            <NavigationBar />
            <AddModal open={open} handleClose={handleClose} handleSubmit={handleSubmit} />
            <UpdateModal open={updateOpen} handleClose={handleUpdateClose} handleUpdateSubmit={handleUpdateSubmit} classroomData={selectedRoom} />
            <h1 className="text-center text-3xl font-light mt-10"><FontAwesomeIcon icon={faList} className='mr-5' />C L A S S R O O M S<span className='ms-10'>L I S T</span></h1>
            <TableContainer component={Container} className='container mt-3'>
                <Grid container className="mt-4">
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
                    <Grid item xs={12} sm={5} className='my-auto'>

                        <TextField
                            fullWidth
                            label="Search Classroom"
                            variant="outlined"
                            //value={}
                            //onChange={}
                            //className={}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        //error={} // This will show the error state in Material UI
                        //helperText={searchError ? 'Teacher not Found' : ''} // This will show the error message in Material UI
                        />
                    </Grid>
                </Grid>
                <Table className="min-w-full divide-y divide-gray-200 mt-2" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className='th text-center fw-bold'> <FontAwesomeIcon icon={faListNumeric} className='mr-1.5' />Room Number</TableCell>
                            <TableCell className='th text-center fw-bold'> <FontAwesomeIcon icon={faPrescription} className='mr-1.5' />Designation</TableCell>
                            <TableCell className='th text-center fw-bold'> <FontAwesomeIcon icon={faEdit} className='mr-1.5' />Actions</TableCell>
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
        </div>
    )
}

export default Room
