import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const Filter = ({ setFilter, data, title }) => {

  const handleChange = (event) => {
    setFilter(event.target.value)
  };

    return (
        <div>
            <FormControl fullWidth>
            <InputLabel htmlFor="age-native-simple">{title}</InputLabel>
            <Select
                native             
                onChange={handleChange}
            >
                <option aria-label="None" value={'undefined'} />
                {
                    data ? (data.map(type => (
                        <option key={type} value={type}>{type}</option>
                    ))) 
                    : undefined
                }

            </Select>
            </FormControl>
        </div>
    );
}

export default Filter;