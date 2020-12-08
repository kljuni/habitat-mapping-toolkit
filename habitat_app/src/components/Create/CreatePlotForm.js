import { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Select from '@material-ui/core/Select';
import { habitat_types } from '../Util';
import { connect, useDispatch } from 'react-redux';
import { setCreatePlot } from '../../Create/actions';
import TransitionAlert from '../TransitionAlert';
import { CREATE_DEFAULTS } from '../../constants';

const mapStateToProps = state => {
    return {
        data_title: state.createPlot.data_title,
        data_created: state.createPlot.data_created,
        error: state.createPlot.error,
        loading: state.createPlot.loading,
        refresh: state.createPlot.refresh,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleSave: (name, desc, type, url) => dispatch(setCreatePlot(name, desc, type, url)),
    }
};

const useStyles = makeStyles((theme) => ({
    formControl: {
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
}));

const CreatePlotForm = ({ handleSave, data_created, data_title, error, onPlotSave, refresh }) => {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [type, setType] = useState(null);
    const [url, setUrl] = useState(null);
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState('');
    const dispatch = useDispatch();
    useEffect(() => {
        if (data_created) {
            setName('');
            setDesc('');
            setType(null);
            setUrl('');
            setOpen(true);
            setSeverity('success');
            setTimeout(function(){ setOpen(false); }, 5000);
        }
        if (error) {
            setOpen(true);
            setSeverity('error');
            setTimeout(function(){ setOpen(false); }, 5000);
        }
        setTimeout(function(){ dispatch({ type: CREATE_DEFAULTS }); }, 5000);
    }, [refresh])

    const handleSubmit = (e, name, desc, type, url) => {
        e.preventDefault();
        onPlotSave();
        handleSave(name, desc, type, url);
    };

    const select = habitat_types.map(el => {
        return(
            <MenuItem key={el} value={el+""}>{el}</MenuItem>
        )
    });
    const classes = useStyles();
    return (
            <form onSubmit={(e) => handleSubmit(e, name, desc, type, url)} autoComplete="off">
                <TransitionAlert 
                    className={classes.alert}
                    open={open} 
                    setOpen={setOpen} 
                    data_title={data_title}
                    error={error}
                    severity={severity}
                />
                <TextField 
                    fullWidth={true}
                    id="standard-basic" 
                    label="Local name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <TextField
                    fullWidth={true}
                    id="standard-multiline-flexible"
                    label="Habitat description"
                    multiline
                    rows={4}
                    rowsMax={5}
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    required
                />
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Biotop type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        required
                    >
                    {select}
                    </Select>
                </FormControl>
                <TextField 
                    fullWidth={true}
                    id="standard-basic" 
                    label="Habitat photo URL" 
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <Box my={4}>
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="secondary">
                            Save plot
                    </Button>
                </Box>                    
            </form>
    )
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePlotForm);