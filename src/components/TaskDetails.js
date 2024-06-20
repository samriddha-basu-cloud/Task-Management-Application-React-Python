import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, makeStyles, Modal, Backdrop, Fade } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
    padding: theme.spacing(3),
    boxShadow: theme.shadows[2],
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
  },
  description: {
    marginBottom: theme.spacing(2),
    whiteSpace: 'pre-wrap', // Allows the text to wrap and break at word boundaries
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3),
    maxWidth: '80%',
    maxHeight: '80%',
    overflowY: 'auto',
    outline: 'none',
    borderRadius: theme.shape.borderRadius,
  },
  modalTitle: {
    marginBottom: theme.spacing(2),
  },
}));

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
};

const calculateDaysLeft = (dueDate) => {
  const currentDate = new Date();
  const dueDateTime = new Date(dueDate);
  const timeDiff = dueDateTime.getTime() - currentDate.getTime();
  const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24)) - 1; // Convert milliseconds to days

  return daysLeft;
};

const DescriptionModal = ({ open, handleClose, description }) => {
  const classes = useStyles();

  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.modalContent}>
          <Typography variant="h5" component="h2" className={classes.modalTitle} gutterBottom>
            Full Description
          </Typography>
          <Typography variant="body1" className={classes.description}>
            {description}
          </Typography>
        </div>
      </Fade>
    </Modal>
  );
};

const TaskDetails = ({ task, onDelete }) => {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  // Format the due date to dd/mm/yyyy
  const formattedDueDate = formatDate(task.dueDate);

  // Calculate the number of days left to complete the task
  const daysLeft = calculateDaysLeft(task.dueDate);

  // Truncate the description to 25 characters and add "..." if it exceeds
  const truncatedDescription = task.description.length > 25 ? `${task.description.substring(0, 25)}...` : task.description;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {task.title}
        </Typography>
        <Typography variant="body1" className={classes.description}>
          {truncatedDescription}
          {task.description.length > 25 && (
            <Button color="primary" onClick={handleModalOpen}>
              View Full Description
            </Button>
          )}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          <strong>Due Date:</strong> {formattedDueDate} <br />
          <strong>Days Left:</strong> {daysLeft}
        </Typography>
        <DescriptionModal open={modalOpen} handleClose={handleModalClose} description={task.description} />
      </CardContent>
    </Card>
  );
};

export default TaskDetails;
