import React, { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { Container, Typography, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2), // Adjust top margin for spacing from top of the viewport
    marginBottom: theme.spacing(3), // Adjust bottom margin for spacing from bottom of the viewport
    padding: theme.spacing(3), // Padding inside the container
    boxShadow: theme.shadows[2], // Add shadow for depth
    borderRadius: theme.shape.borderRadius, // Rounded corners
    backgroundColor: theme.palette.background.paper, // White background
  },
  title: {
    marginBottom: theme.spacing(4), // Space between title and form
    fontFamily: 'Georgia, serif', // Apply Georgia font
  },
  heading: {
    marginBottom: theme.spacing(2), // Space between heading and task list
    fontFamily: 'Georgia, serif', // Apply Georgia font
  },
  noTasksMessage: {
    marginTop: theme.spacing(2), // Space above the message
    textAlign: 'center',
    color: theme.palette.text.secondary,
    fontFamily: 'Georgia, serif', // Apply Georgia font
  },
  taskList: {
    maxHeight: '320px', // Set a fixed height for the task list
    overflowY: 'auto', // Enable vertical scrolling
    marginBottom: theme.spacing(2), // Add bottom margin for spacing
  },
}));

const LandingPage = () => {
  const classes = useStyles();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from the API
    fetch('http://127.0.0.1:5000/api/tasks')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const addTask = (task) => {
    // API call to add a task
    fetch('http://127.0.0.1:5000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })
      .then(response => response.json())
      .then(newTask => setTasks([...tasks, newTask]))
      .catch(error => console.error('Error adding task:', error));
  };

  const deleteTask = (id) => {
    // API call to delete the task
    fetch(`http://127.0.0.1:5000/api/tasks/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        // After successful deletion, update the tasks list
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
      })
      .catch(error => console.error('Error deleting task:', error));
  };

  return (
    <Container maxWidth="md" className={`${classes.container} mx-auto`}>
      <Typography variant="h3" align="center" className={classes.title} gutterBottom>
        Task Management
      </Typography>
      <Box mt={6}> {/* Margin top for spacing between form and task list */}
        <TaskForm onSubmit={addTask} />
      </Box>
      <Typography variant="h4" className={classes.heading} style={{ marginTop: '20px', textAlign: 'center' }}>
        Tasks
      </Typography>
      <Box className={classes.taskList}>
        {tasks.length === 0 ? (
          <Typography variant="body1" className={classes.noTasksMessage}>
            No tasks as of now. Add tasks by filling the form above.
          </Typography>
        ) : (
          <TaskList tasks={tasks} onDelete={deleteTask} />
        )}
      </Box>
    </Container>
  );
};

export default LandingPage;
