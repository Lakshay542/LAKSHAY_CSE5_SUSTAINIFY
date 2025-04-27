import { createContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchSelectedNews, setPreSearchedNews } from "./store/HandleLocation";
import { Alert } from "react-native";

export const LoctaionContextComponent = createContext();


export const LocationState = (props)=>{
    
    
  const topics = [
    "All News",
    "Climate Change",
    "Weather Alerts",
    "Recycling",
    "Renewable Energy",
    "Wildlife",
    "Sustainable Living",
    "Eco-Tech",
    "Green Policies",
    "Water Conservation",
    "Community Actions"
  ];
 
  const newsSections = [
    {
      id: 1,
      heading: "Climate Action Now",
      imageUrl: "https://th.bing.com/th/id/OIP.WrsdLkwnqGvmYFZjziH5SwHaEd?w=293&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
    },
    {
      id: 2,
      heading: "Green Innovations",
      imageUrl: "https://th.bing.com/th/id/OIP.WrsdLkwnqGvmYFZjziH5SwHaEd?w=293&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
    },
    {
      id: 3,
      heading: "Eco-friendly Tech",
      imageUrl: "https://th.bing.com/th/id/OIP.WrsdLkwnqGvmYFZjziH5SwHaEd?w=293&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
    },
    {
      id: 4,
      heading: "Sustainable Living",
      imageUrl: "https://th.bing.com/th/id/OIP.WrsdLkwnqGvmYFZjziH5SwHaEd?w=293&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
    },
    {
      id: 5,
      heading: "Recycling Revolution",
      imageUrl: "https://th.bing.com/th/id/OIP.WrsdLkwnqGvmYFZjziH5SwHaEd?w=293&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
    },
    {
      id: 6,
      heading: "Nature's Comeback",
      imageUrl: "https://th.bing.com/th/id/OIP.WrsdLkwnqGvmYFZjziH5SwHaEd?w=293&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
    },
    {
      id: 7,
      heading: "Carbon Footprint Tracker",
      imageUrl: "https://th.bing.com/th/id/OIP.WrsdLkwnqGvmYFZjziH5SwHaEd?w=293&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
    },
    {
      id: 8,
      heading: "Youth for Earth",
      imageUrl: "https://th.bing.com/th/id/OIP.WrsdLkwnqGvmYFZjziH5SwHaEd?w=293&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
    },
    {
      id: 9,
      heading: "Clean Oceans Drive",
      imageUrl: "https://th.bing.com/th/id/OIP.WrsdLkwnqGvmYFZjziH5SwHaEd?w=293&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
    },
    {
      id: 10,
      heading: "Forest Protection Plan",
      imageUrl: "https://th.bing.com/th/id/OIP.WrsdLkwnqGvmYFZjziH5SwHaEd?w=293&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
    }
  ];
  
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);


 const [preSearchedNews,setSearchedNews]= useState([]);

  const dispatch = useDispatch();

   useEffect(() => {
     
      const isAlreadyFetched = preSearchedNews.some(item => item.topic === selectedTopic);
      if (!isAlreadyFetched) {
        dispatch(fetchSelectedNews(selectedTopic));
        // Alert.alert("API call")
      } else {
        const alreadyFetchedNews = preSearchedNews.find(item => item.topic === selectedTopic);
        const newsArray = alreadyFetchedNews?.data || [];
        dispatch(setPreSearchedNews(newsArray));
        // Alert.alert("No Call At All")
      }
   
     
    
     }, [selectedTopic]);
      

     const calculateAQI= (Cp, pollutant) =>{
      let breakpoints;
    
      if (pollutant === 'pm2_5') {
        breakpoints = [
          { cLow: 0.0, cHigh: 12.0, iLow: 0, iHigh: 50 },
          { cLow: 12.1, cHigh: 35.4, iLow: 51, iHigh: 100 },
          { cLow: 35.5, cHigh: 55.4, iLow: 101, iHigh: 150 },
          { cLow: 55.5, cHigh: 150.4, iLow: 151, iHigh: 200 },
          { cLow: 150.5, cHigh: 250.4, iLow: 201, iHigh: 300 },
          { cLow: 250.5, cHigh: 350.4, iLow: 301, iHigh: 400 },
          { cLow: 350.5, cHigh: 500.4, iLow: 401, iHigh: 500 }
        ];
      } else if (pollutant === 'pm10') {
        breakpoints = [
          { cLow: 0, cHigh: 54, iLow: 0, iHigh: 50 },
          { cLow: 55, cHigh: 154, iLow: 51, iHigh: 100 },
          { cLow: 155, cHigh: 254, iLow: 101, iHigh: 150 },
          { cLow: 255, cHigh: 354, iLow: 151, iHigh: 200 },
          { cLow: 355, cHigh: 424, iLow: 201, iHigh: 300 },
          { cLow: 425, cHigh: 504, iLow: 301, iHigh: 400 },
          { cLow: 505, cHigh: 604, iLow: 401, iHigh: 500 }
        ];
      } else {
        return null;
      }
    
      for (let i = 0; i < breakpoints.length; i++) {
        const { cLow, cHigh, iLow, iHigh } = breakpoints[i];
        if (Cp >= cLow && Cp <= cHigh) {
          return Math.round(((iHigh - iLow) / (cHigh - cLow)) * (Cp - cLow) + iLow);
        }
      }
    
      return null;
    }
    


    return (
        <LoctaionContextComponent.Provider value={{topics,preSearchedNews,calculateAQI,setSearchedNews,newsSections,selectedTopic,setSelectedTopic}}>
            {props.children}
        </LoctaionContextComponent.Provider>
    );
}