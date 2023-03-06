import { TextField } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useState } from 'react'


const useStyles = makeStyles((theme) =>({
  inputs:{
    backgroundColor:"white",
    width:"100%",
    
  }
}))

const SearchNewsByTearms = () => {
    const classes = useStyles();
    const[term,setTerm] = useState('')
  return (
    <div>
        <TextField
         placeholder='search by terms'
         value={term}
         onChange={(e) => setTerm(e.target.value)}
         className={classes.inputs}
         

        
        
         />
    </div>
  )
}

export default SearchNewsByTearms