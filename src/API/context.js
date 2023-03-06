import axios from "axios";
import React,{ createContext, useEffect, useState } from "react";
import {auth, db} from './firebase';
import {onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { addDoc, collection, doc, getDoc, getDocs, QuerySnapshot, serverTimestamp} from "firebase/firestore";
import { async } from "@firebase/util";





export const NewsContext = createContext();

const Context = ({children}) =>{
    const [source, setSource] = useState("bbc-news");
    const [newsCategory,setNewsCategory] = useState('general');
    const [news,setNews] = useState([]);
    const [searchedNews,setSearchedNews] = useState([])
    const [countryNews,setCountryNews] = useState('us');
    const [user,setUser] = useState('');
    const[imageUrl,setImageUrl] = useState(null)
    const [activeUser,setActiveUser] = useState(false);
    const [ userId,setUserId] = useState('');
    const [trending, setTrending] = useState([]);

    const apiKey="b8dee7b2ff334f23b8fd7368697e6edd";
    // const api="ef3e3e2ea2094f73b0ac10b194ce1f6c";
    
    // fetching articles from sources
    const BASE_URLOne =`https://newsapi.org/v2/top-headlines?apikey=${apiKey}`
    const NEWS_API_URL=`${BASE_URLOne}&sources=${source}`;
    const fetchNewsFromSource = async () =>{
            try {
                const {data} = await axios.get(NEWS_API_URL)
                  setNews(data.articles)
            } catch (error) {
                console.log("symoh you are wrong be carefull")
                console.log(error)
                
            }
        }
         useEffect(()=>{
     fetchNewsFromSource();
     },[source])

    //  end of fetching news by source
    //   fetching articles from different category
    const BASE_URL = `https://newsapi.org/v2/top-headlines?country=us`;
    const newsCategoryUrl=`${BASE_URL}&category=${newsCategory}&apikey=${apiKey}`;
    const fetchCategoryNews= async () =>{
        try {
            const {data} = await axios.get(newsCategoryUrl)
             setNews(data.articles)
             
        } catch (error) {
            console.log("symoh below error was encounterred when fetching news from different category")
            console.log(error)
        }
     }
 useEffect(()=>{
     fetchCategoryNews();
     },[newsCategory])

    //  fetching all news i.e by terms
   let NEWS_API_URLTWO = `https://newsapi.org/v2/everything?apiKey=${apiKey}`;
    const fetchNewsByTerms = async () =>{
         try {
            const {data} = await axios.get(NEWS_API_URLTWO)
             setSearchedNews(data.articles)
             
        } catch (error) {
            console.log("symoh below error was encounterred when fetching news by terms")
            console.log(error)
        }

    }
    useEffect(() =>{
        fetchNewsByTerms()
    },[searchedNews])
    // checking if the user has login
     useEffect(() => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
        
          const snapshot = await getDoc(doc(db, "clientDetails", user.uid))
          setUserId(user.uid)
          setUser(snapshot.data())
            if(snapshot.data()){
                setTimeout(() => {
                     setActiveUser(true)
                },1000)
              
            }
        }
      });
    }, []);
    // sign in with firebase
     const loginInUser=(email,password)=>{
          signInWithEmailAndPassword(auth,email,password)
           .then((res) => {
           console.log(res)
         
            
           })
          .catch((err) => {
            console.log('error while login in')
          })
          
          
      }
      const logOutUser=()=>{
         signOut(auth)
          if(signOut(auth)){
            setTimeout(() => {
                setActiveUser(false)
            }, 1000);
          }
      }
//    posting trending story
const trendingTopics = async(topic,url) => {
    if(activeUser){
        const collectionRef = collection(db, "trendingTopics");
            await addDoc(collectionRef, {
            topic: topic,
            authorId: userId,
            authorName: user.username,
            postedAt: serverTimestamp(),
            trendingImage:url,
       });


    }
}
// fetching all trending motion fetched
const getTrendingTopics = async () => {
  try {
    const snapshot = await getDocs(collection(db, "trendingTopics"));
    const topics = snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }));
    setTrending(topics);
  } catch (error) {
    console.log("error occurred while fetching trending", error);
  }
};

useEffect(() => {
  getTrendingTopics();
}, []);


 


    
 


   

   
    return(
        <NewsContext.Provider value={{setNewsCategory,setSource,news,searchedNews,imageUrl,setImageUrl,user,activeUser,
        loginInUser,logOutUser,setActiveUser,trendingTopics,trending}}>
           {children}
        </NewsContext.Provider>
    )
}

export default Context;