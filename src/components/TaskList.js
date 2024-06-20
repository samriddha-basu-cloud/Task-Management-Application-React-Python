import React from 'react';
import TaskItem from './TaskItem';
import { Grid, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    margin: 'auto',
    maxWidth: '100%',
  },
}));

const TaskList = ({ tasks }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={3} className={`${classes.gridContainer} mx-auto max-w-4xl`}>
      {tasks.map(task => (
        <Grid item xs={12} key={task.id}>
          <TaskItem task={task} />
        </Grid>
      ))}
    </Grid>
  );
};

export default TaskList;
