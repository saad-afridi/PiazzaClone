import React from 'react';

import { Grid, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
        backgroundColor: theme.palette.elevated[1],
        marginRight:'auto',
        padding: '10px'
    },
}));

const SinglePostView = (props) => {
	const classes = useStyles();
	const { post } = props;

	return (
		<Grid container direction="column" className={classes.root}>
			<Grid item>
				<Typography>{'POST #: ' + post.index}</Typography>
			</Grid>
			<Grid item>
				<Typography>{post.folder}</Typography>
			</Grid>
			<Grid item>
				<Typography>{post.post_to}</Typography>
			</Grid>
			<Grid item>
				<Typography>{post.summary}</Typography>
			</Grid>
			<Grid item>
				<Typography>{post.details}</Typography>
			</Grid>
		</Grid>
	);
};

export default SinglePostView;
