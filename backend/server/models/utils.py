def ErrorModel(loc=[], msg="", error_type=""):
    return {
        "loc": loc,
        "msg": msg,
        "type": error_type
    }
