import React, { useState, useEffect } from 'react';
import { Dropdown, Icon, Input, Menu, Button, Label, Form } from 'semantic-ui-react'
import Cookies from 'js-cookie';
import { Link, useHistory, NavLink, useLocation } from 'react-router-dom';
import swal from 'sweetalert';
import SearchService from '../services/SearchService';
export default function Navi() {
  const history = useHistory();
  const [isAuthenticated, setIsAuthanticated] = useState();
  const [ilogin, isLogin] = useState();
  const [token, setToken] = useState(null);
  const [search, setSearch] = useState("");
  const location = useLocation();
  const [username, setUsername] = useState();
  const storedUsername = Cookies.get("username");
  function handleSignOut() {
    setIsAuthanticated(false);
    Cookies.remove("token");
    Cookies.remove("refreshToken");
    Cookies.remove("T120");
    Cookies.remove("username");
    setToken(null)
    setUsername(null)
  }
  function handleSignIn() {
    if (Cookies.get("token") != null) {
      history.push("/home")
    }
    else {
      if (Cookies.get("token") && Cookies.get("token") !== undefined && Cookies.get("token") !== null) {
        setIsAuthanticated(true);
        console.log(Cookies.get("token"));
        history.push("/signIn")
      }
      else {
        Cookies.remove("token");
        Cookies.remove("username");
        history.push("/signIn")
      }
    }
  }
  useEffect(() => {
    if (
      Cookies.get("username") !== null &&
      Cookies.get("username") !== undefined &&
      Cookies.get("token") !== null &&
      Cookies.get("token") !== undefined
    ) {
      setIsAuthanticated(true);
      console.log(Cookies.get("token"));
      setToken(Cookies.get("token"));
      setUsername(Cookies.get("username"))
    }else{
      setIsAuthanticated(false)
    }
  }, [Cookies.get("token"), token]);
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };
  const handleSearch = () => {
    if (search === "" || search === null) {
      swal({
        title: "Enter search",
        text: "You clicked the button!",
        icon: "error"
      });

    } else {
      history.push("/search/" + search)
    }


  };
  return (
    <div >
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
        crossOrigin="anonymous"
      />
      <Menu size='large' vertical inverted >
        <Menu.Item >
          <Form>
            <Form.Input
              icon='search'
              iconPosition='left'
              label='search'
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              onKeyDown={handleKeyDown}
              placeholder='Search...'
            />
          </Form>
        </Menu.Item>

        <Menu.Item >
          <Link to='/' >Home</Link>
          <Menu.Menu>
            <Menu.Item
              name='jobs'
            >
              <Link to='/jobs' >Jobs</Link>
            </Menu.Item>
            <Menu.Item
              name='jobSeekers'
            >
              <Link to='/jobseekers' >Job Seekers</Link>
            </Menu.Item>
            <Menu.Item
              name='employers'
            >
              <Link to='/employers' >Employers</Link>
            </Menu.Item>
            <Menu.Item
              name='jobPositions'
            >
              <Link to='/jobpositions' >Job Positions</Link>
            </Menu.Item>
            <Menu.Item
              name='employees'
            >
              <Link to='/employees' >Employees</Link>
            </Menu.Item>
            <Menu.Item
              name='grant'
            >
              <Link to='/grant' >Grant</Link>
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item
          name='browse'
        >
          <Icon name='grid layout' />
          Browse
        </Menu.Item>
        <Menu.Item
          name='messages'
        >
          Messages
        </Menu.Item>
        <Dropdown item text='More'>
          <Dropdown.Menu >
<<<<<<< Updated upstream
            <Dropdown.Item as={NavLink} to={"/edit/" + username} icon='edit' text='Edit Profile' />
=======
            <Dropdown.Item icon='edit' text='Edit Profile' />
>>>>>>> Stashed changes
            <Dropdown.Item icon='globe' text='Choose Language' />
            <Dropdown.Item icon='settings' text='Account Settings' />
          </Dropdown.Menu>
        </Dropdown>

        <Menu.Item >
          {isAuthenticated ? <>
            <div>
              <Button.Group vertical inverted>
                <Label basic color="red"><Icon name='user'></Icon>{Cookies.get("username")}</Label>
                <Button onClick={handleSignOut} inverted color="teal">
                  Logout
                </Button>
              </Button.Group>
            </div>
          </> :
            <Button.Group  >
              <Button inverted color="blue" as={NavLink} to={"/signUp"}>Sign Up</Button>
              <Button.Or />
              <Button onClick={handleSignIn} inverted color="teal" >Sign In</Button>
            </Button.Group>}
        </Menu.Item>


      </Menu>
    </div>
  );
}
