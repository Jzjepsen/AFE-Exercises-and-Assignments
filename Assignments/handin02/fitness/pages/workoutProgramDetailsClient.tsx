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
        const token = localStorage.getItem('token');

        if (!workoutProgramId) return; 

        try {
            const apiUrl = `https://afefitness2023.azurewebsites.net/api/WorkoutPrograms/${workoutProgramId}`;

            axios.get(apiUrl, {
                headers: { 
                    'accept': 'text/plain',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                setProgramDetails(response.data);
            })
            .catch(error => {
                console.error('Error fetching program details:', error);
            });
        } catch (error) {
            console.error('Error with request:', error);
        }
    }, [workoutProgramId]);

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <form>
                {programDetails ? (
                    <div>
                        <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>{programDetails.name}</h1>
                        <p style={{ fontSize: '16px', marginBottom: '20px' }}>{programDetails.description}</p>
                        <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>Exercises</h2>
                        <ul style={{ listStyleType: 'none', padding: '0' }}>
                            {programDetails.exercises.map(exercise => (
                                <li key={exercise.exerciseId} style={{ marginBottom: '10px' }}>
                                    <strong>{exercise.name}</strong>: {exercise.description} 
                                    (Sets: {exercise.sets}, Repetitions: {exercise.repetitions})
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>Loading program details...</p>
                )}
            </form>
        </div>
    );
}


export default ProgramDetails;
