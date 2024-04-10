import React, { useState,useEffect } from 'react';
import EmployerService from '../../services/EmployerService';
import MessengerService from '../../services/MessengerService';
import swal from "sweetalert";
import '../../button.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Cookies from 'js-cookie';
export default function EmployerAddPage() {
  
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [webSites, setWebSites] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [companyNameError, setCompanyNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [webSitesError, setWebSitesError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const history= useHistory()
  const [token, setToken] = useState();
  let messenger= new MessengerService();

  useEffect(() => {
    if (Cookies.get("username") !== null && Cookies.get("username") !== undefined && Cookies.get("token") !== null && Cookies.get("token") !== undefined) {
      console.log(Cookies.get("token"));
      setToken(Cookies.get("token"));
    }
    else {
        history.push("/signin");
    }
  }, [Cookies.get("token"),token])

  const handleInputChange = (event) => {
    const { name, value } = event.target;
   
    if (name === 'companyName') {
      setCompanyName(value);
      setCompanyNameError(value ? '' : messenger.companyRequired);
    } else if (name === 'phone') {
      setPhone(value);
      setPhoneError(messenger.phone.test(value) ? '' : messenger.phoneRequired);
    } else if (name === 'webSites') {
      setWebSites(value);
      setWebSitesError(value ? '' : messenger.websiteRequired);
    } else if (name === 'email') {
      setEmail(value);
      setEmailError(messenger.email.test(value) ? '' : messenger.emailRequired);
    } else if (name === 'password') {
      setPassword(value);
      setPasswordError(messenger.password.test(value) ? '' : messenger.passwordInvalid);
    }
  };

  const handleReset = () => {
    setCompanyName('');
    setCompanyNameError('');
    setPhone('');
    setPhoneError('');
    setWebSites('');
    setWebSitesError('');
    setEmail('');
    setEmailError('');
    setPassword('');
    setPasswordError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password || !companyName || !phone || !webSites) {
      swal({
        title: "Error!",
        text: "All fields are required.",
        icon: "error",
      });
      return;
    }
  
    if (!messenger.email.test(email)) {
      swal({
        title: "Error!",
        text: "Invalid email address.",
        icon: "error",
      });
      return;
    }

    if (!messenger.phone.test(phone)) {
      swal({
        title: "Error!",
        text: "Invalid phone number.",
        icon: "error",
      });
      return;
    }
  
    if (!messenger.password.test(password)) {
      swal({
        title: "Error!",
        text: "Password is not in correct format.",
        icon: "error",
      });
      return;
    }

    const formData = {
      companyName,
      phone,
      webSites,
      user: {
        email,
        password,
      },
    };

    console.log(formData);

    // Call API
    let employerService = new EmployerService();
    employerService.addEmployers(formData,token)
      .then(() => {
        swal({
          title: "Good job!",
          text: "Employer added. After system user's confirmation, it will be listed.",
          icon: "success",
        });
        history.push("/employers")
      })
  };

  
  return (
    <form>
        
      <div class="form-container">
        <div class="form-group">
          <div>
            <label>Company Name:</label>
            <input
              type="text"
              name="companyName"
              value={companyName}
              onChange={handleInputChange}
            />
            <div className="error-message">{companyNameError}</div>
          </div>
          <div>
            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              value={phone}
              onChange={handleInputChange}
            />
            <div className="error-message">{phoneError}</div>
          </div>
          <div>
            <label>Website:</label>
            <input
              type="text"
              name="webSites"
              value={webSites}
              onChange={handleInputChange}
            />
            <div className="error-message">{webSitesError}</div>
          </div>
          <div>
            <label>Email:</label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            <div className="error-message">{emailError}</div>
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"  
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            <div className="error-message">{passwordError}</div>
          </div>
          <div className="form-container">
            <div className="button-container">
              <button type="submit" onClick={handleSubmit}>Submit</button>
              <button type="reset" onClick={handleReset}>Reset</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
