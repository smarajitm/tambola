/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useEffect } from "react";
import clsx from "clsx";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
import Tooltip from "@material-ui/core/Tooltip";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "25ch",
  },
  button: {
    display: "block",
    margin: "20px auto",
  },
  letsPlay: {
    background: "#4d90fe",
    "&:hover": {
      backgroundColor: "#4d90fe",
      borderColor: "#0062cc",
    },
  },
  mb_50: {
    marginBottom: "50px",
  },
  mt_20: {
    marginTop: "20px",
  },
  colorPrimary: {
    color: "#4d90fe",
    borderColor: "#4d90fe",
    fontSize: "18px",
    fontWeight: "600",
    padding: theme.spacing(2),
  },
  secondaryBG: {
    background: "#f8f2c0",
  },
  buzzerImage: {
    height: "200px",
    width: "200px",
    borderRadius: "50%",
    cursor: "pointer",
  },
  buzImgWraper: {
    textAlign: "center",
  },
  pressBuzTxt: {
    color: "#fff",
    fontSize: "20px",
    fontWeight: "700",
    position: "relative",
    bottom: "100px",
  },
  qutnHead: {
    color: "#fff",
    fontWeight: "700",
    fontSize: "20px",
  },
  quizImage: {
    height: "60vh",
    width: "auto",
    maxWidth: "100%",
  },
}));

export default function InputAdornments() {
  const classes = useStyles();
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [gameView, setGameView] = React.useState(false);
  const [isFirstTime, setIsFirstTime] = React.useState(true);
  const [errorAlert, setErrorAlert] = React.useState(false);
  const [successAlert, setSuccessAlert] = React.useState(false);
  const [values, setValues] = React.useState({
    cecId: "",
    playerName: "",
  });

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

  const handleChange = (event) => {
    console.log(event.target.value, event.target.name);
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const letsPlay = (e) => {
    setGameView(true);
  };

  const headers = {
    "Content-Type": "application/json",
  };

  useEffect(() => {
    if (isFirstTime && gameView) {
      getQuestion();
      setIsFirstTime(false);
    }
    setInterval(() => {
      getQuestion();
    }, 5000);
  }, [gameView]);

  const getQuestion = async () => {
    const result = await axios("http://64.103.196.63:5006/get_ques", {
      headers: headers,
    });
    setCurrentQuestion(result.data.response);
  };

  const buzzerPress = async () => {
    const questioResult = await axios("http://64.103.196.63:5006/get_ques", {
      headers: headers,
    });
    let questionumber = questioResult.data.response;
    if (questionumber == currentQuestion) {
      const result = await axios(
        "http://64.103.196.63:5006/buzzer_press/" +
          values.cecId +
          "/quest" +
          currentQuestion,
        { headers: headers }
      );
      setSuccessAlert(true);
    } else {
      setErrorAlert(true);
      setCurrentQuestion(questionumber);
    }
  };

  return (
    <div>
      {gameView ? (
        <div className="Game-Wrapper">
          <div className={classes.root}>
            <Grid item xs={3}>
              <Collapse in={errorAlert}>
                <Alert
                  severity="error"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setErrorAlert(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                >
                  Time up!
                </Alert>
              </Collapse>
              <Collapse in={successAlert}>
                <Alert
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setSuccessAlert(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                >
                  Your request is accepted. 😎
                </Alert>
              </Collapse>
            </Grid>
            <Grid item xs={6}>
              <div className={classes.buzImgWraper}>
                <h2 className={classes.qutnHead}>Question {currentQuestion}</h2>
                <p>{questionObj[`quest${currentQuestion}`]}</p>
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
	      <div>
                  <img
                    onClick={() => buzzerPress()}
                    className={classes.buzzerImage}
                    src={require(`./buzzer.jpg`)}
                  />
                  <p className={classes.pressBuzTxt}>Press the buzzer</p>
                </div>
              </div>
            </Grid>
            <Grid item xs={3}></Grid>
          </div>
        </div>
      ) : (
        <div className="quiz-wrapper">
          <div className="quiz-welcome-fields">
            <div className={classes.root}>
              <TextField
                label="CEC ID - Manager Name"
                id="cecId"
                name="cecId"
                className={clsx(classes.margin, classes.textField)}
                onChange={handleChange}
                value={values.cecId}
              />
              <TextField
                label="Player Name"
                id="playerName"
                name="playerName"
                className={clsx(classes.margin, classes.textField)}
                onChange={handleChange}
                value={values.playerName}
              />
              <Button
                className={clsx(
                  classes.margin,
                  classes.button,
                  classes.letsPlay
                )}
                variant="contained"
                color="primary"
                disabled={
                  values.cecId.length > 2 && values.playerName.length > 2
                    ? false
                    : true
                }
                onClick={letsPlay}
              >
                Let`s Play
              </Button>
            </div>
            <p className={classes.colorPrimary}>
              Don't loose a chance to WIN! Please enter correct CEC ID
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
