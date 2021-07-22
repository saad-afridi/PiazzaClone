from server.models.course import (
    PostSchema,
    ClassSchema,
    UpdateClass,
    UpdatePost)

import pytest


def test_class_model_to_dict():
    """ Test if class model is converting to dict properly """

    post1 = PostSchema(
        summary="Why was the midterm so hard?",
        details="I was stuck on q3!",
        follow_ups=["Yea, Q3!", "Nah it was aight"],
        replies=["Yeah bad!", "I thought  I made it easy!"]
    )

    post2 = PostSchema(
        index=1,
        summary="Why was the midterm so hard?",
        details="I was stuck on q3!",
        follow_ups=["Yea, Q3!", "Nah it was aight"],
        replies=["Yeah bad!", "I thought  I made it easy!"]
    )

    ex_class = ClassSchema(
        class_name="Intro. To Computer Science",
        class_num="CSC148H5",
        estimated_enroll=200,
        term="FALL2020",
        folders=["midterm", "A1", "A2", "A3", "exam", "general"],
        instructors=["ta1@utoronto.ca", "ta2@utoronto.ca",
                     "prof1@utoronto.ca"],
        students=["ak@utoronto.ca", "abij@utoronto.ca",
                  "kandice@utoronto.ca"],
        post_num=2,
        posts=[
            post1,
            post2
        ]
    )

    assert ex_class.dict() == dict(ex_class)
    dict_class = ex_class.dict()
    assert dict_class["posts"][0] == post1
    assert dict_class["posts"][1] == post2


def test_post_update():
    """ Test if post is updated properly """

    post1 = PostSchema(
        summary="Why was the midterm so hard?",
        details="I was stuck on q3!",
        follow_ups=["Yea, Q3!", "Nah it was aight"],
        replies=["Yeah bad!", "I thought  I made it easy!"]
    )

    update_post1 = UpdatePost(
        summary="Why was the midterm for last year so hard?")

    post1.summary = update_post1.summary
    assert post1.summary == update_post1.summary
    assert update_post1.category is None
    assert update_post1.details is None and update_post1.follow_ups is None


def test_post_validation():
    """ Test if post is validating category &
    post_to attributes properly """

    with pytest.raises(ValueError):
        post1 = PostSchema(
            summary="Content", details="Random Stuff",
            follow_ups=[], replies=[], index=0,
            post_to="wrong", category="question"
        )

    with pytest.raises(ValueError):
        post1 = PostSchema(
            summary="Content", details="Random Stuff",
            follow_ups=[], replies=[], index=0,
            post_to="entire_class", category="wrong"
        )
