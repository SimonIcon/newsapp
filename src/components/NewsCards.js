import React from 'react'
import NewsCard from './NewsCard'
import {Grid,Grow} from '@mui/material';
import {makeStyles} from '@mui/styles';


const useStyles = makeStyles((theme) =>({
    container:{
        padding:"0 5%",
        width:"100%",
        margin:0,
        paddingTop:50,
       
    },
   
}))



const NewsCards = ({articles,activeArticle}) => {
    const classes = useStyles();
    return (
    <Grow in>
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
             {
            articles.map((article,i) => (
              <Grid item key={i} xs={12} sm={6} md={4} lg={3} style={{display:"flex"}}>
                <NewsCard article={article} activeArticle={activeArticle} i={i}/>
                </Grid>

           ))
        }

        </Grid>

    </Grow>
    
  )
}

export default NewsCards