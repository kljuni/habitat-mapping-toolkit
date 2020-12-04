import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { download } from './Util';
import { connect } from 'react-redux';
import { setDownloadPlot } from '../Search/actions';
import { isMobile } from 'react-device-detect';

const mapDispatchToProps = (dispatch) => {
  return {
    downloadShp: (id, title) => dispatch(setDownloadPlot(id, title)),
  }
}

const useStyles = makeStyles((theme) => ({
  // modal_mobile:{
  //   position:'absolute',
  //   top: 16,
  //   left: 16,
  //   border: '1px solid gray',
  //   overflow:'scroll',
  //   maxHeight: window.innerHeight - 32,
  //   width: isMobile ? window.innerWidth - 32 : 500,
  //   display:'block',
  //   backgroundColor: 'white',
  // },
  // header: {
  //   padding: '12px 0',
  //   borderBottom: '1px solid darkgrey'
  // },
  // content: {
  //   padding: 12,
  //   backgroundColor: 'white',
  // },
  modal_desk: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'scroll',
  },
  paper: {
    maxWidth: isMobile ? window.innerWidth : '600px',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    position: 'relative',    
    margin: 'auto',
  },
  img: {
    maxWidth: isMobile ? window.innerWidth - 64 : '500px',
  },
  x: {
    fontSize: 40,
    position: 'absolute',
    right: 10,
    top: -10,
    verticalAlign: 'middle',
    cursor: 'pointer',
  },
  title: {
    display: 'inline',
  },
  icon: {
    paddingLeft: '0.5rem',
    cursor: 'pointer',
  }
}));

const PlotModal = ({ open=true, plotData, error, handleClose, downloadShp }) => {
  const classes = useStyles();

  const created = new Date(plotData.createdAt)
  console.log(plotData)
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal_desk}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        fullWidth={true}
        maxWidth = {'md'}
      >
        <Fade in={open}>
              
            <div className={classes.paper}>
              <div className={classes.content}>
                <h2 className={classes.title} id="transition-modal-title">{plotData.title}</h2>
                <span 
                  onClick={() => downloadShp(plotData.id, plotData.title)}
                  className={classes.icon} 
                >{download}</span>           
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
                <img className={classes.img} src={plotData.imageURL} alt='plot photo' />
              </div>
            </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(PlotModal);