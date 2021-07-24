import React from 'react'

import PageHeader from '../../components/utils/PageHeader'

import { Button, Grid } from '@material-ui/core'

import { useHistory } from 'react-router-dom'


const Auth = () => {
    let history = useHistory();

    const handleLogin = () => {
        history.push('/login')
    }

    const handleRegister = () => {
        history.push('/register')
    }

    return (
        <Grid item>
        <PageHeader label={"Login/Register"}></PageHeader>
		<Grid container spacing={3} justifyContent="center">
			<Grid item>
				<Button
					variant="contained"
					color="primary"
					onClick={handleLogin}>
					Login
				</Button>
			</Grid>
			<Grid item>
				<Button
					variant="contained"
					color="secondary"
					onClick={handleRegister}>
					Register
				</Button>
			</Grid>
		</Grid>
        </Grid>
	);
}

export default Auth;