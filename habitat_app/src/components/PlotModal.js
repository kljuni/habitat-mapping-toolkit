import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    position: 'relative',
  },
  img: {
    maxWidth: window.innerWidth - '25vw',
  },
  x: {
    fontSize: 40,
    position: 'absolute',
    right: 10,
    top: -10,
    verticalAlign: 'middle',
    cursor: 'pointer',
  }
}));

const PlotModal = ({ open=true, plotData, handleOpen, handleClose }) => {
  const classes = useStyles();

  const created = new Date(plotData.createdAt)
  console.log(created)
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
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
          <div className={classes.paper}>    
            <h2 id="transition-modal-title">{plotData.title}</h2>
            <span 
              className={classes.x}
              onClick={() => handleClose()}
              aria-label="Close Account Info Modal Box"
              >&times;</span>
            <p id="transition-modal-description">{plotData.size_ha} ha</p>
            <p id="transition-modal-description"><b>Type: </b> {plotData.habitat_type}</p>
            <p id="transition-modal-description"><b>Region: </b>{plotData.region}</p>
            <p id="transition-modal-description"><b>Description: </b>{plotData.description}</p>
            <p id="transition-modal-description"><b>Created: </b>{created.toDateString()}</p>
            <div className={classes.img}>
              <img width="100%" height="auto" src={plotData.imageURL} alt='plot photo' />
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default PlotModal;