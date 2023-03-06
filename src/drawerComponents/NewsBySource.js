import { Button, List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@mui/styles'
import React, { useContext } from 'react'
import {sources} from '../API/api';
import { NewsContext } from '../API/context';
import NewsCards from '../components/NewsCards';


const useStyles = makeStyles((theme) => ({
    categoryBtnContainer:{
        display:"flex",
        flexDirection:"row",    
        [theme.breakpoints.down('sm')] :{
            width:"100%",
            overflowX:"auto",
            scrollX:"hidden",
        },
        [theme.breakpoints.up('sm')]:{
            justifyContent:"space-evenly",
        }
        
    },
    buttonList:{
        [theme.breakpoints.down('sm')]:{
          display:"flex",
          flexWarp:"nowarp", 
        }
    },
    ButtonLabel:{
        [theme.breakpoints.down('sm')]:{
            justifyContent:"space-around",

        },
       
        
    },
    text:{
        flexDirection:"row",
        flexWarp:"nowarp", 
    }
  
}))

const NewsBySource = ({activeArticle}) => {
  const classes = useStyles();
  const {setSource,news} = useContext(NewsContext);
  return (
    <div>
      <List className={classes.categoryBtnContainer}>
            {
                sources.map((item) => (
                    <ListItem key={item.id} className={classes.buttonList}>
                        <Button className={classes.ButtonLabel} onClick={() => setSource(item.id)}>
                        <ListItemText primary={item.name} className={classes.text}/>
                    </Button>
                    </ListItem>
                    
                ))
            }

        </List>
        <div>
          <NewsCards articles={news}/>
        </div>
    </div>
    
  )
}

export default NewsBySource