import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import { getPools, getStocks, joinPool } from "./PoolApi";

const PoolForm = () => {
  const [poolsOptions, setPoolsOptions] = useState([]);

  const [stocksOptions, setStocksOptions] = useState([]);

  const [selectedPool, setSelectedPool] = useState(null);

  const [selectedStocks, setSelectedStocks] = useState([]);

  const [userID, setUserID] = useState(null);

  const [showAlert, setShowAlert] = useState(false);

  const [alertMessage, setAlertMessage] = useState("");

  const [alertVariant, setAlertVariant] = useState("danger");

  useEffect(() => {
    async function fetchPools() {
      let pools_response = await getPools();
      let poolsOptions = [];
      for (let item of pools_response.results) {
        poolsOptions.push({
          value: item.id,
          label: item.name,
        });
      }
      setPoolsOptions(poolsOptions);
    }
    fetchPools();
  }, []);

  useEffect(() => {
    async function fetchStocks() {
      {
        /* 
        Task 1:
            Step 1 out of 4: This function has to handle the getStocks API repsonse.
                    Refer the above fetchPools function and complete this function similarly.
                    Hint : First have a look at getStocks function defined in PoolApi.jsx
      */
     let stocks_response = await getStocks();
     // console.log(stocks_response);
     let stocksOptions = [];
     for(let item of stocks_response.results){
       // console.log(item);
       stocksOptions.push({
         value: item.id,
         label: item.name,
       });
     }
        setStocksOptions(stocksOptions);
      }
    }

    fetchStocks();
  }, []);

  const showSuccessAlert = (message) => {
    setShowAlert(true);
    setAlertMessage(message);
    setAlertVariant("success");
  };

  const showDangerAlert = (message) => {
    setShowAlert(true);
    setAlertMessage(message);
    setAlertVariant("danger");
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (selectedPool === null) {
      showDangerAlert("Please select a pool!");
      return;
    } 
    // Task 2 : Step 1 out of 4: Add a condition to check if userID is empty.
    else if (selectedStocks.length === 0) { // Task 2 : Step 2 out of 4: Edit this condition to not let the user select more than 4 stocks. 
      showDangerAlert("Stocks cannot be empty!");
      return;
    }

    let response = await joinPool({
      user: "", // Task 1 : Step 3 out of 4: Add userID from the state to the payload.
      pool: selectedPool.value,
      stocks: selectedStocks.map((item) => item.value),
    });

    if (response.status === 201) {
      // Task 2 : Step 3 out 4: Call the showSuccessAlert function and pass an appropriate message 
      //                  to alert the user that they have joined the pool.
    } else {
      let message = "";
      for (let item of Object.keys(response.data)) {
        message = message.concat(`${item} : ${response.data[item]}\n`);
      }
      // Task 2 : Step 4 out of 4: Call the showDangerAlert function and pass an appropriate message 
      //                  to alert the user that there has been an error.
    }
  };

  return (
    <>
      <Row>
        <Form>
          <Form.Group className="mb-3" controlId="formGroupGameID">
            <Form.Label>Select a Pool</Form.Label>
            <Select
              options={poolsOptions}
              value={selectedPool}
              onChange={(item) => setSelectedPool(item)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupSelectSecurities">
            <Form.Label>Add Stocks</Form.Label>
            <Select
              closeMenuOnSelect={false}
              isMulti
              options={stocksOptions}
              value={selectedStocks}
              onChange={(item) => setSelectedStocks(item)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupUserID">
            <Form.Label>Enter User ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="User ID"
              value={userID}
              onChange={(event) => setUserID(event.target.value)}
            />
          </Form.Group>
        </Form>
      </Row>
      <Row>
        <Alert
          show={showAlert}
          variant={alertVariant}
          onClose={() => {
            setShowAlert(false);
            setAlertMessage("");
          }}
          dismissible
        >
          <Alert.Heading>{alertMessage}</Alert.Heading>
        </Alert>
      </Row>
      <Row style={{ padding: 10 }}>
        <Button variant="outline-success" type="submit" onClick={onSubmit}>
          Join Pool
        </Button>
      </Row>
    </>
  );
};

export default PoolForm;
