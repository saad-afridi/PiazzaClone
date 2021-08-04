import requests as rq
import time
from typing import List

API_URL = 'http://127.0.0.1:8000'

"""
- Tell when a new post has been added

"""


class Bot:
    login: dict
    user_data: dict
    course_data: dict

    def __init__(self, login: dict):
        print("Loading Bot ...")
        response = rq.post(url=API_URL + '/login', json=login)
        self.user_data = response.json()
        response = rq.get(url=API_URL +
                          '/class/{}'.format(self.user_data["courses"][0]))
        self.course_data = response.json()
        print("Bot Loaded!")

    def run(self):
        """ Keeps running in an infinite loop and checks for
        difference in posts """
        try:
            while True:
                new_course_data = rq.get(
                    url=API_URL + '/class/{}'.
                    format(self.course_data["id"])).json()
                if new_course_data["post_num"] > self.course_data["post_num"]:
                    print("new post detected!")
                    self.course_data = new_course_data
                time.sleep(15)

        except KeyboardInterrupt:
            print("Interrupted!")
            return

    def __str__(self) -> str:
        """ Returns a string repr of the bot """
        return "USER_DATA -- " + str(self.user_data) + "\n" + \
            "COURSE DATA -- " + str(self.course_data)


if __name__ == '__main__':
    login_details = {"email": "mic@gmail.com", "password": "password"}
    basic_bot = Bot(login=login_details)
    basic_bot.run()
