import React, { useEffect, useState } from 'react';
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react';
import SignupService from '../services/SignupService';
import { Link, useHistory } from 'react-router-dom';
import MessengerService from '../services/MessengerService';
import swal from 'sweetalert';
import Cookies from 'js-cookie';
var e = {
  username: '',
  password: '',
  cppassword: '',
};
function SignupPage() {
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cppassword, setCPPassword] = useState("");
  const history = useHistory();
  let message = new MessengerService();


  const [errors, setErrors] = useState({
    username: '',
    password: '',
    cppassword: '',
  });

  const handleBlur = (field) => {
    const newErrors = e;
    if (field === 'username') {
      if (!username) {
        newErrors.username = message.usernameRequired;
      }
      else if (!message.email.test(username)) {
        newErrors.username = message.usernameInvalid;
      } else {
        newErrors.username = "";
      }
    }
    if (field === 'password') {
      if (!password) {
        newErrors.password = message.passwordRequired;
      }
      else if (!message.password.test(password)) {
        newErrors.password = message.passwordInvalid;
      } else {
        newErrors.password = "";
      }
    }
    if (field === 'cppassword') {
      if (!cppassword) {
        newErrors.cppassword = message.confirmPass1;
      }
      else if (cppassword !== password) {
        newErrors.cppassword = message.confirmPass2;
      } else {
        newErrors.cppassword = "";
      }
    }
    console.log(errors)
    e = { ...newErrors };
    setErrors(e);
  }

  const SignUp = () => {
    if (validateForm()) {
      console.log(username)
      console.log(Cookies.get("is400"))
      console.log(Cookies.get("is"))
      SignupService(username, password, cppassword, history).then(() => {
        if (Cookies.get("is400") && Cookies.get("is400") == 400) {
          swal({
            title: "Username existed",
            text: "You have pressed the button!",
            icon: "error"
          });
          Cookies.remove("is400")
          history.push("/signUp")
        }
        else if (Cookies.get("is") != null && Cookies.get("is") != undefined) {
          swal({
            title: "Registration successful",
            text: "You have pressed the button!",
            icon: "success"
          });
          Cookies.remove("is")
          history.push("/signIn")
        }
        else {
          swal({
            title: "Registration Error",
            text: "You have pressed the button!",
            icon: "error"
          });
          history.push("/signUp")
        }
      });
    } else {
      swal({
        title: "Registration Error",
        text: "You have pressed the button!",
        icon: "error"
      });
      history.push("/signUp")
    }
    Cookies.remove("is")
    Cookies.remove("is400")
  }

  const validateForm = () => {
    handleBlur('username');
    handleBlur('password');
    handleBlur('cppassword');
    return !errors.username && !errors.password && !errors.cppassword;
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
                label='Password'
                type='password'
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => handleBlur('password')}
                value={password}
              />
              {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
              <Form.Input
                icon='lock'
                iconPosition='left'
                label='Confirm Password'
                type='password'
                onChange={(e) => setCPPassword(e.target.value)}
                onBlur={() => handleBlur('cppassword')}
                value={cppassword}
              />
              {errors.cppassword && <p style={{ color: 'red' }}>{errors.cppassword}</p>}
              <Button onClick={SignUp} content='Sign Up' primary />
            </Form>
          </Grid.Column>

          <Grid.Column verticalAlign='middle'>
            <Button as={Link} to="/signin" content='Sign In' icon='signup' size='big' tabIndex={4} />
          </Grid.Column>
        </Grid>

        <Divider vertical>Or</Divider>
      </Segment>
    </div>
  );
}

export default SignupPage;
