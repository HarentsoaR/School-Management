import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, Grid, TextField, InputAdornment, Container } from '@mui/material';
import NavigationBar from '../components/NavigationBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { faEdit, faPlus, faTrashAlt, faUser, faStar, faIdBadge, faPen } from '@fortawesome/free-solid-svg-icons';
import SearchIcon from '@mui/icons-material/Search';
import AddModal from './AddModal';
import './tailwind.css'
import UpdateModal from './UpdateModal';

const Teacher = () => {
    const [teachers, setTeachers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchError, setSearchError] = useState(false);
    const [open, setOpen] = useState(false);

    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [updateOpen, setUpdateOpen] = useState(false);

    // Function to handle opening the update modal and setting the selected teacher data
    const handleUpdateOpen = (teacherId) => {
        setSelectedTeacher(teacherId);
        setUpdateOpen(true);
    }

    // Function to handle closing the update modal
    const handleUpdateClose = () => {
        setSelectedTeacher(null);
        setUpdateOpen(false);
    };

    // Function to handle the update submission
    const handleUpdateSubmit = async (updatedTeacherData) => {
        try {
            // Assuming the API expects the data in the following format
            const updatedTeacher = {
                id: selectedTeacher.id, // The teacher ID is required for the update operation
                name: updatedTeacherData.firstName,
                prenom: updatedTeacherData.lastName,
                grade: updatedTeacherData.grade,
                codeprof: updatedTeacherData.teacherNumber,
            };

            const response = await axios.put(`http://localhost:8080/api/teachers/${selectedTeacher.id}`, updatedTeacher);
            console.log(response.data);
            handleUpdateClose();
            fetchTeachers(); // Refresh the list of teachers
        } catch (error) {
            console.error('Error updating teacher:', error);
        }
    };


    //Modal Treatments
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const fetchTeachers = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/teachers/list`);
            setTeachers(response.data);
        }
        catch (error) {
            console.log("Error while retrieving users list")
        }
    }
    useEffect(() => {
        fetchTeachers();
    }, []);


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
            setTeachers(response.data); // Update the teachers state with the search results or all teachers
        } catch (error) {
            setSearchError(true);
            console.error('Error fetching search results or all teachers:', error);
        }
    };
    const handleDelete = async (teacherId) => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/teachers/${teacherId}`);
            fetchTeachers();
            console.log("Teacher deleted!");
        }
        catch (error) {
            console.error('Error deleting teacher:', error);
        }
    }
      
    const handleSubmit = async (teacherData: { firstName: string; lastName: string; grade: string; teacherNumber: string }) => {
        try {
            // Assuming the API expects the data in the following format
            const teacher = {
                name: teacherData.firstName,
                prenom: teacherData.lastName,
                grade: teacherData.grade,
                codeprof: teacherData.teacherNumber,
            };

            const response = await axios.post(`http://localhost:8080/api/teachers/save`, teacher);
            console.log(response.data);
            handleClose();
            fetchTeachers(); // Refresh the list of teachers
        } catch (error) {
            console.error('Error saving teacher:', error);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <NavigationBar />
            <AddModal open={open} handleClose={handleClose} handleSubmit={handleSubmit} />
            <UpdateModal open={updateOpen} handleClose={handleUpdateClose} handleUpdateSubmit={handleUpdateSubmit} teacherData={selectedTeacher} />
            <h1 className="text-center text-3xl font-light mt-10"><FontAwesomeIcon icon={faList} className='mr-5' />T E A C H E R <span className='ms-10'>L I S T</span></h1>
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
                            label="Search Name"
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
                            helperText={searchError ? 'Teacher not Found' : ''} // This will show the error message in Material UI
                        />
                    </Grid>
                </Grid>
                <Table className="min-w-full divide-y divide-gray-200" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className='th text-center fw-bold'> <FontAwesomeIcon icon={faIdBadge} className='mr-1.5' />Code</TableCell>
                            <TableCell className='th text-center fw-bold'> <FontAwesomeIcon icon={faUser} className='mr-1.5' />First Name</TableCell>
                            <TableCell className='th text-center fw-bold'> <FontAwesomeIcon icon={faUser} className='mr-1.5' />Last Name</TableCell>
                            <TableCell className='th text-center fw-bold'> <FontAwesomeIcon icon={faStar} className='mr-1.5' />Grade</TableCell>
                            <TableCell className='th text-center fw-bold'> <FontAwesomeIcon icon={faPen} className='mr-1.5' />Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {teachers.map((teacher) => (
                            <TableRow key={teacher.id}>
                                <TableCell className='text-center'>{teacher.codeprof}</TableCell>
                                <TableCell component="th" scope="row" className='text-center'>
                                    {teacher.name}
                                </TableCell>
                                <TableCell className='text-center'>{teacher.prenom}</TableCell>
                                <TableCell className='text-center'>{teacher.grade}</TableCell>
                                <TableCell>
                                    <div className='flex justify-around'>
                                        <button className='updateBtn px-8 py-1.5' onClick={() => handleUpdateOpen(teacher)}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button className='deleteBtn px-8 py-1.5' onClick={() => handleDelete(teacher.id)}>
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
    );
};

export default Teacher;
