import requests as rq
from typing import List

API_URL = 'http://127.0.0.1:8000'


class Bot:
    login: dict
    user_data: dict

    def __init__(self, login: dict):
        print("Loading Bot ...")
        response = rq.post(url=API_URL + '/login', json=login)
        self.user_data = response.json()
        print("Bot Logged In!")

    def mark_posts_as_duplicate(self):
        """ Marks posts as duplicate if post share the same summary """
        print("Starting Procedure ...")
        for course_id in self.user_data["courses"]:
            response = rq.get(url=API_URL +
                              '/class/{}/get-post'.format(course_id))
            posts = response.json()
            contents = []
            for index, post in enumerate(posts):
                if not contents:
                    contents.append(post["summary"])
                    continue
                if post["summary"] in contents:
                    response2 = rq.patch(url=API_URL +
                            '/class/{}/update-post/{}'.format(
                                course_id, index),
                            json={"marked_as_duplicate": True})
                    print(response2.json())
                contents.append(post["summary"])

        print("Finished Procedure ...")


if __name__ == '__main__':
    login_details = {"email": "mic@gmail.com", "password": "password"}

    basic_bot = Bot(login=login_details)

    basic_bot.mark_posts_as_duplicate()
