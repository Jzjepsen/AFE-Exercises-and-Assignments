import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Box, Typography, Card, CardContent, Button } from '@material-ui/core';

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

  // Function to fetch user data
  const fetchUserData = useCallback(async () => {
    const storedUserId = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const url = `https://afefitness2023.azurewebsites.net/api/Users/${storedUserId}`;
    try {
      const response = await axios.get(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, []);

  // Function to fetch workout programs
  const fetchWorkoutPrograms = useCallback(async () => {
    const storedUserId = localStorage.getItem('id');
    const token = localStorage.getItem('token');

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
  }, []);

  // Fetch user data and workout programs on component mount
  useEffect(() => {
    fetchUserData();
    fetchWorkoutPrograms();
  }, [fetchUserData, fetchWorkoutPrograms]);

  // Handle program click and navigate to details page
  const handleProgramClick = (workoutProgramId: number) => {
    console.log('Navigating to details page with workoutProgramId:', workoutProgramId);
    router.push(`/workoutProgramDetailsClient?workoutProgramId=${workoutProgramId}`);
  };

  return (
    <Box>
      {user && (
        <>
          <Typography variant="h4" style={{ color: 'black' }}>
            {user.firstName} {user.lastName}
          </Typography>
          <Typography style={{ color: 'black' }}>
            Email: {user.email}
          </Typography>
          {/* Display other user information here */}
        </>
      )}
      <Button variant="contained" color="primary" onClick={fetchWorkoutPrograms}>
        Refresh Workout Programs
      </Button>

      {workoutPrograms.length > 0 ? (
        workoutPrograms.map((program) => (
          <Card key={program.workoutProgramId} onClick={() => handleProgramClick(program.workoutProgramId)}>
            <CardContent>
              <Typography variant="h5" style={{ color: 'black' }}>
                {program.name}
              </Typography>
              <Typography color="textSecondary" style={{ color: 'black' }}>
                {program.description}
              </Typography>
              {/* Add more details here */}
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography style={{ color: 'black' }}>No workout programs available.</Typography>
      )}
    </Box>
  );
}

export default ClientPage;
