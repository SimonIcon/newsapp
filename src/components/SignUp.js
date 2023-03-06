import {TextField, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles';
import React, { useEffect,useContext, useState } from 'react'
import {auth,db,storage} from "../API/firebase"
import {setDoc,doc} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { createUserWithEmailAndPassword} from 'firebase/auth';
import { NewsContext } from '../API/context';



const useStyles = makeStyles((theme) => ({
    inputs:{
        paddingLeft:15,
        paddingRight:15,
        paddingTop:2,
        paddingBottom:2,
        backgroundColor:"whitesmoke",
        color:"black",
         marginTop:6,
         width:"100%",
    },
    container:{
        display:"flex",
        justifyContent:"flex-start",
        alignItems:"space-between",
        flexDirection:"column"
    },
    btn:{
        backgroundColor:"whitesmoke",
        borderRadius:14,

    },
    btnLabel:{
        textTransform:"capitalize",
        fontSize:12,
        paddingTop:3,
        paddingBottom:3,
    },
    error:{
      marginBottom:3,
      color:"red",
      fontSize:11,
      fontStyle:"italic",
      fontWeight:"600",
    },
    comment:{
      justifyContent:"center",
      textAlign:"center",
      fontSize:13,
      color:"purple",
      fontWeight:"bold",
    }
}))

const SignUp = () => {
    const classes = useStyles();
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [file,setFile] = useState([]);
    const [progress,setProgress] = useState(0);
    const [uploadError,setUploadError] =useState('')
    const [url,setUrl]=useState("");
    const {user,activeUser} = useContext(NewsContext);
    const[error,setError] = useState('')
    
      
    //  handling image uploading to firebase
    useEffect(()=>{
        const uploadProfilePicture=()=>{
          const name=new Date().getTime() + file.name;
          const storageRef=ref(storage,`userPictures/${name}`);
          const uploadTask=uploadBytesResumable(storageRef,file);
          uploadTask.on("state_changed",(snapshot)=>{
            const uploadProgress=Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100);
            setProgress(uploadProgress)
          },(err)=>setUploadError(err),() =>{
            getDownloadURL(uploadTask.snapshot.ref).then((profileUrl) =>{
              setUrl(profileUrl)
              console.log(profileUrl);
            })
          })
         

       }
          file && uploadProfilePicture();
         
      },[file])

      
    
    

//   handling the sign up event
//   validating user email
    function validateEmail(e) {
         const re = /\S+@\S+\.\S+/;
         return re.test(e);
    }
const [nameError,setNameError] = useState('')
const[emailError,setEmailError] = useState('');
const[passwordError,setPasswordError] = useState('')
const[imageError,setImageError] = useState('');
const[comment,setComment] = useState('');

    const handleCreateAccount = async()=>{
          if(username && email && email && url){
             if(username === ""){ setNameError("username not enterred")}
              if(!validateEmail(email)){ setEmailError("invalid error")}
               if(password.length < 6){ setPasswordError("weak password, password must contain more tahn six characters")}
               if(!url){setImageError("image not selected")}
            try {
              const res= createUserWithEmailAndPassword(auth,email,password)
            setDoc(doc(db,"clientDetails",(await res).user.uid),{
              username:username,
              email:email,
              profilePicURl:url, 
            })
            if(user){
              setComment("Account successfully created")
            }
              
            } catch (error) {
              setError("Error while creating account")
              
            }
            
         }else{
          setComment("fill all field")
         }
      
    }


  return (
    <div className={classes.container}>
      <div className={classes.comment}>
        { comment ? <h4>{comment}</h4> : <h4>{error}</h4>}</div>
        {nameError ? <h5 className={classes.error}>{nameError}</h5>: null}
        <TextField placeholder='username' className={classes.inputs} error={true} required={true} type="string"
        label="set your username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /><br />
        {emailError ?  <h5 className={classes.error}>{emailError}</h5> : null}
        <TextField placeholder='email' className={classes.inputs} error={true} required={true} type="email"
        label="Set your email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br />
        {passwordError ? <h5 className={classes.error}>{passwordError}</h5> : null}
        <TextField placeholder='password' className={classes.inputs} error={true} required={true} type="password"
        label="set your password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />
        {imageError ? <h5 className={classes.error}>{imageError}</h5> :null}
            <TextField type="file" label="Upload your profile Image" variant="outlined"
            onChange={(event) => setFile(event.target.files[0])}
            InputLabelProps={{shrink: true,}}
            inputProps={{accept: 'image/*', }}
    />
    {progress ? <p className={classes.uploadingStatus}>{progress < 100 ? <h4>uploading progress:{progress}%</h4> : <h4>completed</h4>}</p>:
      <p className={classes.uploadingStatus}> {uploadError ? <h4>an error have occurred during uploading profile:{uploadError}</h4> : null }</p>
    }
     
        
      
    <button  className={classes.btn} onClick={handleCreateAccount}>
        <Typography variant='h5' className={classes.btnLabel}>sign up</Typography>

    </button>

        


    </div>
  )
}

export default SignUp