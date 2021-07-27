import React from 'react'

import {AppBar, Button, Typography, Toolbar} from '@material-ui/core'

const ViewCourse = () => {
    return (
		<div>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6">
						News
					</Typography>
					<Button color="inherit">Login</Button>
				</Toolbar>
			</AppBar>
		</div>
	);
}

export default ViewCourse;