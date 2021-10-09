import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  timeout: 3000,
});

async function getPools() {
  let response = await api
    .get("pools/")
    .then((response) => response)
    .catch((error) => error.response);
  return response.data;
}

async function getStocks() {
  let response = await api
    .get("stocks/")
    .then((response) => response)
    .catch((error) => error.response);
  return response.data;
}

async function joinPool(payload) {
  let response = await api
    .post("entries/", payload)
    .then((response) => response)
    .catch((error) => error.response);
  return response;
}

export { getPools, getStocks, joinPool };
