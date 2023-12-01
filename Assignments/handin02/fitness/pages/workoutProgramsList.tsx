import React, { useEffect, useState } from 'react';
import { Box, Typography, Select, MenuItem, makeStyles } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

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

// Styles  
const useStyles = makeStyles({
  select: {
    backgroundColor: 'lightblue',
    width: '200px',
    marginBottom: '2rem',
  },
  table: {
    maxWidth: '80%',
    margin: 'auto',
  }
});

const WorkoutProgramsListPage: React.FC = () => {
  const [workoutPrograms, setWorkoutPrograms] = useState<WorkoutProgram[]>([]);
  const [selectedProgram, setSelectedProgram] = useState<WorkoutProgram | null>(null);
  const [loading, setLoading] = useState(true);

  const classes = useStyles();

  useEffect(() => {
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
  }, []);

  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const programId = event.target.value as number;
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
          className={classes.select}
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
        <Table className={classes.table}>
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
