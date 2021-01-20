from os import sys,stat
import random

from flask import Flask, jsonify, request, abort, render_template,send_file, redirect, flash, session
import json
import api
import redis
app=api.app

#Global Variables
_ticket_array = [0 for x in range(0,30)]

class PlayerTicket:


    def __init__(self, name):
        # TODO using a Hard coded ticket right now for test
        self.name = name
        self.redisClient = redis.Redis('redis', port=6379)
        db_push = False

    def get_db_status_redis(self, name):
        ticket_array=list()
        tamb_dct={}
        if self.redisClient.hexists('ticket-array', name):
            ll=self.redisClient.hget('ticket-array', name).decode('utf-8')
            print(ll)
            return {'status':True, 'ticket_arr': ll.split(",")}
        else:
            return {'status':False, 'ticket_arr':ticket_array}

    def push_db_array_redis(self, name, ticket_array):
        ticket_str = ",".join(ticket_array)
        self.redisClient.hset('ticket-array', key=name, value=ticket_str)
        return

    def get_db_status(self, name):
        ticket_array=list()
        tamb_dct={}
        try:
            with open('tambola_db.json', 'r') as fp:
                tamb_dct = json.load(fp)
                if name in tamb_dct.keys():
                    print(name, tamb_dct.keys())
                    return {'status':True, 'ticket_arr':tamb_dct[name]}
                else:
                    return {'status':False, 'ticket_arr':ticket_array}
        except:
            return {'status':True, 'ticket_arr':tamb_dct[name]}
           

    def push_db_array(self, name, ticket_array):

        tamb_dct={}
        with open('tambola_db.json', 'r') as fpr:
            tamb_dct = json.load(fpr)
        tamb_dct[name]=ticket_array

        with open('tambola_db.json', 'w') as fp:
            json.dump(tamb_dct, fp)

        return

    def generate_rand(self, n1, n2, presets):
        while True:
            x=random.randint(n1,n2)
            if x not in presets:
                return x
        
    def set_ticket(self):
        x=list()
        var = self.get_db_status_redis(self.name)
        if var['status'] == True:
            return var['ticket_arr']

        ticket_array = ['0']*30
        x.append(0)
        #n1=self.generate_rand(1,9,x)
        num1 = random.randint(1,9)
        ticket_array[0] = str(num1)

        ticket_array[3] = str(random.randint(31,39))
        ticket_array[6] = str(random.randint(61,69))
        num3 = random.randint(41,99)
        ticket_array[9] = str(num3)
        ticket_array[11] = str(random.randint(11,19))
        ticket_array[12] = str(random.randint(21,29))
        ticket_array[15] = str(random.randint(51,59))
        ticket_array[18] = str(random.randint(81,89))
        ticket_array[22] = str(random.randint(41,49))
        ticket_array[24] = str(random.randint(71,79))
        
        
        res_arr = random.sample(range(1, 9), 8)
        num2 =res_arr.pop()
        if num2 == num1:
            num2 = res_arr.pop()
        ticket_array[29] = str(num2)

        res_arr = random.sample(range(41, 49), 8)
        num4 =res_arr.pop()
        if num4 == num3:
            num4 = res_arr.pop()
        ticket_array[9] = str(num4)

        self.push_db_array_redis(self.name, ticket_array)
        return(ticket_array)

    def print_ticket(self, ticket_array):
        print ("-" * 45)
        for i in range(0,3):
            for j in range(1,10):
                ticket_line = "%3d" %ticket_array[(i*10 + j)] + " |"
                sys.stdout.write (ticket_line)
            print("\n")
        print ("-" * 45 + "\n")

    def get_ticket(self):
        return self.set_ticket()

# class PlayerTicket ends
#
if __name__ == "__main__":
    pl=PlayerTicket('nnn')
    pl.set_ticket()
