import { Button, List, ListItem, ListItemText } from '@mui/material'
import { makeStyles } from '@mui/styles';
import React, { useContext } from 'react'
import {categories} from '../API/api';
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
        }
    }
  
}))

const NewsByCategories = ({activeArticle}) => { 
    const classes = useStyles();
    const {setNewsCategory, news} = useContext(NewsContext)
  return (
    <div>
        <List className={classes.categoryBtnContainer}>
            {
                categories.map((item) => (
                    <ListItem key={item.name} className={classes.buttonList}>
                        <Button className={classes.ButtonLabel} onClick={() => setNewsCategory(item.name)}>
                        <ListItemText primary={item.name} />
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

export default NewsByCategories