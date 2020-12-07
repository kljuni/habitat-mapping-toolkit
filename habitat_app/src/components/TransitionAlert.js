import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: '1rem',
    marginBottom: '1rem',
  },
}));

const TransitionAlert = ({ open, setOpen, data_title, severity, error }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <Alert
          severity={severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {severity === 'error' ? error : null}
          {severity === 'success' ? `Plot "${data_title}" has been successfuly created` : null}
        </Alert>
      </Collapse>
    </div>
  );
}

export default TransitionAlert;