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

export const AddReplyModal = (props) => {
	const classes = useStyles();
	const { onClose, post, courseID, index, user, followupIndex } = props;
	const [content, setContent] = React.useState('');

	// Redux
	const dispatch = useDispatch();

	const stateProps = {
		content,
		dispatch,
		post,
		onClose,
		courseID,
		index,
		user,
        followupIndex
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
					<Typography variant="h3">Add Reply</Typography>
				</Grid>
				<Grid item>
					<TextField
						autoFocus
						variant="filled"
						className={classes.contentForm}
						fullWidth
						multiline
						label="Reply"
						onChange={(e) => setContent(e.target.value)}
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
	const { content, onClose, dispatch, post, courseID, index, user, followupIndex } =
		stateProps;
    console.log("POST", post.follow_ups, followupIndex)
	post.follow_ups[followupIndex].replies.push({ content, name: user.name});
	const editPostThunk = editPost(post, courseID, index);
	dispatch(editPostThunk);
	onClose();
};

export default AddReplyModal;
