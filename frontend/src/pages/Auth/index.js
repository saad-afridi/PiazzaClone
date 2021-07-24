import React from 'react'

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
        <Grid container>
            <Grid item>
                <Button onClick={handleLogin}>
                    Login 
                </Button>
            </Grid>
            <Grid item>
                <Button onClick={handleRegister}>
                    Register
                </Button>
            </Grid>
        </Grid>
    )
}

export default Auth;