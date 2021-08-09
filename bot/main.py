import time
import requests as rq
from sentence_transformers import SentenceTransformer, util
import torch
from typing import List

API_URL = 'http://127.0.0.1:8000'
MODEL = SentenceTransformer('paraphrase-MiniLM-L12-v2')


class Bot:
    user_data: dict
    course_data: dict
    corpus: List[str]
    tracking: List[int]

    def __init__(self, login: dict):
        self.user_data = self._req_user_data(login)
        self.course_data = self._req_course_data()
        self.corpus = [post["details"] for post in self.iter_all_posts()]
        self.tracking = []
        print("Bot Loaded!\n")

    # ----------------------- BOT API BASED METHODS ----------------------- #

    def _req_user_data(self, login: dict) -> dict:
        response = rq.post(url=API_URL + '/login', json=login)
        return response.json()

    def _req_course_data(self) -> dict:
        # Since a singular bot will be assigned to each course, we'll
        # only use the first course
        response = rq.get(url=API_URL + '/class/{}'
                          .format(self.user_data["courses"][0]))
        return response.json()

    # ---------------- UNOFF. PIAZZA API BASED METHODS -------------------- #

    def get_post(self, post_index: int) -> dict:
        response = rq.get(url=API_URL + '/class/{}/get-post/{}'
                          .format(self.course_data["id"], post_index))
        return response.json()

    def iter_all_posts(self) -> List[dict]:
        response = rq.get(url=API_URL + '/class/{}/get-post'
                          .format(self.course_data["id"]))
        return response.json()

    def update_post(self, updated_post: dict) -> None:
        response = rq.patch(url=API_URL + '/class/{}/update-post/{}'
                            .format(self.course_data["id"],
                                    updated_post["index"]),
                            json=updated_post)
        return response.json()

    def create_followup(self, post_index: int, followup: str) -> None:
        post = self.get_post(post_index)
        post["follow_ups"].append(followup)
        self.update_post(post)

    def mark_as_duplicate(self, post_index: int) -> None:
        post = self.get_post(post_index)
        post["marked_as_duplicate"] = True
        self.update_post(post)

    # ----------------------- BOT FUNCTIONALITY METHODS --------------------- #
    def run(self, heartbeat=60):
        """ Runs the bot until CTRL+C is pressed. """
        try:
            while True:
                new_course_data = self._req_course_data()

                post_diff = new_course_data["post_num"] - \
                    self.course_data["post_num"]

                if post_diff:
                    print("\n{} new post(s) detected!\n".format(post_diff))
                    self.update(new_course_data)
                self.check_tracked_post()

                time.sleep(heartbeat)
                print("~~~ || ~~~\n")

        except KeyboardInterrupt:
            print("Interrupted!")

    def check_tracked_post(self):
        """ Checking up on tracked posts and seeing whether they have been
        replied to"""
        for post_ind in self.tracking:
            follow_ups = self.get_post(post_ind)["follow_ups"]
            for msg in follow_ups:
                if msg["name"] == self.user_data["name"]:
                    for reply in msg["replies"]:
                        if reply != 'NO DUP':
                            print(
                                "\nMarked post as dup at {}".format(post_ind))
                            self.mark_as_duplicate(post_ind)
                            self.tracking.remove(post_ind)

    def update(self, new_course_data: dict):
        """ Updating the corpus, finding and following up with duplicates for
        new post and checking whether posts have been edited and updating
        corpus accordingly"""

        for ind, content in enumerate(self.corpus):
            new_post_content = self.get_post(ind)["details"]
            if content != new_post_content:
                self.corpus[ind] = new_post_content
                print("\nUpdated post in corpus at {}".format(ind))

        current_ind = self.course_data["post_num"]
        for i in range(current_ind, new_course_data["post_num"]):
            post = self.get_post(i)
            self.find_dups_and_follow_up(query=post)
            self.corpus.append(post["details"])

        self.course_data = new_course_data

    def find_dups_and_follow_up(self, query: dict, benchmark=0.6):
        """ Finding all the top 3 duplicates in corpus and making
        a follow-up on the original post with them"""
        query_embeddings = MODEL.encode(query["details"],
                                        convert_to_tensor=True)
        corpus_embeddings = MODEL.encode(self.corpus, convert_to_tensor=True)
        highest_sim = util.semantic_search(query_embeddings=query_embeddings,
                                           corpus_embeddings=corpus_embeddings,
                                           top_k=3)[0]

        # See if those similar posts meet/exceed our similarity benchmark
        # and track them for later to check for replies
        dups = []
        for post in highest_sim:
            if post['score'] >= benchmark:
                dups.append("@" + str(post['corpus_id']) + " ")
                self.tracking.append(query['index'])
        dups.append("\nRespond to this followup with DUP <dup posts #> i.e. "
                    "DUP 3 4 or NO DUP")

        # Make a followup on the original post with the dups posts
        if len(dups) > 0:
            followup = {"name": self.user_data["name"],
                        "content": "".join(dups), "replies": []}
            self.create_followup(query["index"], followup)
            print("\nMade a follow-up @{}\n".format(query["index"]))


if __name__ == '__main__':
    login_details = {"email": "dupbot@email.ca", "password": "duplicateBAD"}

    print("Loading bot ... \n")
    basic_bot = Bot(login=login_details)
    basic_bot.run(heartbeat=5)
