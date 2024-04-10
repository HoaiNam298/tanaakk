import React, { useEffect, useState } from 'react'
import EmployerService from '../../services/EmployerService'
import { Table, Header, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import swal from 'sweetalert';


export default function EmployerList() {

  const [employers, setEmployers] = useState([])
  
  const [username, setUsername] = useState();
  const history= useHistory()
  const [token, setToken] = useState();
  useEffect(() => {
    if (Cookies.get("username") !== null && Cookies.get("username") !== undefined && Cookies.get("token") !== null && Cookies.get("token") !== undefined) {
      setToken(Cookies.get("token"));
    }
    else {
        history.push("/signin");
    }
    if (token != null) {
      let employerService = new EmployerService();
      employerService.getEmployers(token).then((result) => setEmployers(result.data.data)).catch((error) => {
        if (error.response && error.response.status === 403) {
          swal({
            title: "You must be employer",
            text: "Click",
            icon: "error",
          });
          history.push("/home")
        }
      });;
    }
  },[Cookies.get("token"),token,employers])

  const handleDeleteEmployer = (employerId) => {
    const employerService = new EmployerService();

    employerService.deleteEmployers(employerId,token)
      .then(() => {
        const updatedEmployers = employers.filter(employer => employer.id !== employerId);
        setEmployers(updatedEmployers);
      })
      .catch(error => {
        console.error("Error deleting employer:", error);
      });
  };

  return (
    <div>
      <Table celled padded color="black" inverted>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell singleLine>Company Name</Table.HeaderCell>
            <Table.HeaderCell>Website(-s)</Table.HeaderCell>
            <Table.HeaderCell>Phone Number</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Joined Date</Table.HeaderCell>
            <Table.HeaderCell>Other infos</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>

          {employers?.map(employer => (

            <Table.Row key={employer.id} textAlign='center'>

              <Table.Cell>
                <Header as='h2' textAlign='center' className="ui white" id="white-employername" >
                  {employer.companyName}
                </Header>
              </Table.Cell>
              <Table.Cell singleLine>{employer.webSites}</Table.Cell>
              <Table.Cell singleLine>{employer.phone}</Table.Cell>
              <Table.Cell singleLine>{employer.user.email}</Table.Cell>
              <Table.Cell singleLine>{employer.joinDate}</Table.Cell>
              <Table.Cell>
                <Button animated as={Link} color="blue" basic inverted to={`/employers/${employer.id}`}>
                  <Button.Content visible>Go to infos</Button.Content>
                  <Button.Content hidden>
                    <Icon name="arrow right" />
                  </Button.Content>
                </Button>
                <Button animated color="blue" basic inverted onClick={() => handleDeleteEmployer(employer.id)}>
                  <Button.Content visible>Delete</Button.Content>
                  <Button.Content hidden>
                    <Icon name="trash" />
                  </Button.Content>
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Button animated as={Link} color="black" to={`/EmployerAdd`}>
        <Button.Content visible>Add Employer</Button.Content>
        <Button.Content hidden>
          <Icon name="arrow right" />
        </Button.Content>
      </Button>

    </div>
  )
}
