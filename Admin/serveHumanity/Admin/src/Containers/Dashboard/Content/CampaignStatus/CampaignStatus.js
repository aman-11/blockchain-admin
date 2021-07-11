import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { green } from '@material-ui/core/colors';

const styles = theme => ({
    root: {
        maxWidth: 350,
        marginTop: 32,
    },
    cards: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap'
    },
    formRoot: {
        width: '28ch',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    formInput: {
        height: 54,
        textAlign: 'center',
        marginBottom: 6
    },
    content: {
        marginTop: 16,
        fontWeight: 500
    },
    title: {

    },
    pos: {
        marginBottom: 12,
    },
    status: {
        marginLeft: 70,
        marginTop: 25,
        borderRadius:4
    }
});

export class CampaignStatus extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toDashboard: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault()
        const to = event.target.to.value
        if (to === '') {
            alert("Enter the Recipient Id")
            return
        }
        const campId = event.target.campId.value
        const amount = event.target.amount.value
        const recipient = event.target.campName.value
        this.props.setTransaction(amount, campId, recipient, to).then(() => this.setState(() => ({
            toDashboard: true
        })))
    }

    render() {
        if (this.state.toDashboard === true) {
            return <Redirect to='/dashboard' />
        }
        const { classes } = this.props;
        return (
            <div>
                <div className="track">
                    <Link to='/dashboard'><h3> HOME</h3></Link>
                </div>
                <div className={classes.cards}>
                    {this.props.camps.map((camp, index) => {
                        return (
                            <Card className={classes.root} variant="outlined" key={camp.campId} >
                                <CardContent >
                                    <Typography className={classes.title} variant="h5" color="textPrimary">
                                        {camp.campName}
                                    </Typography>
                                    <Typography component="h2" className={classes.content} >
                                        Collection : Rs {camp.currentAmount} out of Rs {camp.totalAmount}
                                    </Typography>
                                    <Typography className={classes.pos} color="textSecondary">
                                        Target Amount : {camp.target ? "Achieved" : "Not Achieved"}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    {camp.completed ? (
                                        <div className={classes.status} color="textSecondary" variant="h6" style={{ border: '1px solid #009958' }}>
                                            <Typography style={{padding:'16px 32px 16px 32px', color: '#009958', fontWeight: '700'}} >Executed</Typography>
                                        </div>
                                    ) : (
                                        <form className={classes.formRoot} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                                            <input type="text" className={classes.formInput} name="to" placeholder="xxxxxxxx@ybl" />
                                            <input type="hidden" name="campId" defaultValue={camp.campId} disabled />
                                            <input type="hidden" name="amount" defaultValue={camp.currentAmount} disabled />
                                            <input type="hidden" name="campName" defaultValue={camp.campName} disabled />
                                            <Button size="large" type="submit" style={{ fontSize: '21px', border: '1px solid #f44e5a', color: '#f44e5a' }} >
                                                Pay
                                            </Button>
                                        </form>
                                    )}

                                </CardActions>
                            </Card>
                        )
                    })}
                </div>
            </div>
        )
    }
}

CampaignStatus.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CampaignStatus)
