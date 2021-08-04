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

export const EditPostModal = (props) => {
	const classes = useStyles();
	const { onClose, post, courseID, index } = props;
	const [summary, setSummary] = React.useState(post.summary);
	const [details, setDetails] = React.useState(post.details);

	// Redux
	const dispatch = useDispatch();

	const stateProps = {
		summary,
		details,
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
						defaultValue={summary}
						autoFocus
						variant="filled"
						className={classes.contentForm}
						fullWidth
						multiline
						label="Summary"
						onChange={(e) => setSummary(e.target.value)}
					/>
				</Grid>
				<Grid item>
					<TextField
						defaultValue={details}
						autoFocus
						variant="filled"
						className={classes.contentForm}
						fullWidth
						multiline
						rows={5}
						label="Details"
						onChange={(e) => setDetails(e.target.value)}
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
	const { summary, details, onClose, dispatch, post, courseID, index } =
		stateProps;
	post.summary = summary;
	post.details = details;
	const editPostThunk = editPost(post, courseID, index);
	dispatch(editPostThunk);
	onClose();
};

export default EditPostModal;
