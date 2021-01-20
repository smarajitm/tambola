import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: "40px",
        background: "#fedf7f",
        minHeight: "100vh"
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: theme.spacing(2),
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
        margin: "auto"
    },
    numberBtn: {
        margin: "auto",
        textAlign: "center"
    },
    dnac_bing_text: {
        fontWeight: "700",
        fontSize: "150px",
        textAlign: "center",
        color: "#f9775b",
    }
}));

export default function Admin() {
    const classes = useStyles();
    const [printNumber, setPrintNumber] = React.useState(0)


    const headers = {
        'Content-Type': 'application/json'
    }

    const getNumber = async () => {
        const result = await axios(
            'http://64.103.196.63:5006/print_num',
            { 'headers': headers }
        );
        setPrintNumber(result.data.response)
    }

    return (<div className={classes.root}>
        <Grid className={classes.mb_50} container spacing={3}>
            <Grid item xs={12}>
                <div className={classes.dnac_bing_text}>
                    DNAC BINGO
                </div>
            </Grid>
            <Grid item xs={12}>
                <div className={classes.numberSpan}>
                    {printNumber}
                </div>
            </Grid>
            <Grid item xs={12}>
                <div className={classes.numberBtn}>
                    <Button variant="contained" className={classes.claim_housie_button} onClick={() => { getNumber() }}>
                        Next Number
                </Button>
                </div>

            </Grid></Grid></div>

    );
}