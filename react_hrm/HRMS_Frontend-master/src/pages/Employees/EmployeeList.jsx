import React, { useEffect, useState } from 'react'
import EmployeeService from '../../services/EmployeeService'
import { Table, Header, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import swal from 'sweetalert';


export default function EmployeeList() {

  const [employees, setEmployees] = useState([])
  
  const [username, setUsername] = useState();
  const history= useHistory()
  const [token, setToken] = useState();
  const [change, setChange] = useState(false);
  useEffect(() => {
    if (Cookies.get("username") !== null && Cookies.get("username") !== undefined && Cookies.get("token") !== null && Cookies.get("token") !== undefined) {
      setToken(Cookies.get("token"));
    }
    else {
        history.push("/signin");
    }
    if (token != null) {
      let employeeService = new EmployeeService();
      employeeService.getEmployees(token).then((result) => {
        setEmployees(result.data)}).catch((error) => {
          if (error.response && error.response.status === 403) {
            swal({
              title: "You must be have employee",
              text: "Click",
              icon: "error",
            });
            history.push("/home")
          }
        });;
    }
  },[Cookies.get("token"),token,change])

  const handleDeleteEmployee = (employeeId) => {
    const employeeService = new EmployeeService();

    employeeService.deleteEmployees(employeeId,token)
      .then((result) => {
        setChange(true);
        if(result.data==="success"){
          alert("success")
        }
        else alert("error")
      })
      .catch(error => {
        console.error("Error deleting employee:", error);
      });
  };
  return (
    <div>
      <Table celled padded color="black" inverted>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell singleLine>Phone</Table.HeaderCell>
            <Table.HeaderCell>Date of Birth</Table.HeaderCell>
            <Table.HeaderCell>Phone Number</Table.HeaderCell>
            <Table.HeaderCell>Address</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Salary</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Day Off</Table.HeaderCell>
            <Table.HeaderCell>Other Info</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>

          {employees?.map(employee => (

            <Table.Row key={employee.id} textAlign='center'>

              <Table.Cell>
                <Header as='h2' textAlign='center' className="text-white" id="white-employeename" >
                  {employee.phone}
                </Header>
              </Table.Cell>
              <Table.Cell singleLine>{employee.dateOfBirth}</Table.Cell>
              <Table.Cell singleLine>{employee.phone}</Table.Cell>
              <Table.Cell singleLine>{employee.address}</Table.Cell>
              <Table.Cell singleLine>{employee.email}</Table.Cell>
              <Table.Cell singleLine>{employee.salary}</Table.Cell>
              <Table.Cell singleLine>{employee.status}</Table.Cell>
              <Table.Cell singleLine>{employee.numDayOffInMonth}</Table.Cell>
              <Table.Cell>
                <Button animated as={Link} color="blue" basic inverted to={`/employees/${employee.id}`}>
                  <Button.Content visible>Go to infos</Button.Content>
                  <Button.Content hidden>
                    <Icon name="arrow right" />
                  </Button.Content>
                </Button>
                <Button animated as={Link} color="blue" basic inverted to={`/employees/update/${employee.id}`}>
                  <Button.Content visible>Update</Button.Content>
                  <Button.Content hidden>
                    <Icon name="arrow right" />
                  </Button.Content>
                </Button>
                <Button animated color="blue" basic inverted onClick={() => handleDeleteEmployee(employee.id)}>
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
      <Button animated as={Link} color="black" to={`/EmployeeAdd`}>
        <Button.Content visible>Add Employee</Button.Content>
        <Button.Content hidden>
          <Icon name="arrow right" />
        </Button.Content>
      </Button>

    </div>
  )
}
