#
# Tambola / Housie Mobile Game
#

from random import randint
from random import sample


class GameController():

    def __init__(self): 
        self._game_over_status = "False"

        self._claim_status = {'1':{'status':"False", 'cec-id':"False"},'2':{'status':"False", 'cec-id':"False"},'3':{'status':"False", 'cec-id':"False"},'4':{'status':"False", 'cec-id':"False"}, '5':{'status':"False", 'cec-id':"False"},'6':{'status':"False", 'cec-id':"False"},'7':{'status':"False", 'cec-id':"False"}}
        self.res_arr = sample(range(1, 100), 99)
        self.curr_array = list()

    def random_sample(self):
        print(len(self.res_arr))
        num = self.res_arr.pop()
        self.curr_array.append(str(num))
        print(self.curr_array)
        return str(num)

    def full_num_array(self):
        return self.curr_array

    def get_claim_status(self):
        new_cl = {}
        for x in self._claim_status.keys():
            new_cl[x]=self._claim_status[x]['cec-id']
        
        return new_cl

    def set_claim_status(self, ping_id, cec_id):
        if self._claim_status[ping_id]['status'] == "True":
            return self._claim_status[ping_id]['cec-id']
        self._claim_status[ping_id]['status'] = "True"
        self._claim_status[ping_id]['cec-id'] = cec_id
        return cec_id

    def is_game_over(self):
        return self._game_over_status

# class GameController ends
