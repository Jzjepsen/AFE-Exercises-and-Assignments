import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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

interface ProgramDetailsType {
    workoutProgramId: number;
    name: string;
    description: string;
    exercises: Exercise[];
    personalTrainerId: number;
    clientId: number;
}

const ProgramDetails = () => {
    const router = useRouter();
    const { workoutProgramId } = router.query;

    console.log('Received workoutProgramId:', workoutProgramId);
    
    const [programDetails, setProgramDetails] = useState<ProgramDetailsType | null>(null);

    useEffect(() => {
        if (!workoutProgramId) return; // Ensure workoutProgramId is available
        const apiUrl = `https://afefitness2023.azurewebsites.net/api/WorkoutPrograms/${workoutProgramId}`;

        axios.get(apiUrl)
            .then(response => {
                setProgramDetails(response.data);
            })
            .catch(error => {
                console.error('Error fetching program details:', error);
            });
    }, [workoutProgramId]);

    return (
        <div>
            {programDetails ? (
                <div>
                    <h1>{programDetails.name}</h1>
                    <p>{programDetails.description}</p>
                    {/* Display other program details here */}
                    <h2>Exercises</h2>
                    <ul>
                        {programDetails.exercises.map(exercise => (
                            <li key={exercise.exerciseId}>
                                <strong>{exercise.name}</strong>: {exercise.description} 
                                (Sets: {exercise.sets}, Repetitions: {exercise.repetitions})
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Loading program details...</p>
            )}
        </div>
    );
}

export default ProgramDetails;
