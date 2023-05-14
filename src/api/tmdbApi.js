import axios from "axios";
import apiConfig from "./apiConfig";

const { api_key, base_url } = apiConfig;

export const category = {
  movie: "movie",
  tv: "tv",
};

export const movieType = {
  upcoming: "upcoming",
  popular: "popular",
  top_rated: "top_rated",
};

export const tvType = {
  popular: "popular",
  top_rated: "top_rated",
  on_the_air: "on_the_air",
  airing_today: "airing_today",
};

export const timeWindow = {
  day: "day",
  week: "week",
};


const tmdbApi = {
  getMoviesList: async (category, type) => {
    const url = `${base_url}/${category}/${type}?api_key=${api_key}&language=en-US&page=1`;
    const response = await axios.get(url);
    return response.data;
  },
  
  getTvList: async (category, type) => {
    const url = `${base_url}/${category}/${type}?api_key=${api_key}&language=en-US&page=1`;
    const response = await axios.get(url);
    return response.data;
  },

  discover: async(category, sortBy, page = 1)=>{
    const url = `${base_url}/discover/${category}?api_key=${api_key}&sort_by=${sortBy}&page=${page}`;
    const response = await axios.get(url);
    return response.data;
  },

  getVideos: async (category, id) => {
    const url = `${base_url}/${category}/${id}/videos?api_key=${api_key}`;
    const response = await axios.get(url);
    return response.data.results;
  },

  search: async (query) => {
    const url = `${base_url}/search/multi?api_key=${api_key}&query=${query}`;
    
    const response = await axios.get(url);
    return response.data.results;
  },

  detail: async (category, id) => {
    const url = `${base_url}/${category}/${id}?api_key=${api_key}`;
    const response = await axios.get(url);
    return response.data;
  },

  credits: async (category, id) => {
    const url = `${base_url}/${category}/${id}/credits?api_key=${api_key}`;
    const response = await axios.get(url);
    return response.data.cast;
  },

  similar: async (category, id) => {
    const url = `${base_url}/${category}/${id}/similar?api_key=${api_key}`;
    const response = await axios.get(url);
    return response.data.results;
  },
  getTrending: async (category, timeWindow) => {
    const url = `${base_url}/trending/${category}/${timeWindow}?api_key=${api_key}`;
    const response = await axios.get(url);
    return response.data;
  },
  getTvSeasons: async (id, season) => {
    const url = `${base_url}/tv/${id}/season/${season}?api_key=${api_key}`;
    const response = await axios.get(url);
    return response.data;
  },
  getTvEpisodes: async (id, season, episode) => {
    const url = `${base_url}/tv/${id}/season/${season}/episode/${episode}?api_key=${api_key}`;
    const response = await axios.get(url);
    return response.data;
  },
};

export default tmdbApi;
