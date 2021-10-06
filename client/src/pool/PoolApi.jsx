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
  {
    /* 
    Task 1:
        Step 2 out of 4: This function has to fetch stocks from the API.
                Refer the above getPools function and complete this function similarly.
                The endpoint to get stocks is "stocks/"
    */
    let response = await api
      .get("stocks/")
      .then((response) => response)
      .catch((error) => error.response);
    return response.data;
  }
}

async function joinPool(payload) {
  let response = await api
    .post("entries/", payload) // Task 1: Step 4 out of 4: Pass the endpoint "entries/" and payload to the post request. This is the last step of Task 1.
    .then((response) => response)
    .catch((error) => error.response);
  return response;
}

export { getPools, getStocks, joinPool };
