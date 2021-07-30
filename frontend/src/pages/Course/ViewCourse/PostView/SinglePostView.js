import React from 'react';

import { Grid, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
        backgroundColor: theme.palette.elevated[1],
        padding: '10px',
        width:"1033px"
    },
}));

const SinglePostView = (props) => {
	const classes = useStyles();
	const { post } = props;
    console.log('POST', post);
	return (
		<Grid
			container
			direction="column"
			className={classes.root}
			spacing={2}>
            <Grid item>
                <Typography variant="h6" color="secondary">{'@'+post.index}</Typography>
            </Grid>
			<Grid item>
				<InfoBox header={'FOLDER:'} info={post.folder} />
			</Grid>
			<Grid item>
				<Typography variant="h3">{post.summary}</Typography>
			</Grid>
			<Grid item>
				<Typography variant="h5">{post.details}</Typography>
			</Grid>
			<Grid item>
				<InfoBox header={'STUDENT ANSWER'} info={post.student_answer} />
			</Grid>
			<Grid item>
				<InfoBox header={'INSTRUCTOR ANSWER'} info={post.instructor_answer} />
			</Grid>
            <Grid item>
                {post.follow_ups.length > 0 ? <FollowUpsList followups={post.follow_ups} /> : ''}
            </Grid>
		</Grid>
	);
};


const InfoBox = ({direction, header, info, headerSize, infoSize, headerColor, infoColor}) => {
    return (
			<Grid container direction="column">
                <Grid item>
                    <Typography variant="h6" color="primary">{header.toUpperCase()}</Typography>
                </Grid>
                <Grid item>
                    <Typography variant="h5">{info}</Typography>
                </Grid>
            </Grid>
	);
}

const FollowUpsList = ({followups}) => {
    return ( 
        <Grid container direction="column">
            <Grid item>
                <Typography variant="h6" color="primary">{"FOLLOW-UPS"}</Typography>
            </Grid>
            <Grid item>
                <Grid container direction="column">
                    {followups.map((_follow_up, _index) => {
                        return (
                            <Grid item key={_index}>
                                <Typography variant="h5">{_follow_up}</Typography>
                            </Grid>
                        )
                    })}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default SinglePostView;
