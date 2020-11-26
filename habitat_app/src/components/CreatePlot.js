import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import { habitat_types } from './Util';
import { connect } from 'react-redux';
import { setCreatePlot } from '../Create/actions';

const mapStateToProps = state => {
    return {
        data: state.createPlot.data,
        error: state.createPlot.error ? "Wrong user credentials" : null,
        loading: state.createPlot.loading,
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

const CreatePlot = ({ handleSave }) => {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [type, setType] = useState(null);
    const [url, setUrl] = useState(null);
    const handleSubmit = (e, name, desc, type, url) => {
        e.preventDefault();
        handleSave(name, desc, type, url);
    };
    const select = habitat_types.map(el => {
        return(
            <MenuItem key={el} value={el+""}>{el}</MenuItem>
        )
    });
    const classes = useStyles();
    return (
        <form onSubmit={(e) => handleSubmit(e, name, desc, type, url)} noValidate autoComplete="off">
            <div>
                <TextField 
                    fullWidth={true}
                    id="standard-basic" 
                    label="Local name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                />
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Biotop type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
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
                <Button type="submit" >Save plot</Button>
            </div>
        </form>
    )
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePlot);