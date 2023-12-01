import React from 'react';
import { styled } from '@mui/system';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import { GetServerSideProps } from 'next';

interface User {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    personalTrainerId: number | null;
    accountType: string;
}

// define your styles using styled  
const StyledTable = styled(Table)({
    minWidth: 650,
});

const StyledContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
});

const UsersListPage: React.FC<{ users: User[] }> = ({ users }) => {
    return (
        <StyledContainer>
            <TableContainer component={Paper}>
                <StyledTable aria-label="simple table">
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
                </StyledTable>
            </TableContainer>
        </StyledContainer>
    );
}

// rest of your code  



export const getServerSideProps: GetServerSideProps = async (context) => {
    const { req } = context;
    const token = req.cookies.token;
    console.log('token FROM SERVER SIDE', token);

    if (!token) {
        return {
            props: { users: [] },
        };
    }

    const response = await axios.get<User[]>('https://afefitness2023.azurewebsites.net/api/Users', {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    return {
        props: {
            users: response.data,
        },
    };
}



export default UsersListPage;    
