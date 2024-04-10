import React, { useState,useEffect } from 'react';
import {Button, Header} from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { Link,useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function ChoosingSignUpMethod() {

  const [colorOfTitle, setcolorOfTitle] = useState("black")
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
  }, [Cookies.get("token"),token,colorOfTitle])
  return (
    <div>
      <Header as='h2' textAlign='center' class='ui white' color={colorOfTitle}>
        Sign Up As a ...
      </Header>
      <Button.Group widths='3'  >
        <Button color="red" inverted onClick={() => setcolorOfTitle("red")} as={NavLink} to={'/signup/jobseeker' }>Job Seeker</Button>
        <Button color="pink" inverted onClick={() => setcolorOfTitle("pink")}  as={NavLink} to={'/signup/employer' }>Employer</Button>
        <Button color="orange" inverted onClick={() => setcolorOfTitle("orange")} as={NavLink} to={'/signup/systemuser' }>System User</Button>
      </Button.Group>
    </div>
  );
}