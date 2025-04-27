import { useContext, useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  SafeAreaView,
  SafeAreaViewBase,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
  Pressable,
  Alert,
} from 'react-native';
import { LoctaionContextComponent } from '../../app/ContextAPI';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSuggestions, fetchWeather, setCoordinates, setIsCoordinated, setIsLocated, setSelectedLocation } from '../../app/store/HandleLocation';
import { apiKeysObj } from '../../app/apiKeys';

console.log("hello")

const HomePage = () => {
  
  const {Weather,weatherLoading} = useSelector((state) => state.weather);
  const dispatch = useDispatch();



  const [textInput, setTextInput] = useState("");
  const [showLocList, setLocList] = useState(false);


  
  const sunrise = new Date(Weather.weather?.sys?.sunrise * 1000);
  const sunset = new Date(Weather.weather?.sys?.sunset * 1000);
  const options = { hour: "2-digit", minute: "2-digit" };
  const Sunrise = sunrise.toLocaleTimeString("en-IN", options);
  const Sunset = sunset.toLocaleTimeString("en-IN", options);
  
  // Location state
  const {
    suggestions,
    loading,
    error,
    selectedLocation,
    isLocated,
    isCoordinated,
    coordinates
  } = useSelector((state) => state.location);
  const {News} = useSelector(state=>state.news)

 
  
 
  useEffect(() => {
    const { latitude, longitude } = coordinates || {};
    if (latitude != null && longitude != null) {
      dispatch(fetchWeather({ lat: latitude, lon: longitude }));
    }
  }, [coordinates, dispatch]);
  
  // Input handling
  const handleText = (text) => {
    setTextInput(text);
    if (text.length === 0) {
      setLocList(false);
    }
  };
  
  const handleApi = () => {
    dispatch(fetchSuggestions(textInput));
    setLocList(true);
  };
  
  const setUserLoc = (item) => {
    setLocList(false);
    dispatch(setSelectedLocation(item));
    dispatch(setIsLocated(item));
    setTextInput("");
    getGeoData(item.placeName);
  };
  
 
  const getGeoData = async (location) => {
    try {
      const encodedLocation = encodeURIComponent(location);
      const apiKey = "132ea9a872504328b8a8b28f20e9d088";
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodedLocation}&key=${apiKey}`;
  
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network response was not ok");
  
      const data = await response.json();
  
      const firstResult = data.results[0];
      if (firstResult && firstResult.geometry) {
        const { lat, lng } = firstResult.geometry;
  
        dispatch(
          setCoordinates({
            latitude: lat,
            longitude: lng,
            Location: location.toString(),
          })
        );
        dispatch(setIsCoordinated(true));
      } else {
        alert(`Sorry, location data for "${location}" is not available right now.`);
      }
    } catch (error) {
      console.error("Error fetching geocode data:", error);
      Alert.alert("Something went wrong while fetching location.");
    }
  };
  
  
  

  // return <>
  // <SafeAreaView>
  //   <View style={{height:200,width:"100%",padding:40,flexDirection:"row"}}>

  //     <TextInput onChangeText={(text)=>handleText(text)} style={{borderWidth:0.8,height:40,width:250}} placeholder='Enter your city name'></TextInput>
  //     <TouchableOpacity onPress={()=>handleApi()}  style={{borderWidth:0.8,height:40,width:80,justifyContent:"center",alignItems:"center"}}><Text>Search</Text></TouchableOpacity>
  //   </View>
  //   {loading ? <View><Text>Loading Please Wait...</Text></View> : <View></View> }
  //   {!loading && suggestions.length > 0 && (
  //       <FlatList
  //         data={suggestions}
  //         keyExtractor={(item, index) => item.eLoc + index}
  //         renderItem={({ item }) => (
  //           <View
  //             style={{
  //               padding: 10,
  //               borderBottomWidth: 0.5,
  //               borderColor: '#ccc',
  //             }}
  //           >
  //             <Text style={{ fontWeight: 'bold' }}>{item.placeName}</Text>
  //             <Text>{item.placeAddress}</Text>
  //             <Text style={{ color: 'gray' }}>{item.type}</Text>
  //           </View>
  //         )}
  //       />
  //     )}
  // </SafeAreaView>
  
  
  // </>



















const {topics,calculateAQI,selectedTopic,setSearchedNews,setSelectedTopic,preSearchedNews} = useContext(LoctaionContextComponent);


useEffect(() => {
  const isAlreadyInState = preSearchedNews.some(item => item.topic === selectedTopic);
  if (!isAlreadyInState && News.length > 0) {
    setSearchedNews(prev => [...prev, { topic: selectedTopic, data: News }]);
  }
}, [News]);


  const [aqi, setAqi] = useState({ aqi: 67, description: "Moderate",longDescription:"Acceptable for most people" });

  useEffect(() => {
    if (Weather?.aqi?.list?.length) {
      const pm_2 = Weather.aqi.list[0].components.pm2_5;
      const pm_10 = Weather.aqi.list[0].components.pm10;
  
      const aqiFromPm25 = calculateAQI(pm_2, 'pm2_5');
      const aqiFromPm10 = calculateAQI(pm_10, 'pm10');
  
      const final = Math.max(aqiFromPm25, aqiFromPm10);
  
      let description = "";
      let longDescription=""
  
      if (final <= 50) {
        description = "Good";
        longDescription = "Air quality is very good";
      } else if (final <= 100) {
        description = "Moderate";
        longDescription = "Acceptable for most people";
      } else if (final <= 150) {
        description = "Poor";
        longDescription = "May affect vulnerable individuals";
      } else if (final <= 200) {
        description = "Unhealthy";
        longDescription = "Harmful for most people";
      } else if (final <= 300) {
        description = "Very Unhealthy";
        longDescription = "Avoid outdoor activity now";
      } else {
        description = "Hazardous";
        longDescription = "Serious risk to health";
      }
  
      setAqi({ aqi: final, description ,longDescription});
  
      
      
    }
  }, [Weather.aqi]);
  
  

return (
  <SafeAreaView style={styles.safeArea}>
    <View style={styles.topNavBar}>
      <View style={styles.topNavLeft}>
        <Image
          style={styles.threeBar}
          source={require('../../assets/icons/menu.png')}
        />
        <View>
          <Text style={styles.logoText}>Sustanify</Text>
        </View>
      </View>

      <Pressable>
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>{isLocated && selectedLocation.placeName}, {isLocated && selectedLocation.placeAddress}</Text>
          <Image
            source={require('../../assets/icons/location.png')}
            style={styles.locationIcon}
          />
        </View>
        
      </Pressable>
    </View>

    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.mainContainer}>
        <View style={styles.searchBarContainer}>
          
          <View style={styles.searchInputContainer}>
            <TextInput
              placeholder="Enter your location"
              style={styles.searchInput}
              value={textInput}
              onChangeText={text => handleText(text)}
              returnKeyType="Done"
              onSubmitEditing={() => handleApi()}
            />
            <TouchableOpacity style={styles.searchButton} onPress={() => handleApi()}>
              <Image
                source={require('../../assets/icons/search.png')}
                style={styles.searchIcon}
              />
            </TouchableOpacity>

            <View style={[styles.searchDynamicLst,{height: (showLocList && textInput.length !==0 && !loading && suggestions.length > 0)  ? 295 : 0}]}>



            {!loading && suggestions.length > 0 && (
        <FlatList
          nestedScrollEnabled={true}
          data={suggestions}
          style={{zIndex:9}}
          keyExtractor={(item, index) => item.eLoc + index}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                padding: 10,
                borderBottomWidth: 0.5,
                borderColor: '#ccc',
              }}
              onPress={() => setUserLoc(item)}
            >
              <Text style={{ fontWeight: 'bold' }}>{item.placeName}</Text>
              <Text>{item.placeAddress}</Text>
              <Text style={{ color: 'gray' }}>{item.type}</Text>
            </TouchableOpacity>
          )}
        />
      )}



            </View>


          </View>  {/* Search Input Container */}
        </View>
        {/* {weatherLoading &&<View style={{paddingLeft:"10%",paddingTop:12}}><Text>Loading...</Text></View>} */}
        <View style={styles.weatherCardsContainer}>
          <View style={[styles.weatherCard ,{backgroundColor:"#A5D6A7",borderRadius:10}]}>
            <View style={styles.weatherCardTopGreen} />
            <View style={styles.weatherCardContent}>
              <View style={styles.aqiInfo}>
                <Text style={styles.aqiValue}>{aqi.aqi}</Text> {/**-------------------------------------------------------------------------------------------------------------------------------------------------- */}
                <Text style={styles.aqiStatus}>{aqi.description}</Text>
              </View>
              <Text style={styles.aqiDescription}>
                {aqi.longDescription}
              </Text>
            </View>
            <Text style={styles.weatherCardTitle}>Air Quality Index</Text>
          </View>

{/* Weather carddddddddddddddddddd */}

          <View style={[styles.weatherCard ,{backgroundColor:"#90CAF9",borderRadius:10}]}>
            <View style={styles.weatherCardTopBlue} />
            <View style={styles.weatherCardContentBlue}>
              <View style={styles.temperatureInfo}>
                <Image
                  source={require('../../assets/icons/weather1.png')}
                  style={styles.weatherIcon}
                />
                <View style={styles.temperatureTextContainer}>
                  <Text style={styles.temperature}>
                    {(Number(Weather.weather.main.temp) - 273).toFixed(1)}<Text style={styles.degree}>º</Text>
                  </Text>
                  <Text style={styles.weatherCondition}>{Weather.weather.weather[0].description}</Text>
                </View>
              </View>
              <View style={styles.detailsRow}>
                <View style={styles.detailItem}>
                  <Image
                    style={styles.detailIcon}
                    source={require('../../assets/icons/air.png')}
                  />
                  <Text style={styles.detailText}>{Weather.weather.wind.speed} m/s</Text>
                </View>
                <View style={styles.detailItem}>
                  <Image
                    style={styles.detailIconFall}
                    source={require('../../assets/icons/sunrise.png')}
                  />
                  <Text style={styles.detailText}>{Sunrise}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Image
                    style={styles.detailIconFall}
                    source={require('../../assets/icons/sunset.png')}
                  />
                  <Text style={styles.detailText}>{Sunset}</Text>
                </View>
              </View>
            </View>
            <Text style={styles.weatherCardTitleBlack}>Weather</Text>
          </View>

          {/** bvdfhdolugrfiejdokaspskdj */}

          <View style={[styles.weatherCard ,{backgroundColor:"#FFD180",borderRadius:10}]}>
            <View style={styles.weatherCardTopOrange} />
            <View style={styles.weatherCardContentYellow}>
              <View>
                <Text style={styles.humidityValue}>{Weather.weather.main.humidity}%</Text>
              </View>
              <Image
                style={styles.humidityIcon}
                source={require('../../assets/icons/humidity.png')}
              />
            </View>
            <Text style={styles.weatherCardTitleBlack}>Humidity</Text>
          </View>

          <View style={[styles.weatherCard ,{backgroundColor:"#BAD2E5",borderRadius:10}]}>
            <View style={styles.weatherCardTopLightBlue} />
            <View style={styles.weatherCardContentWhite}>
              <Text style={styles.uvIndexValue}>Low</Text>
              <View style={styles.uvBarContainer}>
                <Image
                  style={styles.uvBar}
                  source={require('../../assets/icons/uvbar.png')}
                />
                <Text style={styles.uvDot}>.</Text>
              </View>
            </View>
            <Text style={styles.weatherCardTitleBlack}>UV Index</Text>
          </View>
        </View>

        <View style={styles.newsBox}>
          <View style={styles.newsLabelContainer}>
            <Image
              source={require('../../assets/icons/newsLabel.png')}
              style={styles.newsLabelImage}
            />
            <FlatList
              style={styles.topicsList}
              data={topics}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item}
              renderItem={({ item }) => {
                const isActive = item === selectedTopic;
                return (
                  <Pressable
                    style={styles.topicItem}
                    onPress={() => setSelectedTopic(item)}>
                    <Text
                      style={[
                        styles.topicText,
                        isActive && styles.topicTextActive,
                      ]}>
                      {item}
                    </Text>
                    {isActive && <View style={styles.activeIndicator} />}
                  </Pressable>
                );
              }}
            />
          </View>

          <View>
            <View style={styles.newsHeadingContainer}>
              <Text style={styles.newsHeading}>Trending Topics</Text>
              <Text style={styles.newsSubHeading}>
                Stories shaping a greener future.
              </Text>
            </View>

            <FlatList
              style={styles.trendingNewsList}
              horizontal
              showsHorizontalScrollIndicator={false}
              data={News}
              renderItem={({ item }) => (
                <Pressable style={styles.trendingNewsCard}>
                  <Image
                    source={{ uri: item.image_url }}
                    style={styles.trendingNewsImage}
                  />
                  <Text style={styles.trendingNewsTitle}>{item.title}</Text>
                </Pressable>
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              contentContainerStyle={styles.trendingNewsContent}
            />

            <View style={styles.justInHeadingContainer}>
              <Text style={styles.newsHeading}>Just In</Text>
              <Text style={styles.newsSubHeading}>
                Daily reads for eco-minded minds.
              </Text>
            </View>

            <View style={styles.justInNewsContainer}>
              <FlatList
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                showsVerticalScrollIndicator={false}
                data={News}
                renderItem={({ item }) => (
                  <Pressable style={styles.justInNewsCard}>
                    <Image
                      source={{ uri: item.image_url }}
                      style={styles.justInNewsImage}
                    />
                    <Text style={styles.justInNewsTitle}>
                      {item.title}
                    </Text>
                  </Pressable>
                )}
                contentContainerStyle={styles.justInNewsContent}
              />
              <TouchableOpacity style={styles.exploreMoreButton}>
                <Text>Explore More...</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  </SafeAreaView>
);



};
export default HomePage;





const styles = StyleSheet.create({
  safeArea: {
    minHeight: '100%',
    paddingTop: 20,
    width: '100%',
    backgroundColor: '#F6F9E3',
  },
  topNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 72,
    width: '100%',
    // borderBottomWidth: 1,
  },
  topNavLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 168,
  },
  threeBar: {
    height: 40,
    width: 50,
    objectFit: 'contain',
    fontWeight: 'bold',
    transform: [{ scaleX: -1 }],
  },
  logoText: {
    fontSize: 27,
    fontWeight: 'semibold',
    color: '#55B76B',
    fontFamily: 'arieal',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingRight: 5,
    justifyContent: 'flex-end',
  },
  locationText: {
    fontSize: 12,
    width:140,
    fontWeight: 'semibold',
    
    // borderWidth:1,
    paddingRight:8,
    justifyContent:"flex-end",
    textAlign:"right"
  },
  locationIcon: {
    height: 34,
    width: 22,
    objectFit: 'contain',
    // borderWidth:1,
    marginBottom:4
  },
  locationSubText: {
    fontSize: 10.3,
    paddingTop: 4.2,
  },
  mainContainer: {
    paddingBottom: 90,
  },
  searchBarContainer: {
    height: 68,
    width:"100%",
    // backgroundColor:"grey",
    alignItems:"center",
    flexDirection: 'row',
    alignItems:"flex-end",
    justifyContent: 'center',
  },


  searchInputContainer: {
    flexDirection: 'row',
    boxSizing: 'border-box',
    justifyContent: 'space-between',
    height: 52,
    width: '95%',
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 1,
    position:"relative"
  },
  searchDynamicLst:{
   position:"absolute",
   width:"95%",
   backgroundColor:"#efefef",
   borderRadius:10,
   zIndex:1,
   top:55,
   right:4,
  

  },
  searchInput: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'semibold',
    height: '100%',
    width: '72%',
    paddingLeft: 8,
    marginRight: 1,
  },
  searchButton: {
    height: '100%',
    width: '22%',
    backgroundColor: 'green',
    borderEndStartRadius: 10,
    borderEndEndRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    height: 25,
    width: 25,
    transform: [{ scaleX: -1 }],
  },
  weatherCardsContainer: {
    marginTop: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
    maxWidth: 414,
    minHeight: 320,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  weatherCard: {
    height: 144,
    borderRadius: 10,
    width: 174,
    
    position: 'relative',
    justifyContent: 'space-between',
  },
  weatherCardTopGreen: {
    height: 54,
    borderStartStartRadius: 10,
    borderEndStartRadius: 10,
    width: 174,
    backgroundColor: '#66BB6A',
  },
  weatherCardContent: {
    height: 94,
    width: 158,
    backgroundColor: '#F1F8E9',
    borderRadius: 10,
    position: 'absolute',
    top: 14,
    left: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  aqiInfo: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'space-around',
    alignItems: 'center',
    //  backgroundColor:"grey",
     width:"95%"
  },
  aqiValue: {
    fontSize: 30,
    color: 'red',
    // backgroundColor:"red",
    minWidth:45,
    alignItems:"center"
  },
  aqiStatus: {
    fontSize: 15,
    fontWeight: 'semibold',
    // backgroundColor:"coral"
  },
  aqiDescription: {
    paddingHorizontal: 2,
    paddingTop: 7,
    textAlign: 'center',
    
  },
  weatherCardTitle: {
    marginBottom: 10,
    marginLeft: 14,
    fontSize: 16.7,
    fontWeight: 'semibold',
  },
  weatherCardTopBlue: {
    height: 54,
    borderStartStartRadius: 10,
    borderEndStartRadius: 10,
    width: 174,
    backgroundColor: '#42A5F5',
  },
  weatherCardContentBlue: {
    height: 94,
    width: 158,
    backgroundColor: '#C9E5FF',
    borderRadius: 10,
    position: 'absolute',
    top: 14,
    left: 8,
  },
  temperatureInfo: {
    height: 50,
    margin: 3,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position:"relative"
  },
  weatherIcon: {
    left:-8,
    height: 45,
    width: 34,
    marginTop: 15,
    transform: [{ scale: 3 }],
    position:"absolute"

  },
  temperatureTextContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  temperature: {
    fontSize: 33,
    fontWeight: 'bold',
    color: '#296399',
    marginRight: 10,
    height: 35,
  },
  degree: {
    color: '#91c3f2',
  },
  weatherCondition: {
    fontSize: 14,
    marginTop: 3,
    marginRight: 9,
    color: '#658CAF',
  },
  detailsRow: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  detailItem: {
    height: '100%',
    width: 50,
    alignItems: 'center',
    paddingTop: 3,
  },
  detailIcon: {
    width: 24,
    height: 16,
    resizeMode: 'contain',
    fontWeight:"bold",
    tintColor:"#296399"

  },
  detailIconCloud: {
    width: 24,
    height: 16,
    transform: [{ scale: 1.4 }],
    resizeMode: 'contain',
  },
  detailIconFall: {
    width: 24,
    height: 16,
    transform: [{ scale: 1.6 }],
    resizeMode: 'contain',
    // tintColor:"#296399"
    
  },
  detailText: {
    fontSize: 12,
    marginTop: 3,
    fontWeight: 'bold',
  },
  weatherCardTitleBlack: {
    marginBottom: 10,
    marginLeft: 14,
    fontSize: 16.7,
    fontWeight: 'semibold',
    color: '#010101',
  },
  weatherCardTopOrange: {
    height: 54,
    borderStartStartRadius: 10,
    borderEndStartRadius: 10,
    width: 174,
    backgroundColor: '#FB8C00',
  },
  weatherCardContentYellow: {
    height: 94,
    width: 158,
    backgroundColor: '#FFF8E1', // Corrected background
    padding: 10,
    borderRadius: 10,
    position: 'absolute',
    top: 14,
    left: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  humidityValue: {
    fontSize: 28,
    fontWeight: 'semibold',
    marginBottom: 1,
  },
  humidityIcon: {
    height: 40,
    width: 100,
    resizeMode: 'contain',
  },
  weatherCardTopLightBlue: {
    height: 54,
    borderStartStartRadius: 10,
    borderEndStartRadius: 10,
    width: 174,
    backgroundColor: '#02A2BA',
  },
  weatherCardContentWhite: {
    height: 94,
    width: 158,
    backgroundColor: '#E3F2FD', // Corrected background
    borderRadius: 10,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 14,
    left: 8,
  },
  uvIndexValue: {
    fontSize: 22,
    marginBottom: 5,
  },
  uvBarContainer: {
    position: 'relative',
  },
  uvBar: {
    width: 115,
    height: 5,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  uvDot: {
    position: 'absolute',
    top: -22,
    left: 20,
    transform: [{ scale: 3 }],
    color: 'black', // You might want to style this dot
  },
  newsBox: {
    minHeight: 600,
    width: '100%',
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 15,
  },
  newsLabelContainer: {
    marginBottom: 28,
  },
  newsLabelImage: {
    height: 40,
    width: 100,
    marginBottom: 12,
    marginLeft: 2,
    resizeMode: 'contain',
  },
  topicsList: {
    flexDirection: 'row',
    width: '100%',
    paddingLeft: 8,
  },
  topicItem: {
    alignItems: 'center',
    minWidth: 70,
  },
  topicText: {
    color: '#c4c4c4',
    marginBottom: 8,
    fontWeight: 'bold',
    marginRight: 14,
  },
  topicTextActive: {
    color: '#000000',
  },
  activeIndicator: {
    width: 56,
    marginRight: 14,
    height: 2.5,
    backgroundColor: '#F98121',
  },
  newsHeadingContainer: {
    marginBottom: 24,
  },
  newsHeading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  newsSubHeading: {
    fontSize: 13,
    paddingLeft: 2,
  },
  trendingNewsList: {
    height: 247,
    marginBottom: 20,
  },
  trendingNewsCard: {
    borderRadius: 10,
    boxSizing: 'border-box',
    height: 190,
    width: 280,
    backgroundColor: 'grey',
  },
  trendingNewsImage: {
    height: '100%',
    width: 280,
    borderRadius: 10,
    objectFit: 'fill',
  },
  trendingNewsTitle: {
    margin: 10,
    paddingLeft: 5,
    fontSize: 16,
    height: 40,
    width:"94%"
  },
  separator: {
    width: 12,
  },
  trendingNewsContent: {
    paddingHorizontal: 12,
  },
  justInHeadingContainer: {
    marginBottom: 20,
  },
  justInNewsContainer: {
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  justInNewsContent: {
    paddingHorizontal: 6,
    paddingVertical: 8,
  },
  justInNewsCard: {
    borderRadius: 10,
    // boxSizing: 'border-box',
    height: 116,
    width: 174,
    backgroundColor: 'grey',
    marginBottom: 60,
  },
  justInNewsImage: {
    height: '100%',
    width: 174,
    borderRadius: 10,
    objectFit: 'fill',
  },
  justInNewsTitle: {
    margin: 10,
    fontSize: 12,
    minHeight:60,
  },
  exploreMoreButton: {
    alignItems: 'flex-end',
    paddingRight: 20,
  },
});



// return (
//   <SafeAreaView
//     style={{
//       minHeight: '100%',
//       paddingTop: 20,
      
     
//       width: '100%',
//       backgroundColor: '#F6F9E3',
//     }}>
//     <View style={styles.topNavBar}>
//       <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           width: 168,
//         }}>
//         <Image
//           style={styles.threeBar}
//           source={require('../../assets/icons/menu.png')}></Image>
//         <View>
//           <Text
//             style={{
//               fontSize: 27,
//               fontWeight: 'semibold',
//               color: '#55B76B',
//               fontFamily: 'arieal',
//             }}>
//             Sustanify
//           </Text>
//         </View>
//       </View>

//       <Pressable>
//         <View
//           style={{
//             flexDirection: 'row',
//             alignItems: 'flex-end',
//             paddingRight: 5,
//             justifyContent: 'flex-end',
//           }}>
//           <Text
//             style={{fontSize: 16, fontWeight: 'semibold', paddingTop: 22}}>
//             Gurugram
//           </Text>
//           <Image
//             source={require('../../assets/icons/location.png')}
//             style={{height: 30, width: 21, objectFit: 'contain'}}></Image>
//         </View>
//         <Text style={{fontSize: 10.3, paddingTop: 4.2}}>
//           Click here to choose location
//         </Text>
//       </Pressable>
//     </View>

//     <ScrollView showsVerticalScrollIndicator={false}  >


//      <View style={{paddingBottom:90}}>
      
//      <View
//         style={{
//           height: 65,
//           paddingLeft:5,
//           backgroundColor: '',
//           flexDirection: 'row',
//           alignItems: 'flex-end',
//           justifyContent: 'space-between',
//         }}>
//         <TouchableOpacity
//           style={{
//             height: 48,
//             width: '35%',
//             borderRadius: 10,
//             backgroundColor: 'green',
//             alignItems: 'center',
//             justifyContent: 'flex-start',
//           }}>
//           <Text
//             style={{color: 'white', fontSize: 16, fontWeight: 'semibold'}}>
//             Fetch{' '}
//           </Text>
//           <Text
//             style={{color: 'white', fontSize: 16, fontWeight: 'semibold'}}>
//             current location
//           </Text>
//         </TouchableOpacity>
//         <View style={{flexDirection:"row",boxSizing:"border-box",justifyContent:"space-between",height:48,width:"55%",borderRadius: 10,borderColor: 'grey', borderWidth: 1}}>
//           <TextInput
//             placeholder="Enter your location"
//             style={{
//               color: 'black',
//               fontSize: 16,
//               fontWeight: 'semibold',
//               height: "100%",
//               width: '72%',
//               paddingLeft:8,
              
//               marginRight: 1,
//             }}></TextInput>
//             <TouchableOpacity style={{height:"100%",width:"22%",backgroundColor:"green",borderEndStartRadius:10,borderEndEndRadius:10,justifyContent:"center",alignItems:"center"}}>
//           <Image source={require("../../assets/icons/search.png")} style={{height:25,width:25,transform: [{scaleX: -1}]}}></Image>
//         </TouchableOpacity>
//         </View>
        
//       </View>  {/** Search Bar */}
      
//       <View style={{marginTop:30,flexDirection:"row",flexWrap:"wrap",gap:8,justifyContent:"center",maxWidth:414,minHeight:320,borderBottomWidth:1,borderBottomColor:"grey"}}>
        
//         <View style={{height:144,borderRadius:10,width:174,backgroundColor:"#A5D6A7",position:"relative",justifyContent:"space-between"}}>
//           <View style={{height:54,borderStartStartRadius:10,borderEndStartRadius:10,width:174,backgroundColor:"#66BB6A"}}></View>
//           <View style={{height:94,width:158,backgroundColor:"#F1F8E9",borderRadius:10,position:"absolute",top:14,left:8}}>

//                  <View style={{flexDirection:"row",height:40,justifyContent:'space-around',alignItems:'center'}}>
//                   <Text style={{fontSize:30,color:"red"}}>370</Text>
//                   <Text style={{fontSize:15,fontWeight:"semibold"}}>Satisfactory</Text>
//                  </View>

//                  <Text style={{paddingHorizontal:2,paddingTop:7,textAlign:"center"}}>May cause breathing illness</Text>





//           </View>
//           <Text style={{marginBottom:10,marginLeft:14,fontSize:16.7,fontWeight:"semibold"}}>Air Quality Index</Text>
//         </View>

//         <View style={{height:144,borderRadius:10,width:174,backgroundColor:"#90CAF9",position:"relative",justifyContent:"space-between"}}>
//           <View style={{height:54,borderStartStartRadius:10,borderEndStartRadius:10,width:174,backgroundColor:"#42A5F5"}}></View>
//           <View style={{height:94,width:158,backgroundColor:"#C9E5FF",borderRadius:10,position:"absolute",top:14,left:8}}>


//               <View style={{height:50,margin:3,backgroundColor:"",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
//                   <Image source={require("../../assets/icons/weather1.png")} style={{height:45,width:34,marginTop:15,transform: "scale(3)"}}></Image>
//                   <View style={{alignItems:"flex-end",justifyContent:"flex-start"}}>
//                       <Text style={{fontSize:33,fontWeight:"bold",color:"#296399",marginRight:10,height:35}}>32<Text style={{color:"#91c3f2"}}>º</Text></Text>
//                       <Text style={{fontSize:14,marginTop:3,marginRight:9,color:"#658CAF"}}>Cloudy Day</Text>
//                   </View>
//               </View>

//               <View style={{height:40,flexDirection:"row",justifyContent:"space-around"}}>
//                   <View style={{height:"100%" , width:50 ,alignItems:"center",paddingTop:3}}>
//                       <Image style={{width:24,height:16}} source={require("../../assets/icons/air.png")}></Image>
//                       <Text style={{fontSize:12,marginTop:3,fontWeight:"bold"}}>12 Km/h</Text>
//                   </View>
//                   <View style={{height:"100%" , width:50 ,alignItems:"center",paddingTop:3}}>
//                       <Image style={{width:24,height:16,transform: "scale(1.4)"}} source={require("../../assets/icons/cloud.png")}></Image>
//                       <Text style={{fontSize:12,marginTop:3,fontWeight:"bold"}}>83 %</Text>
//                   </View>
//                   <View style={{height:"100%" , width:50 ,alignItems:"center",paddingTop:3}}>
//                       <Image style={{width:24,height:16,transform: "scale(1.18)"}} source={require("../../assets/icons/fall.png")}></Image>
//                       <Text style={{fontSize:12,marginTop:3,fontWeight:"bold"}}>2 of 8</Text>
//                   </View>
//               </View>




//           </View>
//           <Text style={{marginBottom:10,marginLeft:14,fontSize:16.7,fontWeight:"semibold",color:"#010101"}}>Weather</Text>
//         </View>
//         <View style={{height:144,borderRadius:10,width:174,backgroundColor:"#FFD180",position:"relative",justifyContent:"space-between"}}>
//           <View style={{height:54,borderStartStartRadius:10,borderEndStartRadius:10,width:174,backgroundColor:"#FB8C00"}}></View>
//           <View style={{height:94,width:158,backgroundColor:"#FFF8E1",padding:10,borderRadius:10,position:"absolute",top:14,left:8}}>
//               <View><Text style={{fontSize:28,fontWeight:"semibold",marginBottom:1}}>67%</Text></View>
//               <Image style={{height:40,width:100}} source={require("../../assets/icons/humidity.png")}></Image>
//           </View>
//           <Text style={{marginBottom:10,marginLeft:14,fontSize:16.7,fontWeight:"semibold",color:"#010101"}}>Humidity</Text>
//         </View>


//         <View style={{height:144,width:174,backgroundColor:"#BAD2E5",borderRadius:10,position:"relative",justifyContent:"space-between"}}>
//           <View style={{height:54,borderStartStartRadius:10,borderEndStartRadius:10,width:174,backgroundColor:"#02A2BA"}}></View>
//           <View style={{height:94,width:158,backgroundColor:"#E3F2FD",borderRadius:10,position:"absolute",justifyContent:"center",alignItems:"center",top:14,left:8}}>
//               <Text style={{fontSize:22,marginBottom:5}}>Low</Text>
//               <View style={{position:"relative"}}>
//                   <Image style={{width:115,height:5,borderRadius:10}} source={require("../../assets/icons/uvbar.png")}></Image>
//                  <Text style={{position:"absolute",top:-22,left:20,transform:"scale(3)"}}>.</Text>
//               </View>
//           </View>
//           <Text style={{marginBottom:10,marginLeft:14,color:"#010101",fontSize:16.7,fontWeight:"semibold"}}>UV Index</Text>
//         </View>

//       </View>     {/* WeatherCards */}
      
       
//        <View style={{minHeight:600,width:"100%",paddingLeft:8,paddingRight:8,paddingTop:15}}> 
       
       
//         <View style={{marginBottom:28}} >
//           <Image source={require("../../assets/icons/newsLabel.png")} style={{height:40,width:100,marginBottom:12,marginLeft:2}}></Image>
//           <FlatList
//           style={{flexDirection:"row",width:"100%",paddingLeft:8}}
//           data={topics}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           keyExtractor={(item) => item}
//           renderItem={({item})=>{
//           const isActive = item===selectedTopic;

          

//             return(
//                <Pressable style={{alignItems:"center",minWidth:70,alignItems:"center"}} onPress={() => setSelectedTopic(item)}>
//                  <Text style={{color: isActive ? "#000000" : "#c4c4c4",marginBottom:8,fontWeight:"bold",marginRight:14,}}>
//               {item}
//             </Text>
//             {isActive && <View style={{width:56,marginRight:14,height:2.5,backgroundColor:"#F98121"}} />}
//                </Pressable>
//             )
//           }}
//           >
//           </FlatList>
//         </View>   {/* Label news array */}

//         <View>

//        <View style={{marginBottom:24}}>
//        <Text style={{fontSize:18,fontWeight:"600",marginBottom:8}}>Trending Topics</Text>
//         <Text style={{fontSize:13,paddingLeft:2}}>Stories shaping a greener future.</Text>
//        </View> {/* News HEading SubHeading 1 */}
       

//        <FlatList
          
//           style={{height:247,marginBottom:20}}
          
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           data={newsSections}
//           renderItem={({item})=>{

           

//             return(
//                <Pressable style={{borderRadius:10,boxSizing:"border-box",height:190,width:280,backgroundColor:"grey"}} >
//                  <Image source={{uri:item.imageUrl}} style={{height:"100%",width:280,borderRadius:10,objectFit:"fill"}}></Image>
//                  <Text style={{margin:10,paddingLeft:5,fontSize:16,height:40}}>{item.heading}</Text>
//                </Pressable>
//             )
//           }}
//           ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
//           contentContainerStyle={{ paddingHorizontal: 12 }}
//           >
//           </FlatList>
        
//           <View style={{marginBottom:20}}>
//        <Text style={{fontSize:18,fontWeight:"600",marginBottom:8}}>Just In</Text>
//         <Text style={{fontSize:13,paddingLeft:2}}>Daily reads for eco-minded minds.</Text>
//        </View> {/* News HEading SubHeading 2 */}

//        <View style={{paddingBottom:20}}>
//        <FlatList
          
          
          
//           numColumns={2}
//           columnWrapperStyle={{ justifyContent: 'space-between' }}
//           showsVerticalScrollIndicator={false}
//           data={newsSections}
//           renderItem={({item})=>{

           

//             return(
//                <Pressable style={{borderRadius:10,boxSizing:"border-box",height:116,width:174,backgroundColor:"grey",marginBottom:60}} >
//                  <Image source={{uri:item.imageUrl}} style={{height:"100%",width:174,borderRadius:10,objectFit:"fill"}}></Image>
//                  <Text style={{margin:10,fontSize:16,fontSize:12,height:40}}>{item.heading}</Text>
//                </Pressable>
//             )
//           }}
          
//           contentContainerStyle={{ paddingHorizontal: 6, paddingVertical: 8 }}
//           >
//           </FlatList>
//            <TouchableOpacity style={{alignItems:"flex-end",paddingRight:20}}>
//             <Text>Explore More...</Text>
//            </TouchableOpacity>
//        </View>

//         </View> {/* MainNewsCards */}
//       </View>   {/* News Box */}
      
      
    
//      </View>
//     </ScrollView>
//   </SafeAreaView>
// );

