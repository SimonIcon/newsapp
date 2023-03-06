import IconButton from '@mui/material/IconButton'
import React, { useContext } from 'react';
import { useState } from 'react'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { makeStyles } from '@mui/styles';
import { Avatar, Button, ListItemIcon, Menu, Modal, Typography } from '@mui/material';
import { NewsContext } from '../API/context';
import { MenuItem } from '@material-ui/core';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchNewsByTearms from './SearchNewsByTearms';
import CreateTrending from './CreateTrending';
import CreateDocumentry from './CreateDocumentry';


const useStyles = makeStyles((theme) => ({
  root:{
    backgroundColor:"palegreen",
    color:"black",
    top:0,
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
    height:"12vh",
    position:"fixed",
    paddingRight:"10%",
    width:"100vw",
    alignItems:"center",
    zIndex:1201,
    flex:1,

  },
  laptop:{
    [theme.breakpoints.down('md')]:{
      display:"none",
    },
    [theme.breakpoints.up('md')]:{
      display:"flex",
       flexDirection:"row",
       alignItems:"center",
       justifyContent:"space-evenly"
    }
    
  },
  smallDevices:{
    [theme.breakpoints.up('sm')]:{
      display:"none",
    },
    [theme.breakpoints.down('sm')]:{
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
    }
  },
  searchCon:{
    flex:4,
  },
  createstory:{
  flex:3,
  },
  loginContainer:{
    flex:1,
  },
  menu:{
    [theme.breakpoints.up('sm')]:{
      width:"30vw",
      height:"70%",
      justifyContent:"center",
      alignItems:"center"

    },
    [theme.breakpoints.down('sm')]:{
      width:"45vw",
      height:"70%",
      justifyContent:"center",
      alignItems:"center"

    },
  },
  image:{
    [theme.breakpoints.up('sm')]:{
     height:150,
     width:"60%",
     size:"cover",
     borderRadius:25,
    },
  [theme.breakpoints.down('sm')]:{
     height:100,
     width:"60%",
     size:"cover",
     borderRadius:25,
  },
  },
  details:{
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
  },
  info:{
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
  },
  text1:{
    textAlign:"start",
    marginRight:10,
    textTransform:"capitalize",
    fontWeight:"bold",
    fontSize:13,
  },
  text2:{
    fontSize:11,
    fontWeight:"600",
    color:"purple",
    fontFamily:"monospace",
  },
  buttonOne:{
    paddingTop:10,
    paddingBottom:10,
    fontSize:14,
    fontWeight:"bold",
    textTransform:"capitalize",
    border:"none",
    backgroundColor:"palegreen",
    
  },
  storyMenu:{
    marginRight:"10%",
  },
  modal:{
    position:"absolute",
    backgroundColor:"white",
    height:"75%",
    top:"10%",
   
    [theme.breakpoints.up('sm')]:{
        width:"60%",
         left:"20%",
    },
    [theme.breakpoints.down('md')]:{
       width:"80%",
        left:"10%",
    }
  }




  
}))
const Header = ({setOpenDrawer}) => {
   const classes=useStyles()
    const {searchedNews,news,logOutUser} = useContext(NewsContext)
    const [modalVisible,setModalVisible] = useState(false);
    const {user} = useContext(NewsContext);
    const [openMenu,setOpenMenu] = useState(false);
    const[openStoryMenu,setOpenStoryMenu] = useState(false);
    const[openDocumentry,setOpenDocumentary] = useState(false);
    const[openMotion,setOpenMotion] = useState(false);

  return (
   <div className={classes.root}>
    {/* menu icon */}
     <div className={classes.menuContainer}>
         <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}
          onClick={() => setOpenDrawer(true)}>
           <MenuOutlinedIcon size={70} />
             </IconButton></div>
             {/* search engine */}
             <div className={classes.searchCon}>
               <SearchNewsByTearms />
             </div>
             {/* create story */}
             <div className={classes.createstory}>
              <div className={classes.laptop}>
                  <div>
                    {/* documentary modal */}
                    <button className={classes.buttonOne} onClick={() => setOpenDocumentary(true)}>documentary</button>
                     <Modal open={openDocumentry} onClose={() => setOpenDocumentary(false)}
                       
                     >
                      <div className={classes.modal}>
                        <CreateDocumentry setOpenDocumentary={setOpenDocumentary} />
                      </div>
                     </Modal>
                  </div>
                   <div>
                    {/* motion modal */}
                    <button className={classes.buttonOne} onClick={() => setOpenMotion(true)}>trending</button>
                    <Modal open={openMotion} onClose={() => setOpenMotion(false)}>
                      <div className={classes.modal}>
                         <CreateTrending setOpenMotion={setOpenMotion} />
                      </div>

                    </Modal>
                   </div>
              </div>
              {/* small devices */}
              <div className={classes.smallDevices}>
                 <button className={classes.buttonOne} onClick={() => setOpenStoryMenu(true)}>yooo</button>
                 {/* creating a menu */}
                 <Menu open={openStoryMenu} onClose={() => setOpenStoryMenu(false)}
                        anchorOrigin={{
                           vertical: 'top',
                               horizontal: 'right',
                            }} >
                    <div  className={classes.storyMenu}>
                         <MenuItem onClick={() => {setOpenStoryMenu(false); setOpenDocumentary(true)}}>Documentary</MenuItem>
                         <MenuItem onClick={() => {setOpenStoryMenu(false); setOpenMotion(true)}}>Hot topic</MenuItem>
                    </div>
                   

                 </Menu>
              </div>
             
              
             </div>
             {/* user information */}
             <div className={classes.loginContainer} >
                    <IconButton  onClick={() => setOpenMenu(true)}>
                          <Avatar src={user.profilePicURl}
                              alt='M' size={80}
                             className={classes.avatar}
                          variant="circular"/>
                    </IconButton>
                    </div>  
                     <Menu open={openMenu} onClose={() => setOpenMenu(false)}
                        anchorOrigin={{
                           vertical: 'top',
                               horizontal: 'right',
                            }}  
                      >
                      <div className={classes.menu}>
                        <div className={classes.details}>
                          <img src={user.profilePicURl} alt={user.name} className={classes.image} />
                            <div className={classes.info}>
                                <h5 className={classes.text1}>name</h5>
                                <h6 className={classes.text2}>{user.username}</h6>
                            </div>
                            <div className={classes.info}>
                              <h5 className={classes.text1}>Email</h5>
                               <h6 className={classes.text2}>{user.email}</h6>

                            </div>
                         
                         
                        
                         <MenuItem onClick={() =>{
                            logOutUser()
                             
                         }}>
                              <ListItemIcon>
                              <LogoutIcon fontSize="small"/>
                          </ListItemIcon>
                            <Typography>logout</Typography>
                        </MenuItem>
                        </div>
                      </div>
                    </Menu> 
             </div>
              
         

  )
}

export default Header