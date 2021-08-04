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
			history.push(`/course?id=${courseID}`)
		} catch (err) {
			console.log(err.response.data);
		}
	};
}

export function editPost(post, courseID, index) {
	return async function editPostThunk(dispatch, getState) {
		try {
			await axios.patch(
				`/class/${courseID}/update-post/${index}`,
				post,
				header_info
			);
		} catch (err) {
			console.log(err.response.data);
		}
	};
}
