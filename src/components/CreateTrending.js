import {Alert, TextField, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useContext, useEffect, useState } from 'react'
import { NewsContext } from '../API/context'
import { storage } from '../API/firebase'

const useStyles = makeStyles((theme) => ({
 container:{
    padding:25,
    display:"flex",
    flexDirection:"column",
    justifyContent:"space-around",
    alignItems:"center",

 },
 title:{
    fontWeight:"bolder",
    fontStyle:"italic",
    fontSize:11,
    marginBottom:15,
 },
 input:{
  width:"100%",
  marginTop:20,
  fontSize:10,
  fontWeight:"bold",
 },
 actions:{
  width:"100%",
  display:"flex",
  flexDirection:"row",
  justifyContent:"space-between",
  marginTop:15,
  alignItems:"center",
 },
 clearBtn:{
  backgroundColor:"rebeccapurple",
  textTransform:"capitalize",
  padding:5,
  borderRadius:12,
  width:"40%",
  marginTop:5,
  marginBottom:5,
  textAlign:"center"
 },
 postBtn:{
  backgroundColor:"palegreen",
  textTransform:"capitalize",
  padding:5,
  borderRadius:12,
  width:"40%",
  marginTop:5,
  marginBottom:5,
  textAlign:"center"
 }
}))

const CreateTrending = ({setOpenMotion}) => {
    const classes = useStyles()
    const [topic,setTopic] = useState('');
    const [topicError,setTopicError] = useState('');
    const[file,setFile] = useState([]);
    const[progress,setProgress] = useState('');
    const[url,setUrl] = useState('');
    const[uploadError,setUploadError] = useState('');
    const[comment,setComment] = useState('');
    const { trendingTopics} = useContext(NewsContext);

    //  handling image uploading to firebase
    useEffect(()=>{
        const uploadProfilePicture=()=>{
          const name=new Date().getTime() + file.name;
          const storageRef=ref(storage,`trendingPost/${name}`);
          const uploadTask=uploadBytesResumable(storageRef,file);
          uploadTask.on("state_changed",(snapshot)=>{
            const uploadProgress=Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100);
            setProgress(uploadProgress)
          },(err)=>setUploadError(err),() =>{
            getDownloadURL(uploadTask.snapshot.ref).then((trendingPic) =>{
              setUrl(trendingPic)
            })
          })
         

       }
          file && uploadProfilePicture();
         
      },[file])
    
  const handleSubmitTopic = () =>{
      const words = topic.trim().split(/\s+/);
    if (words.length < 7 && topic === "") {
       setTopicError("a topic should atleast have seven words")
    }else{
      if(trendingTopics(topic,url)){
        setComment("post uploaded succesfully")
        setTimeout(() => {
                setOpenMotion(false)
            }, 1000);
      }
     
     console.log("check you database")
    }
  }
  return (

    <div className={classes.container}>
      {
        comment ? <Alert color="success" closeText='close' onClose={() =>setComment("")}>{comment}</Alert>:null
      }
        <Typography variant="p" className={classes.title}> Create latest buzzworthy issues that will create awareness, and we provide platfrom to discuss
          them, analyze, review and get proposed conclusion</Typography><br />
          {topicError ? <Alert color="warning" closeText='close' onClose={() => setTopicError('')}>{topicError}</Alert>:null}
           <br />
          <TextField multiline
            type="string"
            aria-label='trending topics'
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className={classes.input}
            
           
           /><br />
            <TextField type="file" label="Upload your profile Image" variant="outlined"
            onChange={(event) => setFile(event.target.files[0])}
            InputLabelProps={{shrink: true,}}
            inputProps={{accept: 'image/*', }}
            /><br />
               {progress ? <p className={classes.uploadingStatus}>{progress < 100 ? <h4>uploading progress:{progress}%</h4> : null}</p>:
              <p className={classes.uploadingStatus}> {uploadError ? <h4>an error have occurred during uploading profile:{uploadError}</h4> : null }</p>
               }
               <br />
                <div className={classes.actions}>
              <button className={classes.clearBtn} onClick={() => setTopic('')}>clear</button>
              <button className={classes.postBtn}  onClick={handleSubmitTopic}>post</button>
           </div>
           
    </div>
  )
}

export default CreateTrending