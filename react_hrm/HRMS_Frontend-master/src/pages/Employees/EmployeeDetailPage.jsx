import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router';
import { Table, Header, Grid, Segment, Icon, Label, Divider } from 'semantic-ui-react';
import EmployeeService from '../../services/EmployeeService';
import Cookies from 'js-cookie';
import VacationService from '../../services/VacationService';
import swal from 'sweetalert';
export default function EmployeeDetailPage() {
    const { employeeId } = useParams()
    const [employee, setEmployee] = useState({})
    const [vacations, setVacation] = useState([])
    const [change,setChange]=useState(false);
    const [token, setToken] = useState();
    const history = useHistory();
    useEffect(() => {
        if (Cookies.get("username") !== null && Cookies.get("username") !== undefined && Cookies.get("token") !== null && Cookies.get("token") !== undefined) {
            console.log(Cookies.get("token"));
            setToken(Cookies.get("token"));
        }
        else {
            history.push("/signin");
        }
        if (token != null) {
            let employeeService = new EmployeeService();
            employeeService.getEmployeeById(employeeId, token).then((result) => {
                if (result.data) {
                    setEmployee(result.data.employee)
                    console.log(result.data)
                    setVacation(result.data.vacations)
                }
                else alert("error")
            }).catch()
        }
    }, [Cookies.get("token"), token, employeeId,change])
    function handleUpdate(id){
        history.push(`/vacation/update/${employeeId}/${id}`)
    }
    function handleDelete(id){
        let service = new VacationService();
        service.deleteVacation(id, token).then((result) => {
            if (result?.data === "error") {
                swal({
                    title: "delete error",
                    text: "Employee added. After system user's confirmation, it will be listed.",
                    icon: "error",
                });
            }
            else if (result?.data === "success") {
                swal({
                    title: "ok",
                    text: "Employee added. After system user's confirmation, it will be listed.",
                    icon: "success",
                });
                setChange(true)
                history.push(`/employees/${employeeId}`)
            }
        })
    }
    function handleInsert(){
        history.push("/vacation/"+employeeId);
    }
    return (
        <Grid >
            <Grid.Row>
                <Grid.Column computer={12}>
                    {employee?.webSites?.length < 1 ? null :
                        <Grid.Column className="marginBottomMedium m-2">
                            <Grid.Column computer={16}>
                                <Segment.Group>
                                    <Segment vertical color="pink" padded="very" secondary rounded="true" stacked>
                                        <Label attached='top' color="pink" basic><Header color="pink" as="h3">Phone</Header></Label>
                                        <Table basic="very" textAlign='center' striped>
                                            <Table.Header>
                                                <Table.Row>
                                                    <Table.HeaderCell ><Icon size="large" name="building outline" />Name</Table.HeaderCell>
                                                    <Table.HeaderCell ><Icon size="large" name="building outline" />Date of Birth</Table.HeaderCell>
                                                    <Table.HeaderCell ><Icon size="large" name="building outline" />Company</Table.HeaderCell>
                                                    <Table.HeaderCell ><Icon name="desktop" /> Address</Table.HeaderCell>
                                                    <Table.HeaderCell ><Icon name="desktop" /> Email</Table.HeaderCell>
                                                    <Table.HeaderCell ><Icon name="desktop" /> Salary</Table.HeaderCell>
                                                    <Table.HeaderCell ><Icon name="desktop" /> Status</Table.HeaderCell>
                                                </Table.Row>
                                            </Table.Header>
                                            <Table.Body>
                                                <Table.Row>
                                                    <Table.Cell>
                                                        <Header as='h4' image>
                                                            <Header.Content>
                                                                {employee.name}
                                                                <Header.Subheader>{ }</Header.Subheader>
                                                            </Header.Content>
                                                        </Header>
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <Header as='h4' image>
                                                            <Header.Content>
                                                                {employee.phone}
                                                                <Header.Subheader>{ }</Header.Subheader>
                                                            </Header.Content>
                                                        </Header>
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <Header as='h4' image>
                                                            <Header.Content>
                                                                {employee.dateOfBirth}
                                                                <Header.Subheader>{ }</Header.Subheader>
                                                            </Header.Content>
                                                        </Header>
                                                    </Table.Cell>
                                                    <Table.Cell ><Header as="h4" color="pink">{employee.address}</Header></Table.Cell>
                                                    <Table.Cell ><Header as="h4" color="pink">{employee.email}</Header></Table.Cell>
                                                    <Table.Cell ><Header as="h4" color="pink">{employee.salary}</Header></Table.Cell>
                                                    <Table.Cell ><Header as="h4" color="pink">{employee.status}</Header></Table.Cell>
                                                </Table.Row>
                                            </Table.Body>
                                        </Table>
                                    </Segment>
                                </Segment.Group>
                            </Grid.Column>

                        </Grid.Column>
                    }



                    {employee.webSites?.length < 1 ? null :
                        <Grid.Column className="marginBottomMedium m-2">
                            <Grid.Column computer={8}>
                                <Segment.Group>
                                    <Segment vertical color="pink" padded="very" secondary rounded="true" stacked>
                                        <Label attached='top' color="pink" basic><Header color="pink" as="h3">OFFERS</Header></Label>
                                        <Table basic="very" textAlign='center' striped>
                                            <Table.Header>
                                                <Table.Row>
                                                    <Table.HeaderCell ><Icon size="large" name="building outline" />BETA</Table.HeaderCell>
                                                    <Table.HeaderCell ><Icon name="desktop" /> BETA</Table.HeaderCell>
                                                </Table.Row>
                                            </Table.Header>
                                            <Table.Body>
                                                <Table.Row>
                                                    <Table.Cell>
                                                        <Header as='h4' image>

                                                            <Header.Content>
                                                                BETA
                                                                <Header.Subheader>BETA</Header.Subheader>
                                                            </Header.Content>
                                                        </Header>
                                                    </Table.Cell>
                                                    <Table.Cell ><Header as="h4" color="pink">BETA</Header></Table.Cell>
                                                </Table.Row>
                                            </Table.Body>
                                        </Table>
                                    </Segment>
                                </Segment.Group>
                            </Grid.Column>
                        </Grid.Column>
                    }

                </Grid.Column>
                <Grid.Column computer={4}>
                    <Segment.Group>
                        <Segment vertical color="pink" padded="very" secondary rounded="true" stacked>
                            <Label attached='top' color="pink" basic><Header color="pink" as="h3">CONTACT</Header></Label>
                            <Header as="h4">{employee.user?.id}</Header>
                            <Divider horizontal>
                                <div className='ui pointing red basic label'>User Id</div>
                            </Divider>
                            <Header as="h4">{employee.user?.email}</Header>
                            <Divider horizontal>
                                <div className='ui pointing red basic label'>Email</div>
                            </Divider>
                            <Header as="h4">{employee.phone}</Header>
                            <Divider horizontal>
                                <div className='ui pointing green basic label'>Phone Number</div>
                            </Divider>

                        </Segment>
                    </Segment.Group>

                </Grid.Column>
                <Grid.Column className="m-3">
                <a className='btn btn-primary' style={{width:"20rem"}} onClick={() => handleInsert()}>Add Vacation</a>
                </Grid.Column>
                <Grid.Column computer={16} className="m-2">
                    <Segment.Group>
                        <Segment vertical color="pink" padded="very" secondary rounded="true" stacked>
                            <Label attached='top' color="pink" basic><Header color="pink" as="h3">Vacation</Header></Label>
                            <Table basic="very" textAlign='center' striped>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell ><Icon size="large" name="building outline" />Vacation Type</Table.HeaderCell>
                                        <Table.HeaderCell ><Icon size="large" name="building outline" />Vacation Name</Table.HeaderCell>
                                        <Table.HeaderCell ><Icon name="desktop" /> Number Day</Table.HeaderCell>
                                        <Table.HeaderCell ><Icon name="desktop" /> Day Off</Table.HeaderCell>
                                        <Table.HeaderCell ><Icon name="desktop" /> From Date</Table.HeaderCell>
                                        <Table.HeaderCell ><Icon name="desktop" /> To Date</Table.HeaderCell>
                                        <Table.HeaderCell ><Icon name="desktop" /> Note</Table.HeaderCell>
                                        <Table.HeaderCell ><Icon name="desktop" /> Action</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                {console.log(vacations)}
                                {vacations?.map((v) => {
                                    return (
                                        <Table.Body>
                                            <Table.Row>
                                                <Table.Cell>
                                                    <Header as='h4' image>
                                                        <Header.Content>
                                                            {v.vacationType}
                                                            <Header.Subheader>{ }</Header.Subheader>
                                                        </Header.Content>
                                                    </Header>
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <Header as='h4' image>
                                                        <Header.Content>
                                                            {v.vacationName}
                                                            <Header.Subheader>{ }</Header.Subheader>
                                                        </Header.Content>
                                                    </Header>
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <Header as='h4' image>
                                                        <Header.Content>
                                                            {v.numberDay}
                                                            <Header.Subheader>{ }</Header.Subheader>
                                                        </Header.Content>
                                                    </Header>
                                                </Table.Cell>
                                                <Table.Cell ><Header as="h4" color="pink">{v.dayOff}</Header></Table.Cell>
                                                <Table.Cell ><Header as="h4" color="pink">{v.fromDate}</Header></Table.Cell>
                                                <Table.Cell ><Header as="h4" color="pink">{v.toDate}</Header></Table.Cell>
                                                <Table.Cell ><Header as="h4" color="pink">{v.note}</Header></Table.Cell>
                                                <Table.Cell ><Header as="h4" style={{ color: "white" }}><a  className='btn btn-primary '  onClick={() => handleUpdate(v.id)}>Update</a>
                                                    <a   className='btn btn-danger ml-2' onClick={() => handleDelete(v.id)}>Delete</a></Header></Table.Cell>
                                            </Table.Row>
                                        </Table.Body>)
                                })}
                            </Table>
                        </Segment>
                    </Segment.Group>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}