import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';

// Interface definitions
interface Exercise {
    exerciseId: number;
    name: string;
    description: string;
    sets: number;
    repetitions: number;
    time: string | null;
    workoutProgramId: number;
    personalTrainerId: number;
}

interface WorkoutProgram {
    workoutProgramId: number;
    name: string;
    description: string;
    exercises: Exercise[];
    personalTrainerId: number;
    clientId: number;
}

interface User {
    firstName: string;
    lastName: string;
    email: string;
}

const ClientPage = () => {
    const router = useRouter();
    const [workoutPrograms, setWorkoutPrograms] = useState<WorkoutProgram[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [storedUserId, setStoredUserId] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setStoredUserId(localStorage.getItem('id'));
            setToken(localStorage.getItem('token'));
        }
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            if (storedUserId && token) {
                const url = `https://afefitness2023.azurewebsites.net/api/Users/${storedUserId}`;
                try {
                    const response = await axios.get(url, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    setUser(response.data);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };

        const fetchWorkoutPrograms = async () => {
            if (storedUserId && token) {
                try {
                    const response = await axios.get(`https://afefitness2023.azurewebsites.net/api/WorkoutPrograms/client/${storedUserId}`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    console.log("Fetched workout programs:", response.data);
                    setWorkoutPrograms(response.data);
                } catch (error) {
                    console.error('Error fetching workout programs:', error);
                }
            }
        };

        fetchUserData();
        fetchWorkoutPrograms();
    }, [storedUserId, token]);

    const handleProgramClick = (workoutProgramId: number) => {
        console.log('Navigating to details page with workoutProgramId:', workoutProgramId);
        router.push(`/workoutProgramDetailsClient?workoutProgramId=${workoutProgramId}`);
    };

    const [refreshWorkoutPrograms, setRefreshWorkoutPrograms] = useState(false);

    useEffect(() => {
        const fetchWorkoutPrograms = async () => {
            if (storedUserId && token) {
                try {
                    const response = await axios.get(`https://afefitness2023.azurewebsites.net/api/WorkoutPrograms/client/${storedUserId}`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    console.log("Fetched workout programs:", response.data);
                    setWorkoutPrograms(response.data);
                } catch (error) {
                    console.error('Error fetching workout programs:', error);
                }
            }
        };

        fetchWorkoutPrograms();
    }, [storedUserId, token, refreshWorkoutPrograms]);

    return (
        <Box>
            {user && (
                <>
                    <Typography variant="h4">{user.firstName} {user.lastName}</Typography>
                    <Typography>Email: {user.email}</Typography>
                </>
            )}
            <Button variant="contained" color="primary" onClick={() => setRefreshWorkoutPrograms(prev => !prev)}>
                Refresh Workout Programs
            </Button>

            {workoutPrograms.length > 0 ? (
                workoutPrograms.map(program => (
                    <Card key={program.workoutProgramId} onClick={() => handleProgramClick(program.workoutProgramId)}>
                        <CardContent>
                            <Typography variant="h5">{program.name}</Typography>
                            <Typography color="textSecondary">{program.description}</Typography>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <Typography>No workout programs available.</Typography>
            )}
        </Box>
    );
}

export default ClientPage;  
