import { Card, Typography,CardContent, CardMedia, CardActions, Chip, Drawer} from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useContext, useState } from 'react'
import { NewsContext } from '../API/context'
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Comments from '../components/Comments';

const useStyles = makeStyles((theme) =>({
    trendingContainer:{
        [theme.breakpoints.down('sm')]:{
            marginLeft:"10%",
            marginRight:"10%",
            marginTop:"5%",
            padding:12,
            backgroundColor:"red",
        },
        [theme.breakpoints.between('sm','md')]:{
            width:"60vw",
            justifyContent:"center",
            alignSelf: 'center',
            marginTop:20,
            marginLeft:"20vw",
            padding:25,
            backgroundColor:"yellow"
        },
        [theme.breakpoints.up('md')]:{
            width:"45vw",
            justifyContent:"center",
            alignSelf: 'center',
            marginTop:20,
            marginLeft:"25vw",
            padding:25,
            backgroundColor:"blue"
        },
    },
    headerContainer:{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        flexDirection:"row-reverse"
    },
    dates:{
        fontSize:4,
        fontStyle:"italic",
        fontWeight:"300",
        textTransform:"lowercase",
    },
    author:{
        fontWeight:"bold",
        textTransform:"capitalize",
    },
    media:{
        height:"40vh",
        size:"cover"
    },
    actions:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-evenly",
    },
    btn:{
        paddingLeft:10,
        paddingRight:10,
        paddingTop:4,
        paddingBottom:4,
        width:"25vw"
    },
    drawer:{
        [theme.breakpoints.down('sm')]:{
            height:"70vh",
            padding:15,
            borderTopLeftRadius: 15,
            borderTopRightRadius:15,
            borderTopWidth:3,
            borderTopColor:"red",
        },
        [theme.breakpoints.between('sm','md')]:{
            width:"50vw",
            height:"100vh",
            marginTop:"12vh"
            
        },
        [theme.breakpoints.up('md')]:{
            width:"40vw",
            height:"100vh",
            marginTop:"12vh"
            
        }
    }

}))

const Trending = () => {
    const classes = useStyles();
    const { trending } = useContext(NewsContext);
    const[topicData,setTopicData] = useState([]);
    const imageOption=" https://cdn4.vectorstock.com/i/1000x1000/32/08/hot-topics-logo-background-news-designs-vector-28933208.jpg"
    const [openComment,setOpenComment] = useState(false);
    
     const handleLikes = () =>{
        console.log("hey likes")
    }
    
    console.log(topicData)
  return (
    <div className={classes.container}>
       {
        trending.map((item) => {
            return(
                <Card key={item.id} raised className={classes.trendingContainer}>
                    <CardContent className={classes.headerContainer}>
                        <Typography variant='subtitle2' className={classes.author}>{item.data.authorName}</Typography>
                         <Typography variant="subtitle2" className={classes.dates}>{new Date(item.data.postedAt.seconds*1000).toDateString()}</Typography>
                       
                    </CardContent>
                    <CardMedia image={item.data.trendingImage ? item.data.trendingImage: imageOption} className={classes.media}/>

                    
                    <p>{item.data.topic}</p>
                    <CardActions className={classes.actions}>
                        <Chip className={classes.btn} icon={<ChatOutlinedIcon />} label={1} clickable
                         onClick={() => {
                            setOpenComment(true);
                            setTopicData(item.data);
                         }}/>
                         <Chip className={classes.btn} icon={<FavoriteBorderOutlinedIcon />} label={1} clickable
                         onClick={handleLikes}/>
                    </CardActions>
                </Card>
            )
        })
       }
       <Drawer
         open={openComment}
         onClose={() => setOpenComment(false)}
         anchor={ window.innerWidth < 600 ? 'bottom' : 'right'}
        
       >
         <div  className={classes.drawer}>
            <Comments topicData={topicData} />
         </div>
       </Drawer>
       

    </div>
   )
}

export default Trending