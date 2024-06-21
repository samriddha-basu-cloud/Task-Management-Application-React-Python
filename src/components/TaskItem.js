import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: '100%',
    margin: 'auto',
    marginBottom: theme.spacing(4),
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.02)',
    },
    position: 'relative', // Ensure position for absolute delete button
  },
  content: {
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(3), // Increase bottom padding for spacing with button
  },
  title: {
    marginBottom: theme.spacing(2),
    fontFamily: 'Georgia, serif', // Apply Georgia font to title
  },
  description: {
    marginBottom: theme.spacing(2),
    fontFamily: 'Georgia, serif', // Apply Georgia font to description
  },
  button: {
    marginTop: theme.spacing(2),
  },
  deleteButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: theme.palette.error.main,
  },
}));

const TaskItem = ({ task, onDelete }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <Typography variant="h5" component="h2" className={classes.title}>
          {task.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" className={classes.description}>
          {task.description.length > 100 ? `${task.description.substring(0, 100)}...` : task.description}
        </Typography>
        <Link to={`/task/${task.id}`}>
          <Button variant="contained" color="primary" className={classes.button}>
            View Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default TaskItem;
