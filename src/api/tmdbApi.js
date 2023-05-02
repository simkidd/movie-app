import axios from "axios";
import apiConfig from "./apiConfig";

const { api_key, base_url } = apiConfig;

export const movieType = {
  upcoming: "upcoming",
  popular: "popular",
  top_rated: "top_rated",
};

export const tvType = {
  popular: "popular",
  top_rated: "top_rated",
  on_the_air: "on_the_air",
};

const tmdbApi = {
  getMoviesList: async (type = movieType.popular, page = 1) => {
    const response = await axios.get(
      `${base_url}/movie/${type}?api_key=${api_key}&page=${page}`
    );
    return response.data.results;
  },

  getTVList: async (type = tvType.popular, page = 1) => {
    const response = await axios.get(
      `${base_url}/tv/${type}?api_key=${api_key}&page=${page}`
    );
    return response.data.results;
  },

  getVideos: async (type, id) => {
    const response = await axios.get(
      `${base_url}/${type}/${id}/videos?api_key=${api_key}`
    );
    return response.data.results;
  },

  search: async (query) => {
    const response = await axios.get(
      `${base_url}/search/multi?api_key=${api_key}&query=${query}`
    );
    return response.data.results;
  },

  getDetail: async (type, id) => {
    const response = await axios.get(
      `${base_url}/${type}/${id}?api_key=${api_key}`
    );
    return response.data;
  },

  getCredits: async (type, id) => {
    const response = await axios.get(
      `${base_url}/${type}/${id}/credits?api_key=${api_key}`
    );
    return response.data;
  },

  getSimilar: async (type, id) => {
    const response = await axios.get(
      `${base_url}/${type}/${id}/similar?api_key=${api_key}`
    );
    return response.data.results;
  },
};

export default tmdbApi;
