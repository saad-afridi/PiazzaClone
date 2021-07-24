import React from 'react';

import { Typography } from '@material-ui/core';

// Theme and Styling
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	titleContainer: {
		margin: '100px 0px 30px 0px',
	},
});

const PageHeader = ({ label }) => {
	const classes = useStyles();
	return (
		<Typography
			variant="h3"
			className={classes.titleContainer}>
			{label}
		</Typography>
	);
};

export default PageHeader;
