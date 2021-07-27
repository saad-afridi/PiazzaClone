import React from 'react'

import { Grid, Typography, makeStyles } from '@material-ui/core'

import { useDispatch, useSelector } from 'react-redux';
import userReducers from '../../../reducers/userReducers';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.elevated[1],
        margin: "10px 0px",
        borderRadius: "15px",
        padding: '10px'
    },
}));

const EnrollCourseItem = ({course}) => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const userstate = useSelector(state => state.userState);



    console.log(course);
    return (
		<Grid item>
			<Grid
				container
				direction="column"
				spacing={2}
				className={classes.root}>
				<Grid item>
					<ObjToTextField
						keyText={'NAME'}
						valueText={course.class_name}
					/>
				</Grid>
				<Grid item>
					<ObjToTextField
						keyText={'NUM'}
						valueText={course.class_num}
					/>
				</Grid>
				<Grid item>
					<ObjToTextField
						keyText={'ESTIMATED ENROLLMENT'}
						valueText={course.estimated_enroll}
					/>
				</Grid>
				<Grid item>
					<ObjToTextField
						keyText={'TERM'}
						valueText={course.term}
					/>
				</Grid>
			</Grid>
		</Grid>
	);
}

const ObjToTextField = ({keyText, valueText}) => {
    return (
    <Grid container direction="row" spacing={2}>
		<Grid item>
			<Typography noWrap color="primary" variant="h6">
				{keyText + ':'}
			</Typography>
		</Grid>
		<Grid item>
			<Typography noWrap color="default" variant="h5">
				{valueText}
			</Typography>
		</Grid>
	</Grid>
    )
}

const enrollInCourse = (e, stateProps) => {

}

export default EnrollCourseItem;