import React from 'react';
import PageHeader from '../../components/utils/PageHeader';
import { Grid, TextField, Button, makeStyles } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { tryLogin } from '../../actions/authActions';

import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
	loginForm: {
		backgroundColor: theme.palette.elevated[1],
		minWidth: '250px',
		padding: '5px 0px',
	},
}));

const Login = () => {
	const classes = useStyles();
	const [email, setEmail] = React.useState('');
	const [pass, setPass] = React.useState('');

	const dispatch = useDispatch();
	const history = useHistory();

	const stateProps = { email, pass, dispatch, history };

	// Error Handling
	const authErrors = useSelector((state) => state.errorState);

	const emailHasError = authErrors.email.length > 0;
	const passHasError = authErrors.password.length > 0;

	let emailErrorText = authErrors.email;
	let passErrorText = authErrors.password;

	return (
		<Grid container alignItems="center" justifyContent="center">
			<Grid item>
				<PageHeader label={'Login'}></PageHeader>
				<Grid
					container
					direction="column"
					spacing={3}
					className={classes.loginForm}
					justifyContent="center"
					alignItems="center">
					<Grid item>
						<TextField
							fullWidth={true}
							variant="filled"
							label="Email"
							onChange={(e) => setEmail(e.target.value)}
							error={emailHasError}
							helperText={emailErrorText}
						/>
					</Grid>
					<Grid item>
						<TextField
							variant="filled"
							label="Password"
							type="password"
							onChange={(e) => setPass(e.target.value)}
							error={passHasError}
							helperText={passErrorText}
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
		</Grid>
	);
};

const submitForm = (stateProps) => {
	const { email, pass, dispatch, history } = stateProps;
	dispatch(tryLogin({ email, password: pass }, history));
};

export default Login;
