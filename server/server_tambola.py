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

names="Arun Kumar Palani (arunpala) Biju Raju (rbraj) Deepak Vernekar (dverneka) Agalya S (agals) Akhil G S (akgs) Akshatha Prabhu (akprabhu) Akshay Nepalia (anepalia) Ali Imran N M (alinand) Anil Akella (aakella) Ashok Vellur (avellur) Balasubramaniyan Mohan (balasmoh) Devank Gupta (devagupt) Divyaa Subramaniam (divyaasu) Geetha Vadapalli (gvadapal) J Suman Chetty (jchetty) Kannan Rengaswamy (krengasw) Mohammad Washim Bari (wbari) Pagala Vignesh (pagsures) Ranjima O T (ranjiot) SAIJU MATHEW (saimathe) Sam Jose (samjos) Sandeep Reddy Revure (srevure) Sangeetha P H (saph) Saravanan Radhakrishnan (sararadh) Saumya Tayal (satayal) Shajesh Kunnumprath (shakunnu) Shruti Menezes (shmeneze) Smruti Dalei (sdalei) Sowmya Ramakrishnan (sowr) Suhasini Nuti (snuti) Supradip Deb (supdeb) Venkata Harish Nagamangalam (vnagaman) Abhishek Aman (abaman) Ajay Gupta (ajaygup2) Alok Kumar (alokuma2) Amstel DAlmeida (amsalmei) Ankit Kataria (ankkatar) Ankita Mitra (ankimitr) Ashrith K S (ashks) Bharti Chauhan (bhartcha) Girish Thimmalapura Shivanna (gthimmal) Jintomon Thomas (jintthom) Jojo John (jojojohn) Kirti Yeshwant Barve (kbarve) Mahaveer Jain (mahajain) Nagendra Hangal Nagabhushana (nhangaln) Nanditha Nataraj (nandnata) Nilesh Jaiswal (niljaisw) Raju KA Killadi (akilladi) Ramasubramanian Rajaram (ramasura) Rishi Kant (rikant) Rohit Shampur D (rohd) Sachin Jain (sacjain2) Salmanul Faris K (salmk) Sanket Jain (sankejai) Sarthak Singh (sarthsin) Sasikala Mottikayala (smottika) Shiv Pratap Kushwaha (shikushw) Souvik Maity (soumaity) Tusar Gaurav (tgaurav) Anish Kumar (anishkum) Divyanshu Jalther (djalther) Akshay Venugopal (aksvenug) Amit Agarwal (amitaga) Karthik Bhat (kartl) Kavitha S (kavis) Kishan Bhargav (kibharga) Pradip Akshara (pakshara) Prathiksha Shenoy H (pshenoyh) Raviteja Donepudi (radonepu) Sadras Kumar (sadkumar) Hari Krishna Mitta (mitmitta) Hari Sivakumar (hsivakum) Joseph Plammoottil (jplammoo) Kupendra Babu Pullagal (kbabupa) Meghna A (meghna) MOHAMED RABI ABDUL JABBAR (mabdulj2) N V Siva Gontla (ngontla) Pavan Kumar Reddy Kunditipadugu (pkunditi) Ravichandran Muthu (ravmuthu) Sonveer Tomar (sotomar) Vaishnavi Boddupalli (sboddupa) Vijayandar Veesam (vveesam) Abhisekh Mohapatro (abhmohap) Bharath Kashyap S (bharkash) Deepak Chandran (deepacha) Moksh Gaur (mogaur) Nitin Sharma (nitisha2) Padmajaa G (padg) Prashanth Karnik (pkarnik) Sai Krishna Gollahalli (sgollaha) Sharath Bangera (shbanger) Vigneswar Dharmalingam Nagarathinam (vnagarat) Vinny Thakral (vithakra) Anshu Jindal (ansjinda) Digant Bhavsar (dibhavsa) Raghavendra Neelekani (rneeleka) Rajesh Surana (rsurana) Ramanadh Chebolu (rchebolu) Samiksha Jain (samijain) Sasank M (sasanm) Subham Singhal (subhams) Ankit Yadav (ankiyada) Ashish Jha (asjha2) Deepak D (dd2) MathiRajan Sethupathy (msethupa) Muni Prasad Thunuguntla (mthunugu) Nilakantha Mohanty (nilmohan) Prasant Kumar Sahoo (psahoo2) Priyadharshan Sekar (priyseka) Rituraj Singh (riturajs) Sambashivaraju Sooram (ssooram) Sanjeet Kumar Yadav (sanjeyad) Shubham Kant (shukant) Sinu Jose (sinjose) Sri Vidhya Balasubramanian (srivibal) Sudarsanam Golla (sudgolla) Udaya Visweswara (uviswesw) Vishwanath Kallappa Gowdar (vgowdar) Amar Kumar (amarkum2) Amitkumar Karnik (amkarnik) Anusha Joshi (anusjosh) Chitra Narayanan (chinaray) Deepthi Rao (deeptrao) Devendra Tata (dtata) Esakkiraja K (esakrish) Kunal Shill (kshill) Paritosh Pradeep (parprade) Pushpalatha P (puslatha) Sureka S (ssrithar) Veena Ramamoorthy (vemoorth) Byomakesh Dash (bydash) Gurukiran S.D (gursd) Kathiravan Rengaraju (katranga) Manideep Murarisetty (mmuraris) Nikhil S (nishekar) Nikita Parate (nikparat) Rajkumar Balusamy (rbalusam) Ramesh Singh (ramessin) Ranjithkumar Sengottaiyan (rsengott) Shruthi Somashekarappa (shrusoma) Sushil Prusty (suprusty) Venkatesh Chandrakumar (venkchan) Venkatesh Prakash (venkprak) Mukul Bhanawat (mbhanawa) Palanivel Murugan M (pmurugan) Rajesh I V (raiv) Rajesh Tarakkad Venkateswaran (rtv) Smarajit Mishra (smmishra) Veena Makal (veenasm) Vivek Sreevatsan (vivsreev) Zia Mulla (ziamulla)"


gm = GameController()
quiz = QuizQues()
app = api.app

points_dict={
  "data": {
    "Bahuballi": {
      "Dance": 0,
      "Music": 0,
      "Excercise": 0,
      "Pictionary": 0
    },
    "Challengers": {
      "Dance": 0,
      "Music": 0,
      "Excercise": 0,
      "Pictionary": 0
    },
    "Knights": {
      "Dance": 0,
      "Music": 0,
      "Excercise": 0,
      "Pictionary": 0
    },
    "Rangers": {
      "Dance": 0,
      "Music": 0,
      "Excercise": 0,
      "Pictionary": 0
    },
    "Soldiers": {
      "Dance": 0,
      "Music": 0,
      "Excercise": 0,
      "Pictionary": 0
    }
  }
}

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

@app.route('/rpoints_get')
def rpoints_get():
    return api.success(points_dict)

@app.route('/rpoints_edit/<pp>', methods=['GET'])
def rpoints_edit(pp):
    dd=urllib.parse.unquote(pp)
    print(dd)
    print(type(dd))
    points_dict["data"] = dd
    return api.success("True")

@app.route('/rname')
def rname():
    name_list = names.split(")")
    [ print(x) for x in name_list ]
    name = name_list.pop(random.randrange(len(name_list)))
    return render_template('hello.html', name=name)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5006, threaded=True)
