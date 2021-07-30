import React from 'react';

import { Grid, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	postListRoot: {
		backgroundColor: theme.palette.elevated[2],
	},
	postRoot: {
		backgroundColor: theme.palette.elevated[3],
		padding: '5px',
		width: '300px',
	},
}));
const PostList = ({ posts, selectPost }) => {
	const classes = useStyles();
	return (
		<Grid
			container
			direction="column"
			spacing={1}
			className={classes.postListRoot}>
			{posts.map((_post, _index) => {
				return (
					<Grid item xs={2}>
						<SelectPost
							key={_index}
							selectPost={selectPost}
							post={_post}
						/>
					</Grid>
				);
			})}
		</Grid>
	);
};

const SelectPost = ({ post, selectPost }) => {
	const classes = useStyles();
	return (
		<div onClick={() => selectPost(post)}>
			<Grid container direction="column" className={classes.postRoot}>
				<Grid item>
					<Typography color="secondary">
						{post.index + ':'}
					</Typography>
				</Grid>
				<Grid item>
					<Typography
						style={{ width: '280px' }}
						variant="subtitle1"
						color="primary"
						noWrap>
						{post.summary}
					</Typography>
				</Grid>
				<Grid item>
					<Typography
						style={{ width: '280px' }}
						variant="body2"
						noWrap>
						{post.details}
					</Typography>
				</Grid>
			</Grid>
		</div>
	);
};

export default PostList;
