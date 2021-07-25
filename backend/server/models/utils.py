def ResponseModel(data, message, code=200):
    return {
        "payload": data,
        "code": code,
        "msg": message
    }
