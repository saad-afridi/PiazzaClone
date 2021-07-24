import React from 'react';
import PageHeader from '../../components/utils/PageHeader';
import { Grid, Typography, TextField, Button } from '@material-ui/core';

const Login = () => {
	const [email, setEmail] = React.useState('');
	const [pass, setPass] = React.useState('');

	return (
		<Grid item>
			<PageHeader label={'Login'}></PageHeader>
			<Grid container direction="column" spacing={3}>
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
						onClick={(e) => submitForm(e)}>
						Confirm
					</Button>
				</Grid>
			</Grid>
		</Grid>
	);
};

const submitForm = () => {
	console.log('submitting form!');
};

export default Login;
