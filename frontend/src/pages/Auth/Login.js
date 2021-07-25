import React from 'react';
import PageHeader from '../../components/utils/PageHeader';
import { Grid, TextField, Button, makeStyles } from '@material-ui/core';

import { useDispatch } from 'react-redux'
import { tryLogin } from '../../actions/authActions'

const useStyles = makeStyles((theme) => ({
    loginForm: {
        backgroundColor: theme.palette.elevated[1]
    }
}));

const Login = () => {
    const classes = useStyles();
	const [email, setEmail] = React.useState('');
	const [pass, setPass] = React.useState('');

    const dispatch = useDispatch();

    const stateProps = { email, pass, dispatch };

	return (
		<Grid item>
			<PageHeader label={'Login'}></PageHeader>
			<Grid container direction="column" spacing={3} className={classes.loginForm}>
				<Grid item>
					<TextField
						variant="filled"
						label="Email"
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Grid>
				<Grid item>
					<TextField
						variant="filled"
						label="Password"
						type="password"
						onChange={(e) => setPass(e.target.value)}
					/>
				</Grid>
				<Grid item>
					<Button
						variant="contained"
						color="primary"
						onClick={() => submitForm(stateProps)}>
						Confirm
					</Button>
				</Grid>
			</Grid>
		</Grid>
	);
};

const submitForm = (stateProps) => {

    const {email, pass, dispatch} = stateProps;
    dispatch(tryLogin({email, password: pass}));
	console.log('submitting form!');
};

export default Login;
