import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Typography, makeStyles, Button } from '@material-ui/core';
import TaskDetails from '../components/TaskDetails';
import TaskForm from '../components/TaskForm';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    padding: theme.spacing(3),
    boxShadow: theme.shadows[2],
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    fontFamily: 'Georgia, serif', // Apply Georgia font
    position: 'relative', // Ensure position for absolute back button
  },
  title: {
    fontFamily: 'Georgia, serif',
    marginBottom: theme.spacing(4),
  },
  buttonGroup: {
    fontFamily: 'Georgia, serif',
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(2),
  },
  backButton: {
    position: 'absolute',
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
}));

const TaskPage = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    // Fetch task details from the API
    fetch(`http://127.0.0.1:5000/api/tasks/${id}`)
      .then(response => response.json())
      .then(data => setTask(data))
      .catch(error => console.error('Error fetching task:', error));
  }, [id]);

  const updateTask = (updatedTask) => {
    // API call to update the task
    fetch(`http://127.0.0.1:5000/api/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    })
    .then(response => response.json())
    .then(data => setTask(data))
    .catch(error => console.error('Error updating task:', error));
  };

  const deleteTask = () => {
    // API call to delete the task
    fetch(`http://127.0.0.1:5000/api/tasks/${id}`, {
      method: 'DELETE',
    })
    .then(() => window.location.href = '/')
    .catch(error => console.error('Error deleting task:', error));
  };

  if (!task) return <div>Loading...</div>;

  return (
    <Container maxWidth="md" className={`${classes.container} mx-auto`}>
      <Link to="/" className={classes.backButton}>
        <Button variant="contained" color="primary">
            <ArrowBackIcon />
        </Button>
        </Link>
      <Typography variant="h3" align="center" className={classes.title} gutterBottom>
        Task Details
      </Typography>
      <TaskDetails task={task} onDelete={deleteTask} />
      <TaskForm task={task} onSubmit={updateTask} />
      <div className={classes.buttonGroup}>
        <Button variant="contained" color="secondary" onClick={deleteTask}>
          Delete Task
        </Button>
      </div>
    </Container>
  );
};

export default TaskPage;
