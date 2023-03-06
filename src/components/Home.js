import { Button, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import HomeNavigation from '../drawerComponents/HomeNavigation';
import NewsByCategories from '../drawerComponents/NewsByCategories';
import NewsBySource from '../drawerComponents/NewsBySource';
import Notification from '../drawerComponents/Notification';
import Post from '../drawerComponents/Post';
import Trending from '../drawerComponents/Trending';


const useStyles = makeStyles((theme) => ({
    drawerContainer:{
        top:"12vh",
        position:"static",
        height:"100%",
        [theme.breakpoints.down('sm')] :{
             width:"60vw"
        },
        [theme.breakpoints.up('md')] :{
             width:"40vh"
        },
        scrollY:"hidden",
        

        

    },
    drawerBtns:{
        backgroundColor:"whitesmoke",
        color:"black",
        margin:5,
        width:"90%"
    },
    ButtonLabel:{
        textTransform:"capitalize",
    }

}))

const Home = ({articles,activeArticle,openDrawer,setOpenDrawer}) => {
    const classes = useStyles();
    // array of list of componet to be displayed using drawer
    const components = [
  { text: 'Home', component:<HomeNavigation activeArticle={activeArticle} articles={articles}/>},
  {text : 'new by categories', component: <NewsByCategories activeArticle={activeArticle} />},
  {text : 'new by sources', component: <NewsBySource activeArticle={activeArticle}/>},
  { text: 'Trending', component: <Trending /> },
  { text: 'Notification', component: <Notification /> },
  { text: 'My Post', component: <Post /> },
  
  
];
const [selectedComponent,setSelectedComponent] = useState(0);
return (
    <div>
        <Drawer anchor="left" open={openDrawer} onClose={() => setOpenDrawer(false)} > 
                <List  className={classes.drawerContainer}>
                {components.map((component, index) => (
                    <ListItem  key={component.text} selected={selectedComponent === index}>
                       <Button onClick={() => {
                        setSelectedComponent(index);
                        setOpenDrawer(false);
                       }}
                       className={classes.drawerBtns}
                       >
                               <ListItemText primary={component.text} className={classes.ButtonLabel}/>
                         </Button>
        
                    </ListItem>
                ))}
             </List>
  
           </Drawer>
<div>{components[selectedComponent].component}</div>
    </div>
    
  )
}

export default Home