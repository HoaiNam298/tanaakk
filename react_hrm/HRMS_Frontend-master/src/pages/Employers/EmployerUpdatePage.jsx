import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import EmployerService from '../../services/EmployerService';
import MessengerService from '../../services/MessengerService';
import swal from 'sweetalert';
import '../../button.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Cookies from 'js-cookie';
export default function EmployerAddPage() {
  const history= useHistory()
  const { employerId } = useParams();
  const [token, setToken] = useState();
  const [employer, setEmployer] = useState({
    id: '',
    companyName: '',
    phone: '',
    webSites: '',
    user: {
      email: '',
      password: '',
    },
  });
  const [companyNameError, setCompanyNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [webSitesError, setWebSitesError] = useState('');
  let messenger= new MessengerService();
  useEffect(() => {
    if (Cookies.get("username") !== null && Cookies.get("username") !== undefined && Cookies.get("token") !== null && Cookies.get("token") !== undefined) {
      console.log(Cookies.get("token"));
      setToken(Cookies.get("token"));
    }
    else {
        history.push("/signin");
    }
    if (token != null) {
      let employerService = new EmployerService();
    employerService.getEmployerById(employerId,token).then((result) => {
      setEmployer(result.data.data);
    }).catch();
    }
  }, [Cookies.get("token"),token,employerId])

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmployer({
      ...employer,
      [name]: value,
    });
    if (name === 'companyName') {
      setCompanyNameError(value ? '' : messenger.companyRequired);
    } else if (name === 'phone') {
      setPhoneError(messenger.phone.test(value) ? '' : messenger.phoneRequired);
    } else if (name === 'webSites') {
      setWebSitesError(value ? '' : messenger.websiteRequired);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    // Call API to update the employer data
    const employerData = { ...employer };

    console.log(employerData);

    let employerService = new EmployerService();
    employerService.updateEmployers(employerId, employerData, token)
      .then((response) => {
        swal({
          title: 'Update Successful!',
          text: 'Employer information has been updated.',
          icon: 'success',
        });
        history.push("/employers")
      })
      .catch((error) => {
        swal({
          title: 'Error!',
          text: 'Error while updating employer information.',
          icon: 'error',
        });
      });
  };

  return (
    <form>
      {/* <div>
        <label>Employer Id:</label>
        <input
          type="text"
          name="id"
          readOnly
          value={employer.id}
          onChange={handleInputChange}
        />
      </div> */}
      <div class="form-container">
        <div class="form-group">
          <label>Company Name:</label>
          <input
            type="text"
            name="companyName"
            value={employer.companyName}
            onChange={handleInputChange}
          />
          <div class="error-message">{companyNameError}</div>
        </div>

        <div class="form-group">
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={employer.phone}
            onChange={handleInputChange}
          />
          <div class="error-message">{phoneError}</div>
        </div>

        <div class="form-group">
          <label>Website:</label>
          <input
            type="text"
            name="webSites"
            value={employer.webSites}
            onChange={handleInputChange}
          />
          <div class="error-message">{webSitesError}</div>
        </div>
      </div>


      {/* <div>
        <label>Email:</label>
        <input
          type="text"
          name="user.email"
          readOnly
          value={employer.user.email}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="text"
          name="user.password"
          readOnly
          value={employer.user.password}
          onChange={handleInputChange}
        />
      </div> */}
      <div className="form-container">
        <div className="button-container">
          <button type="button" onClick={handleUpdate}>
            Update
          </button>
        </div>
      </div>
    </form>
  );
}
