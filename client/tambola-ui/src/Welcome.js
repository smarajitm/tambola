/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useEffect } from "react";
import clsx from "clsx";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexWrap: "wrap"
    },
    margin: {
        margin: theme.spacing(1)
    },
    withoutLabel: {
        marginTop: theme.spacing(3)
    },
    textField: {
        width: "25ch"
    },
    button: {
        display: "block",
        margin: "20px auto"
    },
    letsPlay: {
        background: "#f9785b",
        '&:hover': {
            backgroundColor: '#f9785b',
            borderColor: '#0062cc'
        }
    },
    paper: {
        padding: theme.spacing(1.5),
        textAlign: "center",
        borderRadius: '0px',
        border: '1px solid',
        color: "#000000",
        background: "#f8f2c0",
        fontSize: "18px",
        fontWeight: "600",
    },
    paper_gray: {
        padding: theme.spacing(1.5),
        textAlign: "center",
        borderRadius: '0px',
        border: '1px solid black',
        color: "#f9785b",
        background: "#f9785b",
        fontSize: "18px",
        fontWeight: "600",
    },
    mb_50: {
        marginBottom: '50px'
    },
    mt_20: {
        marginTop: '20px',
    },
    claim_housie_button: {
        height: "120px",
        width: "120px",
        borderRadius: "50%",
        color: "#fff",
        fontWeight: "700",
        background: "#f9785b",
        fontSize: "18px",
        '&:hover': {
            backgroundColor: '#f9785b',
            borderColor: '#0062cc'
        }
    },
    colorPrimary: {
        color: "#f9785b",
        borderColor: "#f9785b",
        fontSize: "18px",
        fontWeight: "600",
        padding: theme.spacing(2),

    },
    secondaryBG: {
        background: "#f8f2c0",
    },
    yourTicketSpan: {
        position: "relative",
        top: "20%",
        float: "right",
        fontSize: "18px",
        fontWeight: "600",
        color: "#f9785b",
        background: "#f8f2c0",
        padding: "20px",
    },
    strikeOutPaper: {
        padding: theme.spacing(1.5),
        textAlign: "center",
        borderRadius: '0px',
        border: '1px solid black',
        background: "#f8f2c0",
        fontSize: "18px",
        fontWeight: "600",
        textDecoration: "line-through",
        color: "green",
    },
    usedCoinPaper: {
        padding: theme.spacing(1.5),
        textAlign: "center",
        borderRadius: '0px',
        border: '1px solid black',
        background: "green",
        fontSize: "18px",
        fontWeight: "600",
        textDecoration: "line-through",
        color: "#ffffff",
    },
    customH5: {
        marginTop: "8px",
        marginBottom: "8px",
        textDecoration: "underline"
    },
    claimedSpan: {
        position: "absolute",
        top: "0",
        fontSize: "10px"
    }

}));



