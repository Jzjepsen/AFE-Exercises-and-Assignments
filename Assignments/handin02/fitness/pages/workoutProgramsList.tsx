import React, { useEffect, useState } from 'react';
import { Box, Select, MenuItem } from '@mui/material';
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { SelectChangeEvent } from '@mui/material';


interface Exercise {
  exerciseId: number;
  name: string;
  description: string;
  sets: number | null;
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

const ExerciseRow: React.FC<{ exercise: Exercise, index: number }> = ({ exercise, index }) => {
  return (
    <TableRow key={index}>
      <TableCell style={{ color: 'white' }}>{exercise.exerciseId}</TableCell>
      <TableCell style={{ color: 'white' }}>{exercise.name}</TableCell>
      <TableCell style={{ color: 'white' }}>{exercise.description}</TableCell>
      <TableCell style={{ color: 'white' }}>{exercise.sets}</TableCell>
      <TableCell style={{ color: 'white' }}>{exercise.repetitions}</TableCell>
      <TableCell style={{ color: 'white' }}>{exercise.time}</TableCell>
    </TableRow>
  );
};

const WorkoutProgramsListPage: React.FC = () => {
  const [workoutPrograms, setWorkoutPrograms] = useState<WorkoutProgram[]>([]);
  const [selectedProgram, setSelectedProgram] = useState<WorkoutProgram | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // Check if code is running on the client-side  
    if (typeof window !== "undefined") {
      const token = localStorage.getItem('token');
      axios.get<WorkoutProgram[]>('https://afefitness2023.azurewebsites.net/api/WorkoutPrograms', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then(response => {
          setWorkoutPrograms(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
    }
  }, []);

  const handleSelectChange = (event: SelectChangeEvent<number>) => {
    const programId = event.target.value;
    const program = workoutPrograms.find(p => p.workoutProgramId === programId);
    setSelectedProgram(program || null);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="formContainer">
      <Box display="flex" justifyContent="center" alignItems="center" marginTop="2rem">
        <Select
          sx={{
            backgroundColor: 'lightblue',
            width: '200px',
            marginBottom: '2rem',
          }}
          value={selectedProgram?.workoutProgramId || ''}
          onChange={handleSelectChange}
          displayEmpty
        >
          <MenuItem value="" disabled>
            Please pick a program
          </MenuItem>
          {workoutPrograms.map(program => (
            <MenuItem value={program.workoutProgramId} key={program.workoutProgramId}>
              {program.name}
            </MenuItem>
          ))}
        </Select>
      </Box>
      {selectedProgram && (
        <Table
          sx={{
            maxWidth: '80%',
            margin: 'auto',
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell style={{ color: 'white' }}>ID</TableCell>
              <TableCell style={{ color: 'white' }}>Name</TableCell>
              <TableCell style={{ color: 'white' }}>Description</TableCell>
              <TableCell style={{ color: 'white' }}>Sets</TableCell>
              <TableCell style={{ color: 'white' }}>Repetitions</TableCell>
              <TableCell style={{ color: 'white' }}>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedProgram.exercises.map((exercise, index) => (
              <ExerciseRow key={index} exercise={exercise} index={index} />
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export default WorkoutProgramsListPage;  
