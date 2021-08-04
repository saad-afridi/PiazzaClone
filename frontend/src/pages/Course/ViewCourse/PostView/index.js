import React from 'react';
import axios from 'axios';

import { Button, Grid, makeStyles} from '@material-ui/core';

import PostList from './PostList';
import SinglePostView from './SinglePostView';

const useStyles = makeStyles({
	postPageContainer: {
		margin: '80px 0px',
	},
	modalFormContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
});

const PostView = ({ courseID, history, user }) => {
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
				<Grid container direction="row">
					<Grid item>
						<Button
							size="small"
							style={{ marginLeft: '5px' }}
							variant="contained"
							color="primary"
							onClick={handleAddNewPost}>
							ADD POST
						</Button>
					</Grid>
				</Grid>
			</Grid>
			<Grid item>
				<Grid
					container
					style={{ margin: '10px 0px' }}
					direction="row"
					spacing={2}
					alignItems="flex-start"
                    justify="space-between"
                    >
					<Grid item>
						<PostList posts={posts} selectPost={selectPostToShow} />
					</Grid>
					<Grid item xs={6} sm={7} md={8}  lg={9}>
						<SinglePostView
							post={postToShow}
							index={posts.findIndex(isEqualToSelectedPost)}
							courseID={courseID}
                            user={user}
						/>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default PostView;
