import axios from 'axios';

const header_info = { 'Content-type': 'application/json' };

export function createPost(post, courseID, history) {
	return async function createPostThunk(dispatch, getState) {
		try {
			await axios.post(
				`/class/${courseID}/create-post`,
				post,
				header_info
			);
			history.goBack()
		} catch (err) {
			console.log(err.response.data);
		}
	};
}
