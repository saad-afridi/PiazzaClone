"""
Options for models (https://www.sbert.net/docs/pretrained_models.html):

If most posts are less than length of 128 word pieces then:
- paraphrase-mpnet-base-v2 is best quality
- paraphrase-MiniLM-L6-v2 is FAST and good quality

If most posts aren't then:
    we can do question-answer retrieval aka nq-distilbert-base-v1

From what I understood (paraphrasing):
We could just compare the content of the questions themselves and check
similarities
OR
we can take the question posted and run it through all the posted answers
by instructors and check similarities between the answers and question
since the model was trained on that

^ Would appreciate thoughts on this

============================================================================
For testing similarity:
- We could use dot product or cosine similarity, it seems cosine similarity
is overall better for broad cases and used more frequently so
we'll go with that for now
^ will look into more

============================================================================
Bot Workflow:
- Will find the top 3 most similar posts and then the cutoff
would be around 0.6 to start with. (<- will have to experiment
with existing piazza databases a bit, not sure about the formal aka
scientific way to approach this)

- Then do a follow_up on that post with the following duplicate
posts the bot found with sim.. > 0.6

- Mark it as a duplicate once you see a reply saying 'YES DUPlICATE'

============================================================================
Other notes:
- I'm planning on concatenating the title/summary to the content because
important context can be lost otherwise and would be more inaccurate BUT
it could also make it more confused (<- what do you think?)

- Not sure how we'd handle latex or how it's stored in the database
(might not be a problem in CS courses)

- Do we want to clean the posts aka fix spelling errors, get rid of cluttering
words etc.
"""

from sentence_transformers import SentenceTransformer, util
import torch 


model = SentenceTransformer('paraphrase-mpnet-base-v2')

# Taken directly from CSC108 FALL2019 POST cid 285
# sentence = ['Valid Tweet In assignment 1, for functions that use valid tweets as parameters are we assuming that strings passed into the function are valid or should we use the previously defined function to check if it is and if we are, how should we handle it if it isn’t?']

# corpus = ['A1: compare_tweet_lengths clarification I would just like to clarify the language of what is asked in the compare_tweet_lengths function of assignment 1. The two parameters represent valid tweets Does this mean we are not required to test if they are valid or not within the function?',
#           'For the add_hashtag function we assume the tweet word meet all the conditions for a tweet word? So we dont have to check if the tweet word provided is a valid tweet word?',
#           'a1 question for compare_tweet_lengths do we assume that the tweets in the parameters are valid?']


sentence = ['As the summary, do I have to write a helper function in is_mentioned and contain_hashtag']

corpus = ['On my A1 checker report, it says that my is_mentioned and contains_hashtag function do not share a helper function. They both use the clean() helper function and according to the assignment they were supposed to process things differently. So I dont see how they can share another helper function. Does the checker not see the clean() function?',
          'Are we forced to use helper functions?', 'Could we make an additional function that checks if a tweet word is valid for the add_hashtag function?']

sentence_embeddings = model.encode(sentence, convert_to_tensor=True)
corpus_embeddings = model.encode(corpus, convert_to_tensor=True)

additional_corpus = ['I love my cat']
additional_embeddings = model.encode(additional_corpus, convert_to_tensor=True)

corpus_embeddings = torch.cat((corpus_embeddings, additional_embeddings), 0)

highest_sim = util.semantic_search(query_embeddings=sentence_embeddings,
                                   corpus_embeddings=corpus_embeddings,
                                   top_k=3)

print(highest_sim[0])
