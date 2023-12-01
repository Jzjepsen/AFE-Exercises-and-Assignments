import React from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';



const TrainerPage: React.FC = () => {
    const router = useRouter();

    if (typeof window !== "undefined") {
        const jwt = localStorage.getItem('token');
        if (jwt) {
            Cookies.set('token', jwt);
        }
    }

    const handleButtonClick = (path: string) => {
        router.push(path);
    }

    return (
        <div>
            <div style={{ marginBottom: '20px' }}>
                <Button variant="contained" color="primary" onClick={() => handleButtonClick("/trainerNewUsers")}>
                    Create User (Client)
                </Button>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <Button variant="contained" color="primary" onClick={() => handleButtonClick("/createWorkoutProgram")}>
                    Create Workout Program
                </Button>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <Button variant="contained" color="primary" onClick={() => handleButtonClick("/addExercise")}>
                    Add an exercise
                </Button>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <Button variant="contained" color="primary" onClick={() => handleButtonClick("/addExerciseToProgram")}>
                    Add Exercise to Workout Program
                </Button>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <Button variant="contained" color="primary" onClick={() => handleButtonClick("/workoutProgramsList")}>
                    See Workout Programs
                </Button>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <Button variant="contained" color="primary" onClick={() => handleButtonClick("/clientsList")}>
                    See List of Clients
                </Button>
            </div>
        </div>
    );
}

export default TrainerPage;  
