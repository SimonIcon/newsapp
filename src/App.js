import alanBtn from '@alan-ai/alan-sdk-web';
import {useContext, useEffect, useState } from 'react';
import Header from './components/Header';
import wordsToNumbers from 'words-to-numbers'
import { makeStyles, ThemeProvider } from '@mui/styles';
import { createTheme } from '@material-ui/core/styles';
import Home from './components/Home';
import Authentication from './components/Authentication';
import { NewsContext } from './API/context';





const theme = createTheme()

const useStyles = makeStyles((theme) => ({
  bodyContainer:{
    marginTop:90,
    
  }
}))



function App() {
  const classes = useStyles();
   const [newsArticles,setNewsArticles] = useState([]);
  const [activeArticle,SetActiveArticle] = useState(-1);
  const [openDrawer, setOpenDrawer] = useState(false); 
  const { activeUser} = useContext(NewsContext)
  
  

useEffect(() => {
  alanBtn({
      key: '52d5d50e5daffc25658d5c573c6d13da2e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: ({command,articles,number}) =>{
        if(command === "task"){
          console.log("welcome")
        } else if(command === "newsHeadlines"){
          setNewsArticles(articles)
          SetActiveArticle(-1)
        }else if(command === 'highlight'){
          SetActiveArticle((prevActiveArticle) => prevActiveArticle + 1)
        }else if(command === 'open'){
          const parsedNumber = number.length > 2 ? wordsToNumbers(number,{}) : number;
           const article = articles[parsedNumber - 1];
           if(parsedNumber>20){
            alanBtn().playText("please try that again")
           }else if(article){
              window.open(article.url,'_blank');
              alanBtn().playText("opening....")
           }
          
        }



      }
      
  });
}, []);
  return (
    
         <ThemeProvider theme={theme}>
             <div>
              {activeUser ? (
                <div>
                    <div className='app'> <Header setOpenDrawer={setOpenDrawer}/></div>
                    <div className={classes.bodyContainer}>
                       <Home articles={newsArticles} activeArticle={activeArticle} openDrawer={openDrawer}
                        setOpenDrawer={setOpenDrawer}/>

                    </div>

                </div>


              ) : <Authentication />}
             </div>
           </ThemeProvider>
        );
}

export default App;


// {
//             activeUser ? (
//                <div className='app'> <Header setOpenDrawer={setOpenDrawer}/></div>
//               <div className={classes.bodyContainer}>
//             <Home articles={newsArticles} activeArticle={activeArticle} openDrawer={openDrawer} setOpenDrawer={setOpenDrawer}/>
       
//           </div>
//             ) : (
//               <Authentication />
//             )
//           }
