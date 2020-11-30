import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const TransitionAlert = ({ open, setOpen, data_title, severity, error }) => {
  const classes = useStyles();
//   const [open, setOpen] = React.useState(true);

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
      {/* <Button
        disabled={open}
        variant="outlined"
        onClick={() => {
          setOpen(true);
        }}
      >
        Re-open
      </Button> */}
    </div>
  );
}

export default TransitionAlert;