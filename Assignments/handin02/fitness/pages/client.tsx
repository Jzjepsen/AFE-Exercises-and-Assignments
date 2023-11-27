import React, { useEffect, useState } from 'react';
import { Select, MenuItem, Box, Typography, Card, CardContent } from '@material-ui/core';
import axios from 'axios';

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

const ClientPage: React.FC = () => {
    const [workoutPrograms, setWorkoutPrograms] = useState<WorkoutProgram[]>([]);
    const [selectedProgram, setSelectedProgram] = useState<number | null>(null);

    useEffect(() => {
        axios.get('https://afefitness2023.azurewebsites.net/api/WorkoutPrograms', {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOYW1lIjoiSmFuZSIsIlJvbGUiOiJDbGllbnQiLCJVc2VySWQiOiI1IiwibmJmIjoiMTcwMDQ4Njk1NiIsImV4cCI6IjE3MDA1NzMzNTYifQ.4uXSIWQi3o5fFoKIIeR0uLzzbb8unSOEpQS5Etjh6Cs'
            }
        }).then(response => {
            setWorkoutPrograms(response.data as WorkoutProgram[]);
            if (response.data.length === 1) {
                setSelectedProgram(response.data[0].workoutProgramId);
            }
        });
    }, []);

    const handleProgramChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedProgram(event.target.value as number);
    };

    const selectedWorkoutProgram = workoutPrograms.find(program => program.workoutProgramId === selectedProgram);

    return (
        <Box display="flex" flexDirection="column" alignItems="center" width="80%" margin="auto">
            {workoutPrograms.length > 1 && (
                <Select value={selectedProgram} onChange={handleProgramChange}>
                    {workoutPrograms.map(program => (
                        <MenuItem value={program.workoutProgramId} key={program.workoutProgramId}>
                            {program.name}
                        </MenuItem>
                    ))}
                </Select>
            )}
            {selectedWorkoutProgram && (
                <Card style={{ marginTop: '20px', width: '100%' }}>
                    <CardContent>
                        <Typography variant="h6" component="h2">
                            {selectedWorkoutProgram.name}
                        </Typography>
                        <Typography color="textSecondary" gutterBottom>
                            {selectedWorkoutProgram.description}
                        </Typography>
                        {selectedWorkoutProgram.exercises.map(exercise => (
                            <Box key={exercise.exerciseId} marginTop={2} marginBottom={2}>
                                <Typography variant="body1">
                                    {exercise.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {exercise.description}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Sets: {exercise.sets}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Repetitions: {exercise.repetitions}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Time: {exercise.time || 'N/A'}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Workout Program ID: {exercise.workoutProgramId}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Personal Trainer ID: {exercise.personalTrainerId}
                                </Typography>
                            </Box>
                        ))}
                    </CardContent>
                </Card>
            )}
        </Box>
    );
}

export default ClientPage;  
