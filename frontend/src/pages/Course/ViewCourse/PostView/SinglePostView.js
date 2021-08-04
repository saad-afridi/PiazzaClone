import React from 'react';

import { Grid, Typography, Modal, Button, makeStyles } from '@material-ui/core';
import { yellow } from '@material-ui/core/colors';

import EditPostModal from '../../../../components/modals/EditPostModal';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.elevated[1],
		padding: '10px',
		width: '1000px',
	},
	answer: {
		backgroundColor: theme.palette.elevated[2],
		borderRadius: '10px',
		padding: '5px',
	},
	followUps: {
		backgroundColor: theme.palette.elevated[3],
		borderRadius: '10px',
		padding: '5px',
	},
	modalFormContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
}));

const SinglePostView = (props) => {
	const classes = useStyles();
	const { post, courseID, index } = props;

	const [editModalOpen, setEditModalOpen] = React.useState(false);

	return (
		<Grid container direction="column" className={classes.root} spacing={2}>
			<Grid item>
				<Typography
					variant="h6"
					color={!post.marked_as_duplicate ? 'secondary' : 'default'}>
					{'@' + post.index}
				</Typography>
			</Grid>

			<Grid item>
				<Typography variant="h3">{post.summary}</Typography>
			</Grid>
			<Grid item>
				<Typography variant="h5">{post.details}</Typography>
			</Grid>
			<Grid item>
				<Button
					size="small"
					variant="contained"
					style={{
						marginLeft: '90%',
						backgroundColor: yellow[300],
					}}
					onClick={() => setEditModalOpen(true)}>
					EDIT POST
				</Button>
			</Grid>
			<Grid item>
				<InfoBox
					header={'STUDENT ANSWER'}
					info={post.student_answer}
					classStyle={classes.answer}
				/>
			</Grid>
			<Grid item>
				<InfoBox
					header={'INSTRUCTOR ANSWER'}
					info={post.instructor_answer}
					classStyle={classes.answer}
				/>
			</Grid>
			<Grid item>
				{post.follow_ups.length > 0 ? (
					<FollowUpsList followups={post.follow_ups} />
				) : (
					''
				)}
			</Grid>
			<Modal
				className={classes.modalFormContainer}
				open={editModalOpen}
				onClose={() => setEditModalOpen(false)}>
				<EditPostModal
					onClose={() => setEditModalOpen(false)}
					post={post}
					courseID={courseID}
					index={index}
				/>
			</Modal>
		</Grid>
	);
};

const InfoBox = ({
	direction,
	header,
	info,
	headerSize,
	infoSize,
	headerColor,
	infoColor,
	spacing,
	classStyle,
}) => {
	if (!direction) direction = 'column';
	if (!headerSize) headerSize = 'h6';
	if (!infoSize) infoSize = 'h5';
	if (!headerColor) headerColor = 'primary';
	if (!infoColor) infoColor = 'inherit';
	if (!spacing) spacing = 0;
	if (!classStyle) classStyle = '';

	return (
		<Grid
			container
			direction={direction}
			spacing={spacing}
			className={classStyle}>
			<Grid item>
				<Typography variant={headerSize} color={headerColor}>
					{header.toUpperCase()}
				</Typography>
			</Grid>
			<Grid item>
				<Typography variant={infoSize} color={infoColor}>
					{info}
				</Typography>
			</Grid>
		</Grid>
	);
};

const FollowUpsList = ({ followups }) => {
	const classes = useStyles();
	return (
		<Grid container direction="column" className={classes.followUps}>
			<Grid item>
				<Typography variant="h6" color="primary">
					{'FOLLOW-UPS'}
				</Typography>
			</Grid>
			<Grid item>
				<Grid container direction="column">
					{followups.map((_follow_up, _index) => {
						return (
							<Grid item key={_index}>
								<Typography variant="h5">
									{_follow_up}
								</Typography>
							</Grid>
						);
					})}
				</Grid>
			</Grid>
		</Grid>
	);
};

export default SinglePostView;
