import React from 'react';
import AppRouter from './AppRouter';

import { Grid } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { teal, grey } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';

let theme = createTheme({
	palette: {
		primary: {
			main: '#8bbee9',
			contrastText: grey[900],
		},
		secondary: {
			main: teal['A400'],
		},
		type: 'dark',
		background: {
			default: '#14121f',
		},
		elevated: {
			1: '#283140',
			2: '#3c4960',
			3: '#43526c',
		},
		text: {
			primary: '#FFFFFFCC',
		},
	},
});

function App() {
	return (
        <ThemeProvider theme={theme}>
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            />
            <CssBaseline />
            <AppRouter />
        </ThemeProvider>
	);
}

export default App;
