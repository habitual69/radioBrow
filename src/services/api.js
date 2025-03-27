// api.js
import axios from 'axios';

const SERVER_LIST = [
  { "ip": null, "name": "fi1.api.radio-browser.info" },
  { "ip": null, "name": "de2.api.radio-browser.info" }
];

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'RadioBrowser-App/0.1.0',
    'Accept': 'application/json',
  },
});

const getRandomServer = () => {
  const randomServer = SERVER_LIST[Math.floor(Math.random() * SERVER_LIST.length)];
  return `https://${randomServer.name}`;
};

export const initApi = () => {
  const baseURL = getRandomServer();
  api.defaults.baseURL = baseURL;
  return baseURL;
};

export const getStations = async (endpoint, params = {}, limit = 600) => {
  try {
    const response = await api.get(`/json/stations/${endpoint}`, {
      params: { limit, ...params },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching stations by ${endpoint}:`, error);
    throw error;
  }
};

export const getStationByUuid = async (uuid) => {
  try {
    const response = await api.get(`/json/stations/byuuid/${uuid}`);
    return response.data[0];
  } catch (error) {
    console.error('Error fetching station by UUID:', error);
    throw error;
  }
};

export const searchStations = async (params, limit = 600) => {
  try {
    const response = await api.get('/json/stations/search', {
      params: { limit, ...params },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching stations:', error);
    throw error;
  }
};

export const getTopStations = async (limit = 600) => {
  try {
    const response = await api.get(`/json/stations/topclick/${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching top stations:', error);
    throw error;
  }
};

export const getRecentStations = async (limit = 60) => {
  try {
    const response = await api.get(`/json/stations/lastchange/${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recent stations:', error);
    throw error;
  }
};

export const getCountries = async () => {
  try {
    const response = await api.get('/json/countries');
    return response.data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};

export const getLanguages = async () => {
  try {
    const response = await api.get('/json/languages');
    return response.data;
  } catch (error) {
    console.error('Error fetching languages:', error);
    throw error;
  }
};

export const getTags = async () => {
  try {
    const response = await api.get('/json/tags');
    return response.data;
  } catch (error) {
    console.error('Error fetching tags:', error);
    throw error;
  }
};

export const getCodecs = async () => {
  try {
    const response = await api.get('/json/codecs');
    return response.data;
  } catch (error) {
    console.error('Error fetching codecs:', error);
    throw error;
  }
};

export const voteForStation = async (stationUuid) => {
  try {
    const response = await api.get(`/json/vote/${stationUuid}`);
    return response.data;
  } catch (error) {
    console.error('Error voting for station:', error);
    throw error;
  }
};

export const recordStationClick = async (stationUuid) => {
  try {
    const response = await api.get(`/json/url/${stationUuid}`);
    return response.data;
  } catch (error) {
    console.error('Error recording station click:', error);
    throw error;
  }
};

export default {
  initApi,
  getStations,
  getStationByUuid,
  searchStations,
  getTopStations,
  getRecentStations,
  getCountries,
  getLanguages,
  getTags,
  getCodecs,
  voteForStation,
  recordStationClick,
};