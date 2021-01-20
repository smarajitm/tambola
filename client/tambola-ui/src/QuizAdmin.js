import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import SyncIcon from "@material-ui/icons/Sync";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "40px",
    background: "#4d90fe",
    minHeight: "100vh",
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  btn: {
    height: "120px",
    width: "120px",
    color: "#4d90fe",
    fontWeight: "700",
    background: "#ffffff",
    fontSize: "18px",
    "&:hover": {
      backgroundColor: "#ffffff",
      borderColor: "#4d90fe",
    },
  },
  numberSpan: {
    fontWeight: "700",
    fontSize: "150px",
    background: "#fff",
    borderRadius: "50%",
    padding: "20px",
    color: "#f9775b",
    width: "200px",
    height: "200px",
    textAlign: "center",
    margin: "auto",
  },
  numberBtn: {
    margin: "auto",
    textAlign: "center",
  },
  dnac_bing_text: {
    fontWeight: "700",
    fontSize: "80px",
    textAlign: "center",
    color: "#ffffff",
  },
  ans_p: {
    fontWeight: "700",
    fontSize: "60px",
    textAlign: "center",
    color: "#ffffff",
    margin: "0px",
  },
  quizImageWrapper: {
    textAlign: "center",
  },
  quizImage: {
    height: "60vh",
    width: "auto",
    maxWidth: "100%",
  },
  txt_end: {
    textAlign: "end",
  },
  txt_cen: {
    textAlign: "center",
    color: "#fff",
  },
  cur_poi: {
    cursor: "pointer",
  },
  que_name: {
    textAlign: "start",
    fontSize: "20px",
    fontWeight: "700",
  },
}));

