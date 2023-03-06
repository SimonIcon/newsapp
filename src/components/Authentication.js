import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { makeStyles } from '@mui/styles'
import React, { useState } from 'react'
import SignIn from './SignIn';
import SignUp from './SignUp';

const useStyles = makeStyles((theme) =>({
    container:{
       backgroundColor:"palegreen",
       [theme.breakpoints.up('md')]:{
        height:"80%",
       width:"40%",
       top:"10%",
       left:"20%",
       },
       [theme.breakpoints.down('sm')]:{
        height:"80%",
       width:"50%",
       top:"10%",
       left:"20%",
       },
       [theme.breakpoints.down('sm')]:{
        height:"80%",
       width:"60%",
       top:"10%",
       left:"10%",
       },
        [theme.breakpoints.down('xs')]:{
        height:"80%",
       width:"80%",
       top:"10%",
       left:"10%",
       },
       position:"absolute",
       
    },
   
     tabheader:{
      flex:1,
      justifyContent:"space-between"
   },
   tabBody:{
    height:"100%",
    width:"100%",
    flex:1,
    flexDirection:"row",
   }

}))

const Authentication = () => {
    const classes = useStyles();
    const [value,setValue] = useState("0");
     const handleChange = (event, newValue) => {
        setValue(newValue);
    };
  return (
    
        <Box sx={{justifyContent:"center",alignItems:"center"}} 
        className={classes.container}>
     <TabContext value={value}>
       <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
          <TabList onChange={handleChange} className={classes.tabheader} 
          sx={{display:"flex",flex:1,justifyContent:"space-between"}}>
             <Tab label="sign in" value="0" />
            <Tab label="sign up" value="1" />
          </TabList>
          <Box className={classes.tabBody}>
              <TabPanel value="0"><SignIn /></TabPanel>
             <TabPanel value="1"><SignUp /></TabPanel>
          </Box>
       </Box>
     </TabContext>

   </Box>
   
  )
}

export default Authentication