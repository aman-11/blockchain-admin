import React from "react";
import {
  Card,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core/";
import { Link, useHistory } from "react-router-dom";
import "./Dashbaord.css";

import img1 from "../../Images/request.svg";
import img2 from "../../Images/post.svg";
import img3 from "../../Images/transaction.svg";
import img4 from "../../Images/community.svg";

import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles({
  root: {
    // maxWidth: 345,
    width: "395px",
    display: "inline",
    borderRadius: "15px",
    height: "250px",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    // backgroundColor: "#83eaea",
    position: "relative",
    float: "left",
    margin: "20px",
    marginTop: "70px",
    // marginLeft:"8px",
    // marginRight:"15px",
  },
  media: {
    paddingTop: "44%",
    // paddingTop: '40%',
    backgroundBlendMode: "darken",
  },
  title: {
    padding: "0 16px",
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    marginTop: "15px",
    textTransform: "uppercase",
    textShadow: "2px 2px 4px #000000",
  },
  button: {
    width: "100%",
    backgroundColor: "#3f51b5",
    color: "white",
  },
  main: {
    width: "45%",
    height: "300px",
    display: "inline",
    borderRadius: "15px",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "relative",
    float: "left",
    margin: "20px",
  },
  details: {
    marginTop: "100px",
    textAlign: "center",
  },
  form: {
    width: "70%",
    boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    textAlign: "center",
  },
  btn: {
    marginTop: "30px",
    border: "2px solid #6C63FF",
    backgroundColor: "#6C63FF",
    width: "30%",
    padding: "4px",
    borderRadius: "28px",
    fontSize: "24px",
    fontWeight: "600",
    letteSpacing: " 3px",
  },
});
function Dashboard({ adminBal }) {
  const classes = useStyles();
  const history = useHistory()
  return (
    <div style={{ marginTop: '80px' }}>


      <div className="bottom">
        <Card className={classes.main}>
          <div className={classes.details}>
            <Typography className={classes.title} variant="h5" gutterBottom>
              Rs {adminBal}
            </Typography>
            <Typography className={classes.title} variant="h5" gutterBottom>
              Total Balance
            </Typography>
          </div>
        </Card>

        <Card className={classes.main}>
          <form className={classes.form} id="f">
            <input type="text" size="12" value="Campaigns Payment & Status" className="form__input" disabled />
            <Button className={classes.btn} style={{ fontWeight: '700' }}
              onClick={()=>history.push('/campStatus')}
            >SHOW</Button>
          </form>
        </Card>
      </div>

      <div className={classes.cardContainer}>
        <Card className={classes.root}>
          <Link to="/showReq">
            <CardMedia className={classes.media} image={img1} />
            <Typography className={classes.title} variant="h5" gutterBottom>
              Request handle
          </Typography>
          </Link>
        </Card>
        <Card className={classes.root}>
          <Link to="/storypost">
            <CardMedia className={classes.media} image={img2} />
            <Typography className={classes.title} variant="h5" gutterBottom>
              post story
          </Typography>
          </Link>
        </Card>
        <Card className={classes.root}>
          <Link to="/peopleTransfers">
            <CardMedia className={classes.media} image={img3} />
            <Typography className={classes.title} variant="h5" gutterBottom>
              Transaction by people
          </Typography>
          </Link>
        </Card>
        <Card className={classes.root}>
          <Link to="#">
            <CardMedia className={classes.media} image={img4} />
            <Typography className={classes.title} variant="h5" gutterBottom>
              transaction to community
          </Typography>
          </Link>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
