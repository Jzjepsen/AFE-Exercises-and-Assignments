import React from 'react';
import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';

const TrainerPage: React.FC = () => {
    const router = useRouter();

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
                    Add Exercise to Workout Program
                </Button>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <Button variant="contained" color="primary" onClick={() => handleButtonClick("/workoutProgramsList")}>
                    See List of Workout Programs
                </Button>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <Button variant="contained" color="primary" onClick={() => handleButtonClick("/specificWorkoutProgram")}>
                    See Specific Workout Program
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
