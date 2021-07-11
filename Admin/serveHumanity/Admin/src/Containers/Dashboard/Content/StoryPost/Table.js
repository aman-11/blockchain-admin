import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ClearTwoToneIcon from '@material-ui/icons/Clear';
import { useDispatch } from 'react-redux'
import { deleteStory } from '../../../../Actions/Story'

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


export default function StoryTable({ stories }) {
    const classes = useStyles();
    const dispatch = useDispatch()


    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow className="head" >
                        <TableCell style={{ fontWeight: '600', fontSize: '18px' }}>Title</TableCell>
                        <TableCell align="center" style={{ fontWeight: '600', fontSize: '18px' }}>Amount</TableCell>
                        <TableCell align="center" style={{ fontWeight: '600', fontSize: '18px' }}>Date</TableCell>
                        <TableCell align="center" style={{ fontWeight: '600', fontSize: '18px' }}>Delete</TableCell>
                    </TableRow>
                </TableHead>
                {stories.map((story) =>
                    <TableBody className="data" key={story._id}>
                        <TableRow className="data__row">
                            <TableCell component="th" scope="row">
                                {story.title}
                            </TableCell>
                            <TableCell align="center">0</TableCell>
                            <TableCell align="center">{story.createdAt}</TableCell>
                            <TableCell align="center">
                                <ClearTwoToneIcon style={{ color: 'red', border: '2px solid red', fontSize: '25', cursor: 'pointer' }}
                                    onClick={
                                        () => dispatch(deleteStory(story._id))
                                    }
                                />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                )}
            </Table>
        </TableContainer>
    );
}