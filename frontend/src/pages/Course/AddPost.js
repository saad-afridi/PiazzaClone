import React from 'react';

import PageHeader from '../../components/utils/PageHeader';

import { Grid, TextField, makeStyles, Button } from '@material-ui/core';

import { useDispatch } from 'react-redux';

import { createPost } from '../../actions/postActions';
import { useHistory, useLocation } from 'react-router';

const useStyles = makeStyles((theme) => ({
	addPostForm: {
		backgroundColor: theme.palette.elevated[1],
		padding: '10px',
	},
}));

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const AddPost = () => {
	const classes = useStyles();
	const history = useHistory();
	let query = useQuery();

	const [summary, setSummary] = React.useState('');
	const [details, setDetails] = React.useState('');

	const dispatch = useDispatch();

	const stateProps = {
		summary,
		details,
		dispatch,
		courseID: query.get('id'),
		history,
	};

	return (
		<Grid container justifyContent="center" alignItems="center">
			<Grid item>
				<PageHeader label={'Create Post'} />
				<Grid
					container
					className={classes.addPostForm}
					direction="column"
					justifyContent="center"
					alignItems="center"
					spacing={3}>
					<Grid item>
						<TextField
							style={{ width: '500px' }}
							label="Summary"
							multiline
							onChange={(e) =>
								setSummary(e.target.value)
							}></TextField>
					</Grid>
					<Grid item>
						<TextField
							variant="filled"
							style={{ width: '500px' }}
							rows={5}
							label="Details"
							multiline
							onChange={(e) =>
								setDetails(e.target.value)
							}></TextField>
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
			</Grid>
		</Grid>
	);
};

const submitForm = (stateProps) => {
	const { summary, details, dispatch, courseID, history } = stateProps;
	const post = {
		summary,
		details,
		category: 'question',
		post_to: 'entire_class',
		follow_ups: [],
		student_answer: '',
		instructor_answer: '',
		marked_as_duplicate: false,
	};

	const createPostThunk = createPost(post, courseID, history);
	dispatch(createPostThunk);
};

export default AddPost;
