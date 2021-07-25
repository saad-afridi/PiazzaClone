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

import { useDispatch } from 'react-redux';
import { tryRegister } from '../../actions/authActions';

import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
	loginForm: {
		backgroundColor: theme.palette.elevated[1],
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

	return (
		<Grid item>
			<PageHeader label={'Register'}></PageHeader>
			<Grid
				container
				direction="column"
				spacing={3}
				className={classes.loginForm}>
				<Grid item>
					<FormControl>
						<InputLabel>Category</InputLabel>
						<Select
							value={category}
							onChange={(e) => setCategory(e.target.value)}>
							<MenuItem value={'student'}>Student</MenuItem>
							<MenuItem value={'instructor'}>Instructor</MenuItem>
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
