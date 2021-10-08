import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import { getPools, getEntries } from "./LeaderboardApi";

const Leaderboard = () => {
  const [poolsOptions, setPoolsOptions] = useState([]);

  const [selectedPool, setSelectedPool] = useState(null);

  const [entries, setEntries] = useState([]);

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
      setSelectedPool(poolsOptions[0]);
    }
    fetchPools();
  }, []);

  useEffect(() => {
    async function fetchEntries() {
      let entries_response = await getEntries();
      setEntries(entries_response.results);
    }
    fetchEntries();
  }, []);

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
        </Form>
      </Row>
      <Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th># Rank</th>
              <th>Returns</th>
              <th>User ID</th>
            </tr>
          </thead>
          <tbody>
            {/*
              Task 3 : Step 1 out of 3: Delete the static data.
            */}
            
            {selectedPool !== null
              ? entries
                  .filter((entry) => entry.pool === selectedPool.value)
                  .sort((a, b) => (a.returns < b.returns ? 1 : -1)) // Task 3 : Step 3 out of 3: Check whether the sorting condition is correct. This is you final task.
                  .map(
                    (entry, index) => {
                    
                    /*
                      Task 3 : Step 2 out of 3: 
                        Map the appropriate fields of the entry to the table row.
                        Check the format of the static data for reference.
                    */return(
                      <tr>
                      <td>{index+1}</td>
                      <td>{entry.returns}</td>
                      <td>{entry.user}</td>
                    </tr>
                    )
                    }
   
                  )
              : null}
          </tbody>
        </Table>
      </Row>
    </>
  );
};

export default Leaderboard;
