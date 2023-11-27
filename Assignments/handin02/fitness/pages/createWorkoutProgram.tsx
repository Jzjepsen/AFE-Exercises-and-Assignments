import { useState, useEffect, FormEvent } from 'react';

interface Exercise {
    exerciseId: number;
    name: string;
    description: string;
    sets: number;
    repetitions: number;
    time: string;
}

interface User {
    userId: number;
    firstName: string;
    lastName: string;
}

const CreateWorkoutProgram = () => {
    const [workoutProgram, setWorkoutProgram] = useState({
        name: '',
        description: '',
        exercises: [
            {
                exerciseId: 0,
                name: '',
                description: '',
                sets: 0,
                repetitions: 0,
                time: '',
            },
        ] as Exercise[],
        personalTrainerId: 0,
        clientId: 0,
    });

    const [exercises, setExercises] = useState([] as Exercise[]);
    const [users, setUsers] = useState([] as User[]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchExercises = async () => {
            const token = localStorage.getItem('token');
            const response = await fetch('https://afefitness2023.azurewebsites.net/api/Exercises', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const exercises = await response.json();
            console.log(exercises);
            setExercises(exercises);
        };

        const fetchUsers = async () => {
            const token = localStorage.getItem('token');
            const response = await fetch('https://afefitness2023.azurewebsites.net/api/Users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const users = await response.json();
            console.log(users);
            setUsers(users);
        };

        fetchExercises();
        fetchUsers();
    }, []);

    const handleUserSelection = (selectedUserId: number) => {
        setWorkoutProgram(prevProgram => ({
            ...prevProgram,
            clientId: selectedUserId,
        }));
    };

    const handleExerciseSelection = (selectedExerciseId: number, index: number) => {
        const selectedExercise = exercises.find(exercise => exercise.exerciseId === selectedExerciseId);
        const list = [...workoutProgram.exercises] as Exercise[];
        list[index] = { ...list[index], ...selectedExercise } as Exercise;
        setWorkoutProgram(prevProgram => ({
            ...prevProgram,
            exercises: list,
        }));
    };

    const handleProgramChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setWorkoutProgram((prevProgram) => ({
            ...prevProgram,
            [name]: value,
        }));
    };

    const addExercise = () => {
        setWorkoutProgram(prevProgram => ({
            ...prevProgram,
            exercises: [...prevProgram.exercises, { exerciseId: 0, name: '', description: '', sets: 0, repetitions: 0, time: '' }]
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const token = localStorage.getItem('token');

        try {
            let workoutProgramToSubmit: any = { ...workoutProgram };
            // Specify the type of the exercise object    
            workoutProgramToSubmit.exercises = workoutProgramToSubmit.exercises.map(({ exerciseId, ...exercise }: Exercise) => exercise);

            const response = await fetch('https://afefitness2023.azurewebsites.net/api/WorkoutPrograms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(workoutProgramToSubmit),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setWorkoutProgram({
                name: '',
                description: '',
                exercises: [
                    {
                        exerciseId: 0,
                        name: '',
                        description: '',
                        sets: 0,
                        repetitions: 0,
                        time: '',
                    },
                ],
                personalTrainerId: 0,
                clientId: 0,
            });

        } catch (error) {
            console.error('There was an error creating the workout program:', error);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="formContainer">
            <header>Create new Workout Program</header>

            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={workoutProgram.name} onChange={handleProgramChange} placeholder="Program Name" required />
                <textarea name="description" value={workoutProgram.description} onChange={handleProgramChange} placeholder="Program Description" required />
                <select name="clientId" value={workoutProgram.clientId} onChange={(e) => handleUserSelection(Number(e.target.value))}>
                    <option value="">Select a client</option>
                    {users.map(user => (
                        <option key={user.userId} value={user.userId}>{user.firstName} {user.lastName}</option>
                    ))}
                </select>
                {workoutProgram.exercises.map((exercise, index) => (
                    <div key={index}>
                        <select name="exerciseId" value={exercise.exerciseId} onChange={(e) => handleExerciseSelection(Number(e.target.value), index)}>
                            <option value="">Select an exercise</option>
                            {exercises.map(exercise => (
                                <option key={exercise.exerciseId} value={exercise.exerciseId}>{exercise.name}</option>
                            ))}
                        </select>
                        <textarea name="description" value={exercise.description} readOnly placeholder="Exercise Description" required />
                        <input type="number" name="sets" value={exercise.sets} readOnly placeholder="Sets" required />
                        <input type="number" name="repetitions" value={exercise.repetitions} readOnly placeholder="Repetitions" required />
                        <input type="text" name="time" value={exercise.time} readOnly placeholder="Time" required />
                    </div>
                ))}
                <button type="button" onClick={addExercise}>Add Exercise</button>
                <button type="submit" disabled={isLoading}>{isLoading ? 'Creating...' : 'Create Workout Program'}</button>
            </form>
        </div>
    );
};

export default CreateWorkoutProgram;    
