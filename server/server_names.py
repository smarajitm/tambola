#!/usr/bin/env python3

from flask import Flask, jsonify, request, abort, render_template,send_file, redirect, flash, session


import json
import api
import sys
import random

names = "Nitin’s Natkhats!,Veena’s Vehements!,Joseph’s Jovials!,Biju’s Backbones!,Anil’s Absolutes!,Alok’s Actuals!,Samiskha’s Samajhdars!,Venkatesh’s Valiants!,Sudarsanam’s Sages!,Amit’s Adbhuts!"
name_list = names.split(",")

words = "Naughty, Style, Night, India, Wedding, Rain, Child, Cloud, Summer/Hot, Shy, Four, Crowd, Stop, Bride, Music, Drunk/Drink, Father, Sing, Run, Soft, Friend, Mom" 
word_list = words.split(",")
app = api.app
@app.route('/')
def get_name():
    global name_list
    if len(name_list) == 0:
        name_list = names.split(",")
    name = name_list.pop(random.randrange(len(name_list)))
    return render_template('hello.html', name=name)

@app.route('/words')
def get_words():
    global word_list
    if len(word_list) == 0:
        word_list = words.split(",")
    name = word_list.pop(random.randrange(len(word_list)))
    return render_template('words.html', name=name)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5008, threaded=True)
