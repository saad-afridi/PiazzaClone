import React from "react";
import AppRouter from "./AppRouter";

import { Container } from "@material-ui/core";
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import { teal, grey } from '@material-ui/core/colors'
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
	}
});

function App() {
  return (
		<div className="App">
			<Container>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <AppRouter />
                </ThemeProvider>
            </Container>
		</div>
  );
}

export default App;
