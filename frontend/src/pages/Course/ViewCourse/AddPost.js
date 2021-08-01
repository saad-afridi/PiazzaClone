import React from 'react'

import { Grid, TextField, makeStyles, Button } from '@material-ui/core'

import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    addPostForm: {

    }
}))

const AddPost = () => {
    const classes = useStyles();
    const [summary, setSummary] = React.useState('');
    const [details, setDetails] = React.useState('');

    const dispatch = useDispatch();

    const stateProps = { summary, details, dispatch };

    return (
        <Grid container className={classes.addPostForm} direction="column" spacing={1}>
            <Grid item>
                <TextField label="Summary" fullWidth variant="contained" onChange={(e) => setSummary(e.target.value)}></TextField>
            </Grid>
            <Grid item>
                <TextField label="Details" fullWidth variant="contained" onChange={(e) => setDetails(e.target.value)}></TextField>
            </Grid>
            <Grid item>
                <Button variant="contained" color="primary" onClick={() => submitForm(stateProps)}>
                  Confirm
                </Button>
            </Grid>
        </Grid>
    )
}

const submitForm = (stateProps) => {
    const { summary, details, dispatch } = stateProps;
}

export default AddPost;