import { Chip, Typography } from '@mui/material'
import React from 'react'
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme) => ({
 commentBtn:{
   display:"flex",
   justifyContent:"flex-end",
   alignContent:"end",
 }
}))

const Comments = ({topicData}) => {
    const classes = useStyles();

    const handleCommentInput = () =>{
        console.log("comment")
    }
  return (
    <div>
     <Typography>{topicData.topic}</Typography>
      <Chip  className={classes.commentBtn} icon={<ChatOutlinedIcon />}  clickable onClick={handleCommentInput}/>
    </div>
  )
}

export default Comments