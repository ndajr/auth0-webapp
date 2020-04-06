import React, { useState, useEffect } from "react";
import { Card, Button } from "@material-ui/core";
import styled from "@emotion/styled";
import axios from "axios";

const StyledCard = styled(Card)`
  padding: 20px;
  margin: 100px auto;
  max-width: 40vw;
  min-width: 300px;
`;

const Login = () => {
  const [providers, setProviders] = useState({});
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/social-login`)
      .then(({ data }) => {
        setProviders(data);
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  return (
    <StyledCard>
      {Object.keys(providers).map((name) => (
        <Button
          key={name}
          variant="contained"
          color="primary"
          href={providers[name]}
        >
          {name}
        </Button>
      ))}
    </StyledCard>
  );
};

export default Login;
