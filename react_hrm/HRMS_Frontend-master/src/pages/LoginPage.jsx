import React, { useEffect, useState } from 'react';
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react';
import LogInService from "../services/LoginService"
import { useHistory } from 'react-router-dom';
import MessengerService from '../services/MessengerService';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import swal from 'sweetalert';
var e = {
  username: '',
  password: ''
};
function LoginForm() {
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  const history = useHistory();
  const [errors, setErrors] = useState({
    username: '',
    password: ''
  });
  let messenger = new MessengerService();

  useEffect(() => {
    if (Cookies.get("token")) {
      setToken(Cookies.get("token"));
    }
    else {
      Cookies.remove("token");
      Cookies.remove("username")
    }
  }, [Cookies.get("token"), token,errors])
  const handleBlur = (field) => {
    const newErrors = e;
    if (field === 'username') {
      if (!username) {
        newErrors.username = messenger.usernameRequired;
      }
      else {
        newErrors.username = "";
      }
    }
    if (field === 'password') {
      if (!password) {
        newErrors.password = messenger.passwordRequired;
      }
      else {
        newErrors.password = "";
      }
    }
    console.log(errors)
    e = { ...newErrors };
    setErrors(e);
  }
  const validateForm = () => {
    handleBlur('username');
    handleBlur('password');
    return !errors.username && !errors.password;
  }
  function Login() {
    console.log(e);
    console.log(errors);
    if (validateForm()) {
      LogInService(username, password, setToken, token).then(() => {
        if (Cookies.get("token")) {
          swal({
            title: "Login success",
            text: "You clicked the button!",
            icon: "success"
          });
          history.push("/home");
        }
        else swal({
          title: "username or password is not correct",
          text: "You clicked the button!",
          icon: "error"
        });
      });
    } else swal({
      title: "Login error",
      text: "You clicked the button!",
      icon: "error"
    });
  }
  return (
    <div>
      <Segment placeholder>
        <Grid columns={2} relaxed='very' stackable>
          <Grid.Column>
            <Form>
              <Form.Input
                icon='user'
                iconPosition='left'
                label='Username'
                placeholder='Username'
                onChange={(e) => setUsername(e.target.value)}
                onBlur={() => handleBlur('username')}
                value={username}
              />
              {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
              <Form.Input
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                label='Password'
                type='password'
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => handleBlur('password')}
                value={password}
              />
              {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
              <Button onClick={Login} content='Login' primary />
            </Form>
          </Grid.Column>

          <Grid.Column verticalAlign='middle'>
            <Button as={Link} to={"/signUp"} content='Sign up' icon='signup' size='big' />
          </Grid.Column>
        </Grid>

        <Divider vertical>Or</Divider>
      </Segment>
    </div>
  );
}

export default LoginForm;
