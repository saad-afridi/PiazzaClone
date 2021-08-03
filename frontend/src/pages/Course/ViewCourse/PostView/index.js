import React from 'react';
import axios from 'axios';

import { Grid, makeStyles } from '@material-ui/core';

import PostList from './PostList';
import SinglePostView from './SinglePostView';

const useStyles = makeStyles({
    postPageContainer: {
        margin: '80px 0px'
    }
})


const PostView = ({ courseID }) => {
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
                selectPostToShow(res.data[0])
			} catch (err) {
				console.log(err.response);
			}
		};
		fetchPostsFromAPI();
	}, [courseID]);
	console.log('POSTVIEW', posts);
    
	return (
		<Grid container direction="column" className={classes.postPageContainer}>
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
		</Grid>
	);
};

export default PostView;
