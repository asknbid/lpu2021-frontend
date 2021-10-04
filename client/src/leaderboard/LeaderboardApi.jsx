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

async function getEntries() {
  let response = await api
    .get("entries/")
    .then((response) => response)
    .catch((error) => error.response);
  return response.data;
}

export { getPools, getEntries };
