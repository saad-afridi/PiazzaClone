import axios from 'axios';

const header_info = { 'Content-type': 'application/json' };

export const enrollInCourse = (userData, courseID) => (dispatch) => {
	userData.courses.push(courseID);
	axios
		.put(`/update-user/?email=${userData['email']}`, userData, header_info)
		.then((res) => {
			console.log(res.data);
			dispatch({
				type: 'USER-CHANGE',
				payload: res.data,
			});
		})
		.catch((err) => console.log(err.response.data));
};

/*
"class_name": "Intro. To Computer Science",
                "class_num": "CSC148H5",
                "estimated_enroll": 200,
                "term": "FALL2020",
                "folders": ["midterm", "A1", "A2", "A3", "exam", "general"],
                "instructors": ["ta1@utoronto.ca", "ta2@utoronto.ca",
                                "prof1@utoronto.ca"],
                "students": ["ak@utoronto.ca", "abij@utoronto.ca",
                             "kandice@utoronto.ca"],
                "post_num": 1,
                "posts": [{
                    "index": 0,
                    "category": "question",
                    "post_to": "entire_class",
                    "folders": "midterm",
                    "summary": "Why was the midterm so hard?",
                    "details": ("I was stuck on q3 for most of the test "
                                "and I didnt even have enough time to "
                                "finish the whole thing"),
                    "follow_ups": [],
                    "student_answer": "",
                    "instructor_answer": ""
                }]

*/

export const createCourse = (courseData, userData) => (dispatch) => {
	// Initializing other attributes for course to follow schema
	courseData = {
		...courseData,
		instructors: [userData.email],
		folders: ['general'],
		students: [],
		post_num: 0,
		posts: [],
	};

    console.log(`COURSE: ${courseData}`)
	axios
		.post('/class/create-course', courseData, header_info)
		.then((res) => {
			console.log(res.data);
			dispatch({
				type: 'ADD-COURSES',
				payload: res.data,
			});
		})
		.catch((err) => console.log(err));
};
