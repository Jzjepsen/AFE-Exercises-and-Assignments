import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@material-ui/core';
import axios from 'axios';

interface User {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    personalTrainerId: number | null;
    accountType: string;
}

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    progress: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
});

const UsersListPage: React.FC = () => {
    const classes = useStyles();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get<User[]>('https://afefitness2023.azurewebsites.net/api/Users', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => {
                setUsers(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    if (loading) {
        return (
            <div className={classes.progress}>
                <CircularProgress />
            </div>
        );
    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Personal Trainer ID</TableCell>
                        <TableCell>Account Type</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.userId}>
                            <TableCell>{user.userId}</TableCell>
                            <TableCell>{user.firstName}</TableCell>
                            <TableCell>{user.lastName}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.personalTrainerId}</TableCell>
                            <TableCell>{user.accountType}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default UsersListPage;  
