import { Grid, Grow, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react'

const useStyles = makeStyles((theme) => ({
   container:{
    width:"100%",
    height:"100%",
   },
    card:{
      top:80,
      display:"flex",
      flexDirection:"column",
      justifyContent:"space-between",
      alignItems:"center",
      width:"100%",
      height:"25vh",
      padding:"10%",
      borderRadius:15,
      color:"white",
    },
    inforCard:{ 
      display:"flex",
      flexDirection:"column",
      textAlign:'center'

        
    },
    cardInfor:{
      top:80,
      height:"55vh",
      display:"flex",
      flexDirection:"column",
      justifyContent:"space-between",
      alignItems:"center",
      width:"100%",
      padding:20,
      borderRadius:30,
    }
}))

const Search = () => {
    const classes = useStyles();
    // information of cards
const infoCards = [
  { color: '#1565c0', title: 'News by Categories', info: 'Business, Entertainment, General, Health, Science, Sports, Technology', text: 'Give me the latest Technology news' },
  { color: '#4527a0', title: 'News by Terms', info: 'Bitcoin, PlayStation 5, Smartphones, Donald Trump...', text: 'What\'s up with PlayStation 5' },
  { color: '#283593', title: 'News by Sources', info: 'CNN, Wired, BBC News, Time, IGN, Buzzfeed, ABC News...', text: 'Give me the news from CNN' },
];
  return (
     <Grow in>
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
           {
            infoCards.map((infoCard) => (
              <Grid key={infoCard.color} item xl={12} sm={12} md={4} lg={4} className={classes.inforCard}>
                 <div className={classes.cardInfor} style={{backgroundColor:infoCard.color}}>
                   <Typography variant='h5'>{infoCard.title}</Typography>
                   {infoCard.info ? (<Typography variant='h6'><strong>
                    {infoCard.title.split(" ")[2]} </strong>
                    <br />
                    {infoCard.info}
                    </Typography> ): null}
                    <Typography variant='h6'> try saying:<br /><i>{infoCard.text}</i></Typography>
                 </div>

              </Grid>
            ))
           }
        </Grid>
        </Grow>
  )
}

export default Search