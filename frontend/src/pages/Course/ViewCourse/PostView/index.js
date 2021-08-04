import React from 'react';
import axios from 'axios';

import EditPostModal from '../../../../components/modals/EditPostModal';

import { Button, Grid, makeStyles, Modal } from '@material-ui/core';
import { yellow } from '@material-ui/core/colors';

import PostList from './PostList';
import SinglePostView from './SinglePostView';

const useStyles = makeStyles({
	postPageContainer: {
		margin: '80px 0px',
	},
	modalFormContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
});

const PostView = ({ courseID, history }) => {
	const classes = useStyles();
	const [posts, setPosts] = React.useState([
		{
			index: 0,
			category: 'question',
			post_to: 'entire_class',
			summary: 'Welcome!',
			details: 'No posts yet, Lets write some!',
			follow_ups: [],
			student_answer: '',
			instructor_answer: '',
		},
	]);
	const [postToShow, selectPostToShow] = React.useState(posts[0]);

	const [editModalOpen, setEditModalOpen] = React.useState(false);

	React.useEffect(() => {
		const fetchPostsFromAPI = async () => {
			try {
				const res = await axios.get(`/class/${courseID}/get-post`);
				setPosts(res.data);
				selectPostToShow(res.data[0]);
			} catch (err) {
				console.log(err.response);
			}
		};
		fetchPostsFromAPI();
	}, [courseID]);

	const handleAddNewPost = () => {
		history.push(`/create-post?id=${courseID}`);
	};

	const isEqualToSelectedPost = (post) => postToShow === post;

	return (
		<Grid
			container
			direction="column"
			className={classes.postPageContainer}>
			<Grid item>
				<Grid container direction="row" justifyContent="center">
					<Grid item>
						<Button
							style={{ marginRight: 'auto' }}
							variant="contained"
							color="primary"
							onClick={handleAddNewPost}>
							ADD POST
						</Button>
					</Grid>
					<Grid item>
						<Button
							variant="contained"
							style={{ backgroundColor: yellow[200] }}
							onClick={() => setEditModalOpen(true)}>
							EDIT POST
						</Button>
					</Grid>
					<Grid item></Grid>
				</Grid>
			</Grid>
			<Grid item>
				<Grid
					container
					style={{ margin: '10px 0px' }}
					direction="row"
					spacing={2}
					alignItems="flex-start">
					<Grid item>
						<PostList posts={posts} selectPost={selectPostToShow} />
					</Grid>
					<Grid item>
						<SinglePostView post={postToShow} />
					</Grid>
				</Grid>
			</Grid>
			<Modal
				className={classes.modalFormContainer}
				open={editModalOpen}
				onClose={() => setEditModalOpen(false)}>
				<EditPostModal
					onClose={() => setEditModalOpen(false)}
					post={postToShow}
					courseID={courseID}
					index={posts.findIndex(isEqualToSelectedPost)}
				/>
			</Modal>
		</Grid>
	);
};

export default PostView;
