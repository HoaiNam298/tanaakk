import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router';
import { Table, Header, Grid, Segment, Icon, Label, Divider } from 'semantic-ui-react';
import EmployerService from '../../services/EmployerService';
import Cookies from 'js-cookie';
import swal from 'sweetalert';
export default function EmployerDetailPage() {
    const { employerId } = useParams()
    const [employer, setEmployer] = useState({})
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
            let employerService = new EmployerService();
            employerService.getEmployerById(employerId, token).then((result) => setEmployer(result.data.data)).catch()
        }
      }, [Cookies.get("token"), token,employerId])

      function handleUpdate(){
        history.push("/employer/"+employerId);
    }

      return (
        <Grid >
            <Grid.Row>
                <Grid.Column computer={12}>
                    {employer?.webSites?.length < 1 ? null :
                        <Grid.Column className="marginBottomMedium m-2">
                            <Grid.Column computer={16}>
                                <Segment.Group>
                                    <Segment vertical color="pink" padded="very" secondary rounded="true" stacked>
                                        <Label attached='top' color="pink" basic><Header color="pink" as="h3">Phone</Header></Label>
                                        <Table basic="very" textAlign='center' striped>
                                            <Table.Header>
                                                <Table.Row>
                                                    <Table.HeaderCell ><Icon size="large" name="building outline" />Company Name</Table.HeaderCell>
                                                    <Table.HeaderCell ><Icon size="large" name="building outline" />Website(-s)</Table.HeaderCell>
                                                    <Table.HeaderCell ><Icon size="large" name="building outline" />Joined Date</Table.HeaderCell>

                                                </Table.Row>
                                            </Table.Header>
                                            <Table.Body>
                                                <Table.Row>
                                                    <Table.Cell>
                                                        <Header as='h4' image>
                                                            <Header.Content>
                                                                {employer.companyName}
                                                                <Header.Subheader>{ }</Header.Subheader>
                                                            </Header.Content>
                                                        </Header>
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <Header as='h4' image>
                                                            <Header.Content>
                                                                {employer.webSites}
                                                                <Header.Subheader>{ }</Header.Subheader>
                                                            </Header.Content>
                                                        </Header>
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <Header as='h4' image>
                                                            <Header.Content>
                                                                {employer.joinDate}
                                                                <Header.Subheader>{ }</Header.Subheader>
                                                            </Header.Content>
                                                        </Header>
                                                    </Table.Cell>
                                                </Table.Row>
                                            </Table.Body>
                                        </Table>
                                    </Segment>
                                </Segment.Group>
                            </Grid.Column>

                        </Grid.Column>
                    }



                    {employer.webSites?.length < 1 ? null :
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
                            
                            <Header as="h4">{employer.user?.email}</Header>
                            <Divider horizontal>
                                <div className='ui pointing red basic label'>Email</div>
                            </Divider>
                            <Header as="h4">{employer.phone}</Header>
                            <Divider horizontal>
                                <div className='ui pointing green basic label'>Phone Number</div>
                            </Divider>

                        </Segment>
                    </Segment.Group>
                    <Grid.Column className="m-3">
                        <a href="#" className='btn btn-primary' style={{width:"10rem"}} onClick={() => handleUpdate()} >Edit</a>
                    </Grid.Column>
                </Grid.Column>
                
                <Grid.Column className="m-3">
                
                </Grid.Column>
                
            </Grid.Row>
        </Grid>
    )
}