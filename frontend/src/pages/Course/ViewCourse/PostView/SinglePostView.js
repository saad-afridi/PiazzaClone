import React from 'react';

import { Grid, Typography, Modal, Button, makeStyles } from '@material-ui/core';
import { yellow } from '@material-ui/core/colors';

import EditPostModal from '../../../../components/modals/EditPostModal';
import EditStudentAnswerModal from '../../../../components/modals/EditStudentAnswerModal';
import EditInstructorAnswerModal from '../../../../components/modals/EditInstructorAnswerModal';
import AddFollowUpModal from '../../../../components/modals/AddFollowUpModal';
import AddReplyModal from '../../../../components/modals/AddReplyModal';

import { useDispatch } from 'react-redux';
import { editPost } from '../../../../actions/postActions';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.elevated[1],
		padding: '10px',
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
        margin: '10px 0px'
	},
	modalFormContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
}));

const SinglePostView = (props) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { post, courseID, index, user } = props;

	const [editModalOpen, setEditModalOpen] = React.useState(false);
	const [studentAnsModalOpen, setStudentAnsModalOpen] = React.useState(false);
	const [insAnsModalOpen, setInsAnsModalOpen] = React.useState(false);
	const [addFollowupModalOpen, setAddFollowupModalOpen] =
		React.useState(false);
	const [addReplyModalOpen, setAddReplyModalOpen] = React.useState(false);

	const [followupIndex, setFollowUpIndex] = React.useState(0);

	const handleToggleDup = () => {
		post.marked_as_duplicate = !post.marked_as_duplicate;
		const editPostThunk = editPost(post, courseID, index);
		dispatch(editPostThunk);
	};

	const openAddReplyModal = (index) => {
		setFollowUpIndex(index);
		setAddReplyModalOpen(true);
	};

	return (
		<Grid container direction="column" className={classes.root} spacing={2}>
			<Grid item>
				<Button
					variant="outlined"
					color="default"
					onClick={handleToggleDup}>
					{post.marked_as_duplicate
						? 'UNMARK AS DUPLICATE'
						: 'MARK AS DUPLICATE'}
				</Button>
			</Grid>
			<Grid item>
				<Typography variant="h6" color="secondary">
					{!post.marked_as_duplicate ? '@' + post.index : 'DUPLICATE'}
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
						marginLeft: '93%',
						backgroundColor: yellow[300],
					}}
					onClick={() => setEditModalOpen(true)}>
					EDIT
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
				<Button
					size="small"
					variant="contained"
					style={{
						marginLeft: '93%',
						backgroundColor: yellow[300],
					}}
					onClick={() => setStudentAnsModalOpen(true)}>
					EDIT
				</Button>
			</Grid>
			<Grid item>
				<InfoBox
					header={'INSTRUCTOR ANSWER'}
					info={post.instructor_answer}
					classStyle={classes.answer}
				/>
			</Grid>
			{user.category === 'instructor' ? (
				<Grid item>
					<Button
						size="small"
						variant="contained"
						style={{
							marginLeft: '93%',
							backgroundColor: yellow[300],
						}}
						onClick={() => setInsAnsModalOpen(true)}>
						EDIT
					</Button>
				</Grid>
			) : (
				''
			)}
			<Grid item>
				<Button
					size="small"
					variant="contained"
					color="primary"
					onClick={() => setAddFollowupModalOpen(true)}>
					ADD FOLLOW-UP
				</Button>
			</Grid>
			<Grid item>
				{post.follow_ups.length > 0 ? (
					<FollowUpsList
						openReplyModal={openAddReplyModal}
						followups={post.follow_ups}
					/>
				) : (
					''
				)}
			</Grid>

            {/* MODALS */}
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
			<Modal
				className={classes.modalFormContainer}
				open={studentAnsModalOpen}
				onClose={() => setStudentAnsModalOpen(false)}>
				<EditStudentAnswerModal
					onClose={() => setStudentAnsModalOpen(false)}
					post={post}
					courseID={courseID}
					index={index}
				/>
			</Modal>
			<Modal
				className={classes.modalFormContainer}
				open={insAnsModalOpen}
				onClose={() => setInsAnsModalOpen(false)}>
				<EditInstructorAnswerModal
					onClose={() => setInsAnsModalOpen(false)}
					post={post}
					courseID={courseID}
					index={index}
				/>
			</Modal>
			<Modal
				className={classes.modalFormContainer}
				open={addFollowupModalOpen}
				onClose={() => setAddFollowupModalOpen(false)}>
				<AddFollowUpModal
					onClose={() => setAddFollowupModalOpen(false)}
					post={post}
					courseID={courseID}
					index={index}
					user={user}
				/>
			</Modal>
			<Modal
				className={classes.modalFormContainer}
				open={addReplyModalOpen}
				onClose={() => setAddReplyModalOpen(false)}>
				<AddReplyModal
					onClose={() => setAddReplyModalOpen(false)}
					post={post}
					courseID={courseID}
					index={index}
					user={user}
					followupIndex={followupIndex}
				/>
			</Modal>
		</Grid>
	);
};


/* Main Representation of Data in SinglePostView */
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

const FollowUpsList = ({ followups, openReplyModal }) => {
	const classes = useStyles();
	return (
        <Grid container direction="column" spacing={0} justifyContent="flex-start" alignItems="stretch">
			{followups.map((_follow_up, _index) => {
				return (
					<Grid item key={_index} className={classes.followUps}>
						<InfoBox
							header={_follow_up.name}
							info={_follow_up.content}
							direction="row"
							spacing={2}
						/>
						<ReplyList
							index={_index}
							openReplyModal={openReplyModal}
							replies={_follow_up.replies}
						/>
					</Grid>
				);
			})}
        </Grid>
	);
};

const ReplyList = ({ replies, openReplyModal, index }) => {
	return (
		<Grid container direction="column">
			{replies.map((_reply, _index) => {
				return (
					<Grid
						item
						key={'re' + _index}
						style={{ marginLeft: '40px' }}>
						<InfoBox
							header={_reply.name}
							info={_reply.content}
							direction="row"
							spacing={2}
						/>
					</Grid>
				);
			})}
			<Grid item>
				<Button color="default" onClick={() => openReplyModal(index)}>
					ADD REPLY
				</Button>
			</Grid>
		</Grid>
	);
};

export default SinglePostView;
