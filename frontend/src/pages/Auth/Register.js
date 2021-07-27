import React from 'react';
import PageHeader from '../../components/utils/PageHeader';
import {
	Grid,
	TextField,
	Button,
	makeStyles,
	InputLabel,
	FormControl,
	MenuItem,
	Select,
} from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { tryRegister } from '../../actions/authActions';

import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
	registerForm: {
		backgroundColor: theme.palette.elevated[1],
		minWidth: '250px',
	},
}));

const Register = () => {
	const classes = useStyles();

	const [name, setName] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [pass, setPass] = React.useState('');
	const [category, setCategory] = React.useState('student');

	const dispatch = useDispatch();
	const history = useHistory();

	const stateProps = { name, email, pass, category, dispatch, history };

	// Error Handling
	const authErrors = useSelector((state) => state.errorState);

	const emailHasError = authErrors.email.length > 0;
	const passHasError = authErrors.password.length > 0;

	let emailErrorText = authErrors.email;
	let passErrorText = authErrors.password;

	return (
		<Grid container justify="center" alignItems="center">
			<Grid item>
				<PageHeader label={'Register'}></PageHeader>
				<Grid
					container
					direction="column"
					spacing={3}
					className={classes.registerForm}
					alignItems="center">
					<Grid item>
						<FormControl>
							<InputLabel>Category</InputLabel>
							<Select
								value={category}
								onChange={(e) => setCategory(e.target.value)}>
								<MenuItem value={'student'}>Student</MenuItem>
								<MenuItem value={'instructor'}>
									Instructor
								</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item>
						<TextField
							variant="filled"
							label="Full Name"
							onChange={(e) => setName(e.target.value)}
						/>
					</Grid>
					<Grid item>
						<TextField
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
	const { category, email, pass, name, dispatch, history } = stateProps;
	dispatch(
		tryRegister({
			category,
			email,
			password: pass,
			name,
			courses: [],
		}, history)
	);
};

export default Register;
