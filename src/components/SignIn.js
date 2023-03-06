import { TextField, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useContext, useState } from 'react'
import { NewsContext } from '../API/context'

const useStyles = makeStyles((theme) =>({
  inputs:{
        paddingLeft:15,
        paddingRight:15,
        paddingTop:5,
        paddingBottom:5,
        backgroundColor:"whitesmoke",
        color:"black",
         marginTop:10,
         width:"100%",
    },
    container:{
        display:"flex",
        justifyContent:"center",
        alignItems:"space-between",
        flexDirection:"column"
    },
    btn:{
        backgroundColor:"whitesmoke",
        borderRadius:14,
        width:"100%",

    },
    btnLabel:{
        textTransform:"capitalize",
        fontSize:15,
        paddingTop:5,
        paddingBottom:5,
    },
    upload:{
        height:10,
        backgroundColor:"white",
    },
    forgotbtn:{
        border:"none",
        backgroundColor:"palegreen",


    },
    forgotDiv:{
        display:"flex",
        justifyContent:"flex-start",
        textAlign:"center",
    },
    text1:{
        fontStyle:"italic",
        fontSize:13,
        color:"blue",
        marginLeft:20,
        marginRight:10
    },
    comment:{
      marginBottom:10,
      color:"purple",
      fontSize:15,
      fontWeight:"bold",
    },
    text2:{
      fontSize:11,
      textAlign:"center",
      padding:5,
      fontStyle:"italic",
      color:"red",

    },
    error:{
      color:"red",
      fontSize:"11",
      fontStyle:"italic",
      fontWeight:"600"
    },
    commentContainer:{
      justifyContent:"center",
      alignItems:"center"
    }
}))

const SignIn = () => {
    const classes = useStyles();
    const [password,setPassword] = useState('')
     const [email,setEmail] = useState('')
     const[emailError,setEmailError] = useState('');
     const[passwordError,setPasswordError] = useState('');
     const[comment,setComment] = useState('');
     const [notFound,setNotFound] = useState('')
     const { user,loginInUser} = useContext(NewsContext);
      //   validating user email
    function validateEmail(e) {
         const re = /\S+@\S+\.\S+/;
         return re.test(e);
    }
    //  handling sign 
    const handleSignIn = () => {
      if(!validateEmail(email)){
        setEmailError('invalid email')
      }

      else if(password.length < 6){
        setPasswordError("weak password")
      }else{
        loginInUser(email,password)
        if(user){
          setComment("login succesful")
        }else{
          setNotFound("user not found try to sign up");
          setEmail('');
          setPassword('');
        }
      }
         
        
    }
    // handling forgot password
    const handleForgotPassword = () =>{
        console.log("forgot password")
    }
  return (
    <div>
      <div className={classes.commentContainer}>
        {
         user ? (<h4 className={classes.comment}>{comment}</h4>): (<h4 className={classes.comment}>{notFound}</h4>)
        }
      </div><br />
      {emailError && <h5 className={classes.error}>{emailError}</h5>}
        <TextField placeholder='email' className={classes.inputs} error={true} required={true} type="email"
        label="Enter your email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br /> <br />
        {passwordError && <h5 className={classes.error}>{passwordError}</h5>}
        <TextField placeholder='password' className={classes.inputs} error={true} required={true} type="password"
        label="Enter your password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /> <br /><br />
          <div className={classes.forgotDiv}>
            <Typography variant='p' className={classes.text1}>forgot password</Typography>
            <button className={classes.forgotbtn} onClick={handleForgotPassword}>click here</button>
          </div>
         <br />
         <button  className={classes.btn} onClick={handleSignIn}>
        <Typography variant='h5' className={classes.btnLabel}>sign in</Typography>

    </button><br />

    </div>
  )
}

export default SignIn