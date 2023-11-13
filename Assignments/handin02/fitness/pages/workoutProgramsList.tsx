import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@material-ui/core';
import axios from 'axios';

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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  progress: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
});

const WorkoutProgramsListPage: React.FC = () => {
  const classes = useStyles();
  const [workoutPrograms, setWorkoutPrograms] = useState<WorkoutProgram[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className={classes.progress}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Personal Trainer ID</TableCell>
            <TableCell>Client ID</TableCell>
            <TableCell>Exercises</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workoutPrograms.map((program) => (
            <TableRow key={program.workoutProgramId}>
              <TableCell>{program.workoutProgramId}</TableCell>
              <TableCell>{program.name}</TableCell>
              <TableCell>{program.description}</TableCell>
              <TableCell>{program.personalTrainerId}</TableCell>
              <TableCell>{program.clientId}</TableCell>
              <TableCell>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Sets</TableCell>
                      <TableCell>Repetitions</TableCell>
                      <TableCell>Time</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {program.exercises.map((exercise) => (
                      <TableRow key={exercise.exerciseId}>
                        <TableCell>{exercise.exerciseId}</TableCell>
                        <TableCell>{exercise.name}</TableCell>
                        <TableCell>{exercise.description}</TableCell>
                        <TableCell>{exercise.sets}</TableCell>
                        <TableCell>{exercise.repetitions}</TableCell>
                        <TableCell>{exercise.time}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default WorkoutProgramsListPage;    
