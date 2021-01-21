#!/usr/bin/env python3

from flask import Flask, jsonify, request, abort, render_template,send_file, redirect, flash, session


import json
import api
import sys
import re
import urllib

from player_ticket import PlayerTicket
from game_controller import GameController
from quiz import QuizQues



gm = GameController()
quiz = QuizQues()
app = api.app

@app.route('/')
def get_name():
    return "Hello please enter name"

@app.route('/ticket/<name>') 
def hello_name(name): 
    pl=PlayerTicket(name)
    arr=pl.get_ticket()
    return api.success(arr)

@app.route('/get_run')
def post_ouputs():
    num_arr = gm.full_num_array()
    claim_status = gm.get_claim_status()

    return api.success({'num_array':num_arr, 'claim_status':claim_status}) 

@app.route('/print_num')
def get_curr_num():
    num1 = gm.random_sample()
    return api.success(str(num1))

@app.route('/buzzer_press/<cec_id>/<ques_id>')
def queue_ques(cec_id, ques_id):
    return api.success(quiz.qq_set(cec_id, ques_id))


@app.route('/next_ques')
def next_ques():
    return api.success(quiz.qq_inc())

@app.route('/get_ques')
def get_ques():
    return api.success(quiz.qq_get())



@app.route('/claim/<cec_id>/<ping_id>')
def claim_results(cec_id, ping_id):
    """ Request processing """
    return api.success(gm.set_claim_status(ping_id, cec_id))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5006, threaded=True)