export default function Admin() {
  const classes = useStyles();
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [currentAnswer, setCurrentAnswer] = React.useState("");
  const [currentQueue, setCurrentQueue] = React.useState([]);
  const [timerCount, setTimerCount] = React.useState(60);
  const answerMap = {
    quest1: "200",
    quest2: "Twitter & WWF",
    quest3: "Pirate Bay and United Nations",
    quest4: "Playboy, Barbie",
    quest5: "Danish Sait",
    quest6: "Shashi",
    quest7: "Christian Bale, Movie: Fighter",
    quest8: "Avatars of Lord Vishnu",
    quest9: "DNA Releases",
    quest10: "IndianCricket team Jersey sponsors",
    quest11: "Book stores in Bangalore",
    quest12: "India’s, neighboring countrie",
    quest13: "Money Heist Characters",
    quest14: "Cisco Karanataka Rajyothsava, Guests",
    quest15: "Namaste London",
    quest16: "Matrix",
    quest17: "Swades",
    quest18: "Arjun Reddy",
    quest19: "Shawshank Redemption",
    quest20: "Drishyam",
    quest21: "Prestige",
    quest22: "12:20",
    quest23: "127",
    quest24: "3",
    quest25: "87",
    quest26: "3 minutes ",
    quest27: "1",
    quest28: "Scam 1992 BGM",
    quest29: "Nescafe Gold",
    quest30: "Santoshakke Haadu Santoshakke,S.P Balasubrahmanyam",
    quest31: "Chris Martin",
    quest32: "BFC Anthem",
    quest33: "Socha HainBoulevard of Broken Dreams",
    quest34: "Subaru Cars",
    quest35: "buttabomma song",
    quest36: "Anchor white toothpaste",
    quest37: "Ganesh Acharya",
    quest38: "Drake",
  };

  const questionObj = {
    quest1: "Trial question No points!!!",
    quest2: "Identify both the logos or no points",
    quest3: "Identify both the logos or no points",
    quest4: "Identify both the logos or no points",
    quest5: "Unscramble",
    quest6: "Unscramble",
    quest7: "Unscramble and follow up question",
    quest8: "Connect Images",
    quest9: "Connect Images",
    quest10: "Connect Images",
    quest11: "Connect Images",
    quest12: "Connect Images",
    quest13: "Connect Images",
    quest14: "Connect Images",
    quest15: "Minimalist Movie Posters",
    quest16: "Minimalist Movie Posters",
    quest17: "Minimalist Movie Posters",
    quest18: "Minimalist Movie Posters",
    quest19: "Minimalist Movie Posters",
    quest20: "Minimalist Movie Posters",
    quest21: "Minimalist Movie Posters",
    quest22:
      "Current time – 3:35.Clock is rotated 90 degrees counterclockwise! What will be the time?",
    quest23: "Find out the odd number in the below math puzzle",
    quest24: "Dice is moved as shown in the arrow. Which number comes on top?",
    quest25: "",
    quest26:
      "If 3 cats can catch 3 bunnies in 3 minutes, how long will 100 cats take to catch 100 bunnies?",
    quest27: "FIND OUT THE LAST DIGIT IN THE FOLLOWING MATHEMATICAL OPERATION",
    quest28: "Audio Visual Round",
    quest29: "Audio Visual Round",
    quest30: "Audio Visual Round",
    quest31: "Audio Visual Round",
    quest32: "Audio Visual Round",
    quest33: "Audio Visual Round",
    quest34: "",
    quest35: "",
    quest36: "",
    quest37: "",
    quest38: "",
  };

  useEffect(() => {
    getQuestion();
    return () => {
      //cleanup
    };
  }, []);

  // var count = 60,
  // timer = setInterval(function() {
  //     if(count == 1) clearInterval(timer);
  // }, 1000);

  const headers = {
    "Content-Type": "application/json",
  };

  const getQuestion = async () => {
    const result = await axios("http://64.103.196.63:5006/get_ques", {
      headers: headers,
    });
    setCurrentQuestion(result.data.response);
  };

  const nextQuestion = async () => {
    const result = await axios("http://64.103.196.63:5006/next_ques", {
      headers: headers,
    });
    setCurrentQuestion(result.data.response);
    setCurrentAnswer("");
    setCurrentQueue([]);
  };

  const showAnswer = () => {
    let currentQuestionId = `quest${currentQuestion}`;
    setCurrentAnswer(answerMap[currentQuestionId]);
  };

  const getQue = async () => {
    const result = await axios(
      "http://64.103.196.63:5006/buzzer_press/admin/quest" + currentQuestion,
      { headers: headers }
    );
    setCurrentQueue(result.data.response[`quest${currentQuestion}`]);
  };

  return (
    <div className={classes.root}>
      <Grid className={classes.mb_50} container spacing={3}>
        <Grid item xs={12}>
        <p>{questionObj[`quest${currentQuestion}`]}</p>
        </Grid>
        <Grid item xs={3}>
          {/* <p>{timerCount}</p>
                <Button onClick={() => { startTimer() }}>Start timer</Button> */}
        </Grid>
        <Grid item xs={6}>
          
          <div className={classes.quizImageWrapper}>
            {currentQuestion > 0 && currentQuestion < 28 && (
              <img
                src={require(`./quiz/newYear/quest${currentQuestion}.png`)}
                className={classes.quizImage}
              />
            )}
            
	  {currentQuestion === 28  && (
                  <audio controls>
                    <source
                      src={require(`./quiz/newYear/quest28.mp3`)}
                      type="audio/mpeg"
                      className={classes.mb_50}
                    />
                  </audio>
                )}
                {currentQuestion === 29  && (
                  <audio controls>
                    <source
                      src={require(`./quiz/newYear/quest29.mp3`)}
                      type="audio/mpeg"
                      className={classes.mb_50}
                    />
                  </audio>
                )}
                {currentQuestion === 30  && (
                  <audio controls>
                    <source
                      src={require(`./quiz/newYear/quest30.mp3`)}
                      type="audio/mpeg"
                      className={classes.mb_50}
                    />
                  </audio>
                )}
                {currentQuestion === 31  && (
                  <audio controls>
                    <source
                      src={require(`./quiz/newYear/quest31.mp3`)}
                      type="audio/mpeg"
                      className={classes.mb_50}
                    />
                  </audio>
                )}
                {currentQuestion === 32  && (
                  <audio controls>
                    <source
                      src={require(`./quiz/newYear/quest32.mp3`)}
                      type="audio/mpeg"
                      className={classes.mb_50}
                    />
                  </audio>
                )}
                {currentQuestion === 33  && (
                  <audio controls>
                    <source
                      src={require(`./quiz/newYear/quest33.mp3`)}
                      type="audio/mpeg"
                      className={classes.mb_50}
                    />
                  </audio>
                )}
          {currentQuestion === 34 && (
                  <video width="320" height="240" controls>
                    <source
                      src={require(`./quiz/newYear/quest34.mp4`)}
                      type="video/mp4"
                      className={classes.mb_50}
                    />
                  </video>
                )}
                {currentQuestion === 35 && (
                  <video width="320" height="240" controls>
                    <source
                      src={require(`./quiz/newYear/quest35.mp4`)}
                      type="video/mp4"
                      className={classes.mb_50}
                    />
                  </video>
                )}
                {currentQuestion === 36 && (
                  <video width="320" height="240" controls>
                    <source
                      src={require(`./quiz/newYear/quest36.mp4`)}
                      type="video/mp4"
                      className={classes.mb_50}
                    />
                  </video>
                )}
                {currentQuestion === 37 && (
                  <video width="320" height="240" controls>
                    <source
                      src={require(`./quiz/newYear/quest37.mp4`)}
                      type="video/mp4"
                      className={classes.mb_50}
                    />
                  </video>
                )}
                {currentQuestion === 38 && (
                  <video width="320" height="240" controls>
                    <source
                      src={require(`./quiz/newYear/quest38.mp4`)}
                      type="video/mp4"
                      className={classes.mb_50}
                    />
                  </video>
                )}
	  </div>
        </Grid>
        <Grid item xs={3} className={classes.txt_cen}>
          <h3
            className={classes.cur_poi}
            onClick={() => {
              getQue();
            }}
          >
            Get Queue list <SyncIcon />
          </h3>
          {currentQueue && (
            <ol>
              {currentQueue.map((name) => (
                <div>
                  {" "}
                  {name != "admin" ? (
                    <li className={classes.que_name}>{name}</li>
                  ) : null}
                </div>
              ))}
            </ol>
          )}
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            className={classes.btn}
            onClick={() => {
              showAnswer();
            }}
          >
            Show Answer
          </Button>
        </Grid>
        <Grid item xs={6}>
          {currentAnswer != "" && (
            <p className={classes.ans_p}>{currentAnswer}</p>
          )}
        </Grid>
        <Grid item xs={3}>
          <div className={classes.txt_end}>
            {currentQuestion < 39 ? (
              <Button
                variant="contained"
                className={classes.btn}
                onClick={() => {
                  nextQuestion();
                }}
              >
                Next Question
              </Button>
            ) : null}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
