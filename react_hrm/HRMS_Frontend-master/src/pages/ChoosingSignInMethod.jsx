import React from 'react';
import { useState,useEffect } from 'react';
import {Button, Header} from 'semantic-ui-react';
import { Link,useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
export default function ChoosingSignInMethod() {
  const history = useHistory();
  const [token, setToken] = useState();
  useEffect(() => {
    if (Cookies.get("username") !== null && Cookies.get("username") !== undefined && Cookies.get("token") !== null && Cookies.get("token") !== undefined) {
      console.log(Cookies.get("token"));
      setToken(Cookies.get("token"));
    }
    else {
        history.push("/signin");
    }
  }, [Cookies.get("token"),token])
  return (
    <div>
      <Header as='h2' textAlign='center' class='ui white'>
        Sign In As a ...
      </Header>
      <Button.Group widths='3' >
        <Button>Job Seeker</Button>
        <Button>Employer</Button>
        <Button>System User</Button>
      </Button.Group>
    </div>
  );
}
