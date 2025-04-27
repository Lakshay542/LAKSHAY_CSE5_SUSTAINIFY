import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiKeysObj } from '../apiKeys';
import { Alert } from 'react-native';

export const fetchSuggestions = createAsyncThunk(


  'location/fetchSuggestions',
  async (query, { rejectWithValue }) => {
    try {
      const accessToken = apiKeysObj.access_token;
      const apiKey = apiKeysObj.apiKey;

      const response = await fetch(
        `https://atlas.mapmyindia.com/api/places/search/json?query=${encodeURIComponent(query)}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();

      return data.suggestedLocations || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const API_KEY = "feb0bed315c6c944329072240b357a24";

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async ({ lat, lon }, { rejectWithValue }) => {
    
    try {
      const response1 = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );

      const response2 = await fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`);

      if (!response1.ok) {
        throw new Error("Failed to fetch weather data");
      }

      if (!response2.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const data1 = await response1.json();
      const data2 = await response2.json();
     
      
      return {weather:data1,aqi:data2}
      // Alert.alert(data.name)
      // return data;
      
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



export const fetchSelectedNews = createAsyncThunk(
  'news/fetchNews',
  async (selectedTopic, { rejectWithValue }) => {
    
    const apiKey = "pub_798107298af4272858da1b085968c5d7c4f29";
    try {
      const response = await fetch(
        `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${selectedTopic}&country=in&language=en`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const data = await response.json();


      return data.results;
      
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const newsSlice = createSlice({

  name:"news",
  initialState:{
    loading:false,
    error:null,
    News:[]
  },
  reducers:{
    setPreSearchedNews : (state,action)=>{
      state.News = action.payload;
    }
  }
  ,extraReducers: (builder)=>{
    builder
    .addCase(fetchSelectedNews.pending,(state)=>{
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchSelectedNews.fulfilled,(state,action)=>{
      state.News = action.payload;
      state.loading = false;

    })
    .addCase(fetchSelectedNews.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
      
    });
  }
})

export const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    weatherLoading: false,
    error: null,
    Weather: {weather:{
      coord: { lon: 76.6239, lat: 28.1975 },
      weather: [
        {
          id: 800,
          main: "Clear",
          description: "cloudy sky",
          icon: "01d"
        }
      ],
      base: "stations",
      main: {
        temp: 309.65,            // in Kelvin (≈ 35.5°C)
        feels_like: 306.41,
        temp_min: 308.65,
        temp_max: 308.65,
        pressure: 1010,
        humidity: 17,
        sea_level: 1010,
        grnd_level: 981
      },
      visibility: 10000,          // in meters
      wind: {
        speed: 5.63,
        deg: 160,
        gust: 7.02
      },
      clouds: { all: 5 },
      dt: 1744170251,             // UNIX timestamp
      sys: {
        country: "IN",
        sunrise: 1744158885,
        sunset: 1744204503
      },
      timezone: 19800,            // Offset from UTC in seconds (5.5 hours)
      id: 1258178,
      name: "Rewāri",
      cod: 200
    },aqi:{
      "coord": {
        "lon": 76.6167,
        "lat": 28.1833
      },
      "list": [
        {
          "main": {
            "aqi": 3
          },
          "components": {
            "co": 172.89,
            "no": 0.04,
            "no2": 4.71,
            "o3": 107.87,
            "so2": 2.3,
            "pm2_5": 23.87,
            "pm10": 64.13,
            "nh3": 7.89
          },
          "dt": 1744461587
        }
      ]
    }},
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.weatherLoading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.weatherLoading = false;
        state.Weather = action.payload;
        // Alert.alert(state.weather.name)
        
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.weatherLoading = false;
        state.error = action.payload || "Something went wrong";
        
      });
  },
});


const locationSlice = createSlice({
  name: 'location',
  initialState: {
    suggestions: [],
    selectedLocation: {},
    isLocated: false,
    loading: false,
    error: null,
    coordinates:{latitude:null,longitude:null,Location:null},
    isCoordinated:false
  },
  reducers: {
    setSelectedLocation: (state, action) => {
      state.selectedLocation = action.payload;
    },
    setIsLocated: (state, action) => {
      state.isLocated = action.payload;
    },
    setCoordinates :(state,action)=>{
      state.coordinates = action.payload;
    },
    setIsCoordinated:(state,action)=>{
      state.isCoordinated=true
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuggestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSuggestions.fulfilled, (state, action) => {
        state.loading = false;
        state.suggestions = action.payload;
      })
      .addCase(fetchSuggestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedLocation, setIsLocated,setCoordinates,setIsCoordinated } = locationSlice.actions;
export const {setPreSearchedNews} = newsSlice.actions;
export default locationSlice;

