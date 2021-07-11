import React, { useState, useEffect } from 'react'
import { TextField, Button, Typography, Paper, Box } from '@material-ui/core'
import useStyles from './style.js';
import FileBase from 'react-file-base64'
import Table from './Table'
import './StoryPost.css'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createStory, fetchStory } from '../../../../Actions/Story'



function StoryPost({createCampaign,load}) {
    const [postData, setPostData] = useState({ title: '', message: '', totalAmount: '', selectedFile: '' })
    const classes = useStyles();
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()

    const clear = () => {
        setPostData({ title: ' ', message: ' ', totalAmount: '', selectedFile: ' ' })
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createStory(postData, history))
        createCampaign(postData.title, postData.totalAmount)
        clear()
}

useEffect(async () => {
    dispatch(fetchStory())
}, [dispatch, location])


const stories = useSelector((state) => state.Story)

return (

    <div className="content">
        {load ? (<div>Loading.....</div>) : (<>
            <div className="track">
                <Link to='/dashboard'><h3> Home</h3></Link >
            </div >

            <div className="story_detail">
                <Table stories={stories} />
            </div>
            <div>
                <Paper className={classes.paper}>
                    <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                        <Typography variant="h6" className="form_title">
                            <Box fontWeight="fontWeightMedium" m={1}>
                                Post a Funding State
                            </Box>
                        </Typography>

                        <TextField name="title" variant="outlined" className={classes.label}
                            placeholder="Title"
                            fullWidth
                            value={postData.title}
                            onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                        />

                        <TextField name="message" variant="outlined"
                            placeholder="Message"
                            fullWidth
                            value={postData.message}
                            onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                        />

                        <TextField name="totalAmount" variant="outlined"
                            placeholder="Total Amount Expected"
                            fullWidth
                            value={postData.totalAmount}
                            onChange={(e) => setPostData({ ...postData, totalAmount: e.target.value })}
                        />

                        <div className={classes.fileInput}>
                            <FileBase
                                type="file"
                                multiple={false}
                                onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
                            />
                        </div>
                        <Button
                            className={classes.buttonSubmit}
                            variant="contained"
                            color="primary"
                            size="large"
                            type="submit"
                            fullWidth>
                            Submit
                        </Button>
                        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
                    </form>
                </Paper>
            </div>
        </>
        )}
    </div >
)
}

export default StoryPost;
