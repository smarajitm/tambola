class QuizQues:
    def __init__(self):
        self.running_question = 1
        self.answer_table = {}
        self.self_init()

    def self_init(self):
        x = 1
        while x < 19:
            quest = "quest" + str(x)
            self.answer_table[quest] = []
            x = x+1

    def qq_inc(self):
        self.running_question = self.running_question + 1
        return self.running_question

    def qq_get(self):
        return self.running_question

    def qq_set(self,cec_id,ques_id):
        quest_list = self.answer_table[ques_id]
        if cec_id not in quest_list:
            quest_list.append(cec_id)
        self.answer_table[ques_id] = quest_list
        return self.answer_table





