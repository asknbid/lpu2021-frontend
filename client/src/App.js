import React, { useState } from "react";
import "./App.css";
import Pool from "./pool/Pool";
import Leaderboard from "./leaderboard/Leaderboard";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [viewLeaderboard, setViewLeaderboard] = useState(false);

  return (
    <div className="App">
      <Container
        fluid
        className="justify-content-md-center"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Col lg={3} style={{ paddingTop: 100, textAlign: "left" }}>
          {viewLeaderboard ? <Leaderboard/> : <Pool />}

          <Row style={{ padding: 10 }}>
            <Button
              variant="outline-success"
              onClick={() => setViewLeaderboard(!viewLeaderboard)}
            >
              {viewLeaderboard ? "Go Back" : "View Leaderboards"}
            </Button>
          </Row>
        </Col>
      </Container>
    </div>
  );
};

export default App;
