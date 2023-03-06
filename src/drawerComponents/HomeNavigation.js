import { TabContext } from '@mui/lab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box, Tab } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react'
import NewsCards from '../components/NewsCards';
import Search from '../components/Search';



const useStyles = makeStyles((theme) => ({
   tabheader:{
    display:"flex",
    justifyContent:"space-between",
   },
   tabBody:{
    height:"100%",
    width:"100%"
   }
}))

const HomeNavigation = ({activeArticle,articles}) => {
    const classes = useStyles();
    const [value,setValue] = useState("0");
    useEffect(() => {
        if (articles.length) {
            setValue("1");
        } else {
            setValue("0");
        }
    }, [articles]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
  return (
   <Box sx={{width:"100%"}}>
     <TabContext value={value}>
       <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
          <TabList onChange={handleChange} className={classes.tabheader}>
             <Tab label="search" value="0" />
            <Tab label="all news" value="1" />
          </TabList>
          <Box className={classes.tabBody}>
              <TabPanel value="0"><Search /></TabPanel>
             <TabPanel value="1"><NewsCards activeArticle={activeArticle} articles={articles}/></TabPanel>
          </Box>
       </Box>
     </TabContext>

   </Box>
  )
}

export default HomeNavigation