import { useState, FormEvent } from 'react';

interface Exercise {
    exerciseId: number;
    name: string;
    description: string;
    sets: number;
    repetitions: number;
    time: string;
}

const AddExercise = () => {
    const [exercise, setExercise] = useState<Exercise>({
        exerciseId: 0,
        name: '',
        description: '',
        sets: 0,
        repetitions: 0,
        time: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setExercise(prevExercise => ({
            ...prevExercise,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        try {
            const response = await fetch('https://afefitness2023.azurewebsites.net/api/Exercises', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(exercise),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setExercise({
                exerciseId: 0,
                name: '',
                description: '',
                sets: 0,
                repetitions: 0,
                time: '',
            });

        } catch (error) {
            console.error('There was an error adding the exercise:', error);
        }
    };

    return (
        <div className="formContainer">
            <header>Add exercise</header>

        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={exercise.name} onChange={handleInputChange} placeholder="Exercise Name" required />
            <textarea name="description" value={exercise.description} onChange={handleInputChange} placeholder="Exercise Description" required />
            <input type="number" name="sets" value={exercise.sets} onChange={handleInputChange} placeholder="Sets" required />
            <input type="number" name="repetitions" value={exercise.repetitions} onChange={handleInputChange} placeholder="Repetitions" required />
            <input type="text" name="time" value={exercise.time} onChange={handleInputChange} placeholder="Time" required />
            <button type="submit">Add Exercise</button>
        </form>
        </div>
    );
};

export default AddExercise;  
