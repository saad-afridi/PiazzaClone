from server.models.users import UserSchema, UpdateUser
import pytest


def test_user_model_to_dict():
    """ Test if it's converting properly """
    user1 = UserSchema(
        category="instructor",
        school_name="UofT",
        courses=[],
        name="John Rose",
        email="ta1@utoronto.ca",
        password="Ilove24"
    )

    assert user1.dict() == dict(user1)
    assert user1.dict() == {
        "category": "instructor",
        "school_name": "UofT",
        "courses": [],
        "name": "John Rose",
        "email": "ta1@utoronto.ca",
        "password": "Ilove24"
    }


def test_user_validation():
    """ Test if raises error properly """
    with pytest.raises(ValueError):

        # Wrong category
        user1 = UserSchema(
            category="wrong",
            school_name="UofT",
            courses=[],
            name="John Rose",
            email="ta1@utoronto.ca",
            password="Ilove24"
        )

    with pytest.raises(ValueError):

        # Password < 6 characters
        user1 = UserSchema(
            category="instructor",
            school_name="UofT",
            courses=[],
            name="John Rose",
            email="ta1@utoronto.ca",
            password="wrong"
        )
