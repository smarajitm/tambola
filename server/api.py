from flask import Flask, jsonify, make_response

app = Flask(__name__)


def success(response, return_code=0):
    #return_code=return_code.decode()
    mk=jsonify({"response": response, "return_code": return_code})
    mk.headers.add('Access-Control-Allow-Origin', '*')
    return mk 


def error(exception):
    return make_response(jsonify({
        "response": exception.msg,
        "return_code": exception.error
    }), 403)


def invalid_request(msg):
    message = "Invalid Request: %s" % msg
    return jsonify({
        "response": message,
        "return_code": 115
    })
