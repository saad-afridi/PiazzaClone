import React from 'react';

// Material UI Components
import { Grid, Typography, Paper, TextField, Button } from '@material-ui/core';

// Theme and Styling
import { makeStyles } from '@material-ui/core/styles';

// Redux
import { useDispatch } from 'react-redux';
import { editPost } from '../../actions/postActions';

const useStyles = makeStyles((theme) => ({
	paperForm: {
		padding: '20px 10px',
	},
	contentForm: {
		width: 500,
		margin: '20px 0px',
	},
}));

export const EditStudentAnswerModal = (props) => {
	const classes = useStyles();
	const { onClose, post, courseID, index } = props;
	const [studAns, setStudAns] = React.useState(post.student_answer);

	// Redux
	const dispatch = useDispatch();

	const stateProps = {
		studAns,
		dispatch,
		post,
		onClose,
		courseID,
		index,
	};

	return (
		<Paper component="div" className={classes.paperForm}>
			<Grid
				container
				direction="column"
				justifyContent="flex-start"
				alignItems="stretch"
				spacing={4}>
				<Grid item>
					<Typography variant="h3">Edit Post</Typography>
				</Grid>
				<Grid item>
					<TextField
						defaultValue={studAns}
						autoFocus
						variant="filled"
						className={classes.contentForm}
						fullWidth
						multiline
						label="Student Answer"
						onChange={(e) => setStudAns(e.target.value)}
					/>
				</Grid>
				<Grid item>
					<Button
						variant="contained"
						color="primary"
						onClick={() => submitForm(stateProps)}>
						Confirm
					</Button>
				</Grid>
			</Grid>
		</Paper>
	);
};

const submitForm = (stateProps) => {
	const { studAns, onClose, dispatch, post, courseID, index } = stateProps;
	post.student_answer = studAns;
	const editPostThunk = editPost(post, courseID, index);
	dispatch(editPostThunk);
	onClose();
};

export default EditStudentAnswerModal;
