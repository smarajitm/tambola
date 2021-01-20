#!/usr/bin/env python3

from flask import Flask, jsonify, request, abort, render_template,send_file, redirect, flash, session


import json
import api
import sys
from quiz import QuizQues

quiz = QuizQues()
app = api.app

@app.route('/')
def get_name():
    return "Hello please enter name"

@app.route('/buzzer_press/<cec_id>/<ques_id>')
def queue_ques(cec_id, ques_id):
    return api.success(quiz.qq_set(cec_id, ques_id))

@app.route('/next_ques')
def next_ques():
    return api.success(quiz.qq_inc())

@app.route('/get_ques')
def get_ques():
    return api.success(quiz.qq_get())

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5006, threaded=True)
