import { CardActions, CardContent} from '@mui/material'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import React from 'react'
import Button from "@mui/material/Button"
import {makeStyles} from '@mui/styles';
import classNames from 'classnames';

import {useState , useEffect, createRef} from 'react'




const useStyles = makeStyles((theme) =>({
  media:{
    height:150,
    size:"cover",
  }, 
  card:{
    display:"flex",
    flexDirection:"column",
    justifyContent:"space-between",
    borderBottom:"10px solid white",
    border:" 3 solid black",
    
  },
  activeCard:{
    borderBottom:"10px solid #22289a",
  },
  grid:{
    display:"flex",
  },
  details:{
    display:"flex",
    justifyContent:"space-between",
    margin:20,
  },
  title:{
    padding:"0 16px",
  },
  actions:{
   display:"flex",
   flexDirection:"row",
   justifyContent:"flex-end",
  } 

})
)

const NewsCard = ({article:{description,publishedAt,source,title,url,urlToImage   },i,activeArticle}) => {
  const classes = useStyles();
  const [elRefs, setElRefs] = useState([])
  const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop - 50)
  useEffect(() => {
    setElRefs((refs) => Array(20).fill().map((_, j) => refs[j] || createRef()))
  },[])

  useEffect(() => {
    if(i === activeArticle && elRefs[activeArticle]){
      scrollToRef(elRefs[activeArticle])
    }

  },[i,activeArticle,elRefs])

  return (
    <Card ref={elRefs[i]} className={classNames(classes.card,activeArticle === i ? classes.activeCard : null)}>
        <CardActionArea href={url} target="-blank">
           <Typography className={classes.title} variant="h5" gutterBottom>{title}</Typography>
            <CardMedia className={classes.media} image={urlToImage} />
            <div className={classes.details}>
                <Typography variant="body2" component='h2' color="textSeconary">{(new Date(publishedAt)).toDateString()}</Typography>
                <Typography variant="body2" component='h2' color="textSeconary">{source.name}</Typography>
            </div>
            <CardContent>
              <Typography variant="body2" color="textSecondary" component='p'>{description}</Typography>
            </CardContent>
            <CardActions className={classes.actions}>
              <Button size="small" color="primary" >learn more</Button>
              <Typography variant="h5" color="textSecondary">{i+1}</Typography>
            </CardActions>
        </CardActionArea>
    </Card>
  )
}

export default NewsCard