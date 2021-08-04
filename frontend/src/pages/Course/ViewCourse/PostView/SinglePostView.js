import React from 'react';

import { Grid, Typography, makeStyles } from '@material-ui/core';

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
}));

const SinglePostView = (props) => {
	const classes = useStyles();
	const { post } = props;
	return (
		<Grid container direction="column" className={classes.root} spacing={2}>
			<Grid item>
				<Typography variant="h6" color="secondary">
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