export default function InputAdornments() {
    const classes = useStyles();
    const [usedCoins, setUsedCoins] = React.useState([]);
    const [claimStatus, setClaimStatus] = React.useState({});
    const [gameView, setGameView] = React.useState(false);
    const [isFirstTime, setIsFirstTime] = React.useState(true);
    const [errorAlert, setErrorAlert] = React.useState(false);
    const [successAlert, setSuccessAlert] = React.useState(false);
    const [totalCoins, setTotalCoins] = React.useState([]);
    const [ticketList, setTicketList] = React.useState([])
    const [values, setValues] = React.useState({
        cecId: "",
        playerName: ""
    });

    const handleChange = event => {
        console.log(event.target.value, event.target.name);
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const letsPlay = e => {
        setGameView(true);
    };
    const headers = {
        'Content-Type': 'application/json'
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchCoins = async () => {
        const result = await axios(
            'http://64.103.196.63:5006/get_run',
            { 'headers': headers }

        );
        setUsedCoins(result.data.response.num_array);
        setClaimStatus(result.data.response.claim_status)
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchTicket = async () => {
        const result = await axios(
            'http://64.103.196.63:5006/ticket/' + values.cecId,
            { 'headers': headers }

        );
        let ticketRespose = result.data.response;
        let ticketGridList = []
        let rowSize = 10;
        ticketRespose.forEach((item) => {
            if (!ticketGridList.length || ticketGridList[ticketGridList.length - 1].length == rowSize)
                ticketGridList.push([]);
            ticketGridList[ticketGridList.length - 1].push(item);
        });
        setTicketList(ticketGridList);

        let gridList = [];
        let row = [];
        for (var i = 1; i <= 100; i++) {
            row.push(i);
            if (row.length === 10) {
                gridList.push(row);
                row = [];
            }
        }
        setTotalCoins(gridList);

    };

    const claim = (pingId) => {
        if (pingId == 1 || pingId == 2 || pingId == 3) {
            let claimRow = ticketList[pingId - 1];
            let isClaimed = true;
            claimRow.forEach(col => {
                if (col != 0) {
                    if (usedCoins.indexOf(col) == -1) {
                        isClaimed = false;
                    }
                }

            });
            if (isClaimed) {
                sendClaim(pingId);
                setSuccessAlert(true)
                setErrorAlert(false);
            } else {
                setSuccessAlert(false)
                setErrorAlert(true)
            }
        }else if(pingId == 5){
            let jaldiFive = 0;
            ticketList.forEach(row => {
                row.forEach(col => {
                    if (col != 0) {
                        if (usedCoins.indexOf(col) != -1) {
                            jaldiFive = jaldiFive + 1;
                        }
                    }

                });
            });
            if (jaldiFive >= 5) {
                sendClaim(pingId);
                setSuccessAlert(true)
                setErrorAlert(false);
            } else {
                setSuccessAlert(false)
                setErrorAlert(true)
            }
        } else {
            let isClaimed = true;
            ticketList.forEach(row => {
                row.forEach(col => {
                    if (col != 0) {
                        if (usedCoins.indexOf(col) == -1) {
                            isClaimed = false;
                        }
                    }

                });
            })
            if (isClaimed) {
                sendClaim(pingId);
                setSuccessAlert(true)
                setErrorAlert(false);
            } else {
                setSuccessAlert(false)
                setErrorAlert(true)
            }
        }
    }

    const sendClaim = async (pingId) => {
        const result = await axios(
            'http://64.103.196.63:5006/claim/' + values.cecId + "/" + pingId.toString(),
            { 'headers': headers }
        );
        if(result.data.response){
            fetchCoins();
        }
        console.log(result.data.response);
    };

    useEffect(() => {
        if (isFirstTime && gameView) {
            fetchCoins();
            setIsFirstTime(false);
        }
        setInterval(() => {
            fetchCoins();
        }, 15000);

    }, [gameView]);

    useEffect(() => {
        if (usedCoins && gameView) {
            fetchTicket();
        }
        return () => {
            //cleanup
        }
    }, [usedCoins]);


    return (
        <div>
            {gameView ? (
                <div className="Game-Wrapper">
                    <div className={classes.root}>
                        <Grid className={classes.mb_50} container spacing={3}>
                            <Grid item xs={2}>
                                <span className={classes.yourTicketSpan}>Hello {values.playerName}, Your ticket is here --></span>
                            </Grid>
                            <Grid item xs={6}>
                                <div className={classes.root}>
                                    <Grid container spacing={0}>
                                        {ticketList.map(row => (
                                            <Grid key={row} container item xs={12} spacing={0}>
                                                {row.map(col => (
                                                    <Grid key={col} item xs={1}>
                                                        {col === "0" ? <Paper key={col} className={classes.paper_gray}>{col}</Paper> : usedCoins.indexOf(col) == -1 ? <Paper key={col} className={classes.paper}>{col}</Paper> : <Paper key={col} className={classes.strikeOutPaper}>{col}</Paper>}
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        ))}
                                    </Grid>
                                </div>
                            </Grid>
                            <Grid item xs={4}>
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
                                        Nah Nah! I can see your claim is invalid 😝
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
                                        Your claim request is accepted. 😎
        </Alert>
                                </Collapse>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={2}>
                                <ExpansionPanel>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography className={classes.heading}>Claim Rules</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <React.Fragment>
                                            <h5 className={classes.customH5} color="inherit">Jaldi Five</h5>
                                            {"Any Five from your ticket"}
                                            {/* <h5 className={classes.customH5} color="inherit">Four Corners</h5>
                                            {"First row 1st and last number & Thrid row 1st and last number"} */}
                                            <h5 className={classes.customH5} color="inherit">First Row</h5>
                                            {"First row all numbers"}
                                            <h5 className={classes.customH5} color="inherit">Second Row</h5>
                                            {"Second row all numbers"}
                                            <h5 className={classes.customH5} color="inherit">Third Row</h5>
                                            {"Third row all numbers"}
                                            <h5 className={classes.customH5} color="inherit">FULL HOUSIE</h5>
                                            {"All numbers in your Ticket"}
                                        </React.Fragment>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>

                            </Grid>
                            <Grid item xs={6}>
                                <div className={classes.root}>
                                    <Grid container spacing={0}>
                                        {totalCoins.map(row => (
                                            <Grid key={row} container item xs={12} spacing={0}>
                                                {row.map(col => (
                                                    <Grid key={col} item xs={1}>
                                                        {usedCoins.indexOf(col.toString()) == -1 ? <Paper key={col} className={classes.paper}>{col}</Paper> : <Paper key={col} className={classes.usedCoinPaper}>{col}</Paper>}

                                                    </Grid>
                                                ))}
                                            </Grid>
                                        ))}
                                    </Grid>
                                </div>
                            </Grid>
                            {claimStatus &&
                                <Grid item xs={4}>
                                    <h2>CLAIM </h2>

                                    <ButtonGroup className={classes.secondaryBG} color="primary" aria-label="outlined primary button group">
                                        {claimStatus["5"] == "False" ?
                                            <Button onClick={() => claim(5)} className={classes.colorPrimary}> Jaldi Five</Button>
                            : <Button className={classes.colorPrimary} disabled>Jaldi Five <span className={classes.claimedSpan}>Claimed by {claimStatus["5"]}</span></Button>
                                        }
                                        {/* {claimStatus["6"] == "False" ?
                                            <Button onClick={() => claim(6)} className={classes.colorPrimary}>Four Corners</Button>
                                            : <Button onClick={() => claim(6)} className={classes.colorPrimary} disabled>Four Corners <span className={classes.claimedSpan}>Claimed by {claimStatus["6"]}</span></Button>
                                        } */}
                                    

                                    </ButtonGroup>
                                    <br></br>
                                    <br></br>
                                    <ButtonGroup className={classes.secondaryBG} color="primary" aria-label="outlined primary button group">
                                        {claimStatus["1"] == "False" ?
                                            <Button onClick={() => claim(1)} className={classes.colorPrimary}>First Row</Button>
                                            : <Button onClick={() => claim(1)} className={classes.colorPrimary} disabled>First Row<span className={classes.claimedSpan}>Claimed by {claimStatus["1"]}</span></Button>
                                        }
                                        {claimStatus["2"] == "False" ?
                                            <Button onClick={() => claim(2)} className={classes.colorPrimary}>Second Row</Button>
                                            : <Button onClick={() => claim(2)} className={classes.colorPrimary} disabled>Second Row<span className={classes.claimedSpan}>Claimed by {claimStatus["2"]}</span></Button>

                                        }
                                        {claimStatus["3"] == "False" ?
                                            <Button onClick={() => claim(3)} className={classes.colorPrimary}>Third Row</Button>
                                            : <Button onClick={() => claim(3)} className={classes.colorPrimary} disabled>Third Row<span className={classes.claimedSpan}>Claimed by {claimStatus["3"]}</span></Button>
                                        }

                                    </ButtonGroup>

                                    <div className={classes.mt_20}>
                                    {claimStatus["4"] == "False" ?
                                        <Button onClick={() => claim(4)} className={classes.claim_housie_button}>FULL HOUSIE</Button>
                                        : 
                                        <Button className={classes.claim_housie_button} disabled>FULL HOUSIE<span className={classes.claimedSpan}>Claimed by {claimStatus["4"]}</span></Button>}
                                    </div>
                                </Grid>
                            }
                        </Grid>
                    </div>

                </div>
            ) : (
                    <div className="Form-wrapper">
                        <div className="Welcome-fields">
                            <div className={classes.root}>
                                <TextField
                                    label="CEC ID"
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
                                    className={clsx(classes.margin, classes.button, classes.letsPlay)}
                                    variant="contained"
                                    color="primary"
                                    disabled={(values.cecId.length > 2 && values.playerName.length > 2) ? false : true}
                                    onClick={letsPlay}
                                >
                                    Let`s Play
                </Button>
                            </div>
                            <p className={classes.colorPrimary}>Don't loose a chance to WIN! Please enter correct CEC ID</p>
                        </div>
                    </div>
                )}
        </div>
    );
}

