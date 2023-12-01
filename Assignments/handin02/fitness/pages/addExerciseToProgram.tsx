import { useState, useEffect, ChangeEvent, FormEvent } from 'react';

interface Exercise {
    exerciseId: number;
    name: string;
    description: string;
    sets: number;
    repetitions: number;
    time: string;
    workoutProgramId: number;
    personalTrainerId: number;
}

interface WorkoutProgram {
    workoutProgramId: number;
    name: string;
    exercises: Exercise[];
}

const AddExerciseToProgram = () => {
    const [workoutPrograms, setWorkoutPrograms] = useState<WorkoutProgram[]>([]);
    const [selectedProgram, setSelectedProgram] = useState<WorkoutProgram | null>(null);
    const [exercise, setExercise] = useState<Exercise>({
        exerciseId: 0,
        name: '',
        description: '',
        sets: 0,
        repetitions: 0,
        time: '',
        workoutProgramId: 0,
        personalTrainerId: 0
    });

    useEffect(() => {
        const fetchPrograms = async () => {
            const token = localStorage.getItem('token');
            const response = await fetch('https://afefitness2023.azurewebsites.net/api/WorkoutPrograms', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const text = await response.text();
            if (text) {
                const programs = JSON.parse(text);
                setWorkoutPrograms(programs);
            } else {
                console.log('No response body!');
            }
        };

        fetchPrograms();
    }, []);

    const handleProgramSelection = (workoutProgramId: number) => {
        const program = workoutPrograms.find(program => program.workoutProgramId === workoutProgramId);
        setSelectedProgram(program || null);
        console.log("Program: ", program)
        console.log("Selected Program: ", selectedProgram);
    };

    useEffect(() => {
        console.log("Selected Program2: ", selectedProgram);
    }, [selectedProgram]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setExercise(prevExercise => ({
            ...prevExercise,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (selectedProgram) {
            // Create a new exercise first    
            const token = localStorage.getItem('token');
            const url = `https://afefitness2023.azurewebsites.net/api/Exercises/Program/${selectedProgram.workoutProgramId}`; // use the selected program's ID in the URL    
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...exercise,
                    personalTrainerId: 1, // set your personal trainer ID    
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const newExercise = await response.json();

            // Then update the workout program with the new exercise  
            const updatedProgram = {
                ...selectedProgram,
                exercises: [...selectedProgram.exercises, newExercise] // use the newExercise returned from the server  
            };

            setSelectedProgram(updatedProgram);

            response = await fetch(`https://afefitness2023.azurewebsites.net/api/WorkoutPrograms/${updatedProgram.workoutProgramId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProgram),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            if (response.status !== 204) { // status 204 means 'No Content'  
                const data = await response.json();
                console.log(data);
            }

            // Add this line to give feedback to user.  
            alert(`Exercise was added to workout ${selectedProgram.name}`);
        }

        setExercise({
            exerciseId: 0,
            name: '',
            description: '',
            sets: 0,
            repetitions: 0,
            time: '',
            workoutProgramId: 0,
            personalTrainerId: 0
        });
    };


    return (
        <div className="formContainer" >
            <header>Add exercise to workout program</header>

            <select onChange={(e) => handleProgramSelection(Number(e.target.value))}>
                <option value="">Select a program</option>
                {workoutPrograms.map(program => (
                    <option key={program.workoutProgramId} value={program.workoutProgramId}>{program.name}</option>
                ))}
            </select>

            {selectedProgram && (
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" value={exercise.name} onChange={handleInputChange} placeholder="Exercise Name" required />
                    <textarea name="description" value={exercise.description} onChange={handleInputChange} placeholder="Exercise Description" required />
                    <input type="number" name="sets" value={exercise.sets} onChange={handleInputChange} placeholder="Sets" required />
                    <input type="number" name="repetitions" value={exercise.repetitions} onChange={handleInputChange} placeholder="Repetitions" required />
                    <input type="text" name="time" value={exercise.time} onChange={handleInputChange} placeholder="Time" required />
                    <button type="submit">Add Exercise</button>
                </form>
            )}
        </div>
    );
};

export default AddExerciseToProgram;  
