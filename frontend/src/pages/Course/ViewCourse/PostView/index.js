import React from 'react';
import axios from 'axios';

import { Grid } from '@material-ui/core';

import PostList from './PostList';
import SinglePostView from './SinglePostView';

const PostView = ({courseID}) => {

	const [posts, setPosts] = React.useState([
			{
				index: 0,
				category: 'question',
				post_to: 'entire_class',
				folder: 'general',
				summary: 'Welcome!',
				details: 'No posts yet, Lets write some!',
				follow_ups: [],
				student_answer: '',
				instructor_answer: '',
			},
		]);

	React.useEffect(() => {
        const fetchPostsFromAPI = async () => {
            try {
                const res = await axios.get(`/class/${courseID}/get-post`);
                console.log("RES", res.data);
                setPosts(res.data);
            } catch (err) {
                console.log(err.response);
            }
        }
        fetchPostsFromAPI();
	}, [courseID]);

	const [postToShow, selectPostToShow] = React.useState(posts[0]);
    console.log("POSTVIEW", posts);
	return (
		<Grid container style={{margin: "10px 0px"}} direction="row" spacnig={2} justifyContent="space-around" alignItems="flex-start">
			<Grid item>
				<PostList
					posts={posts}
					selectPost={selectPostToShow}
				/>
			</Grid>
			<Grid item>
				<SinglePostView post={postToShow} />
			</Grid>
		</Grid>
	);
};

export default PostView;
