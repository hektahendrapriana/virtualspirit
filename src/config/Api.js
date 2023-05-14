import axios from "axios";
import { defaultConf } from "./DefaultConf";
// const { createProxyMiddleware } = require('http-proxy-middleware');

export default () => {
  const token = sessionStorage.getItem('token');

  const instanceLogin = axios.create({
    baseURL: defaultConf.url,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization",
      // "Access-Control-Allow-Credentials": true,
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    // proxy: createProxyMiddleware({ target: defaultConf.url, changeOrigin: true}),
  },
  { crossdomain: true });

  const instanceDefault = axios.create({
    baseURL: defaultConf.url,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization",
      // "Access-Control-Allow-Credentials": true,
      Accept: "application/json",
      Authorization: "",
    },
    // proxy: createProxyMiddleware({ target: defaultConf.url, changeOrigin: true}),
  },
  { crossdomain: true });
  if (token) {
    return instanceLogin;
  } else {
    return instanceDefault;
  }
};
