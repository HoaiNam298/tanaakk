import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
// import {  useHistory } from 'react-router';
import { Container, Header, Grid, Segment, List, Icon, Label, Button } from 'semantic-ui-react';
import JobService from '../../services/JobService'
import EmployerService from '../../services/EmployerService'
import { Link,useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import swal from 'sweetalert';
export default function JobDetailPage() {
    const { jobId } = useParams()
    const [job, setJob] = useState({})
    const [employer, setEmployer] = useState({})
    const history= useHistory()
    console.log(jobId)
  const [token, setToken] = useState();
  useEffect(() => {
    if (Cookies.get("username") !== null && Cookies.get("username") !== undefined && Cookies.get("token") !== null && Cookies.get("token") !== undefined) {
      console.log(Cookies.get("token"));
      setToken(Cookies.get("token"));
    }
    else {
        history.push("/signin");
    }
    if (token != null) {
        let jobService = new JobService();
        jobService.getJobById(jobId, token).then((result) => setJob(result.data.data)).catch()
    }
  }, [Cookies.get("token"),token,jobId])
    return (
        <Grid style={{ paddingLeft: '40px'}}>
            <Grid.Row>
                <Grid.Column computer={16} mobile={16} tablet={16}>
                    <Segment.Group>
                        <Segment vertical color="blue" padded="very" secondary rounded="true" stacked>

                            <Header centered as="h1" dividing >
                            Position Name:
                            <br />
                            {job.description}
                            </Header>
                            <Grid>
                                <Grid.Column computer="8" mobile="16" tablet="4">
                                    <List>
                                        <List.Item className="marginBottom marginTopSmall">
                                            <List.Content>
                                                <List.Header>
                                                    <List.Icon name='users' />Number of empty positions
                                                </List.Header>
                                                <List.Description style={{ marginTop: '10px' }}>
                                                    {job.empty_positions}
                                                </List.Description>
                                            </List.Content>
                                        </List.Item>

                                        <List.Item className="marginBottomMedium">
                                            <List.Content>
                                                <List.Header>
                                                    <List.Icon name='money' />Min - Max salary
                                                </List.Header>
                                                <List.Description style={{ marginTop: '10px' }}>
                                                    {job.minimumSalary} - {job.maximumSalary}
                                                </List.Description>
                                            </List.Content>
                                        </List.Item>

                                        <List.Item className="marginBottomMedium">
                                            <List.Content>
                                                <List.Header>
                                                    <List.Icon name='hourglass half' />Deadline
                                                </List.Header>
                                                <List.Description style={{ marginTop: '10px' }}>
                                                    {job.deadline}
                                                </List.Description>
                                            </List.Content>
                                        </List.Item>

                                    </List>
                                </Grid.Column>
                                <Grid.Column computer="8" mobile="16" tablet="4">
                                    <List>

                                        <List.Item className="marginBottomMedium">
                                            <List.Content>
                                                <List.Header>
                                                    <List.Icon name='map marker alternate' />Location
                                                </List.Header>
                                                <List.Description style={{ marginTop: '10px' }}>
                                                    {job.city?.cityName}
                                                </List.Description>
                                            </List.Content>
                                        </List.Item>

                                        <List.Item className="marginBottomMedium">
                                            <List.Content>
                                                <List.Header>
                                                    <List.Icon name='suitcase' />Work Place
                                                </List.Header>
                                                <List.Description style={{ marginTop: '10px' }}>
                                                    {job.workPlace?.workPlaceName}
                                                </List.Description>
                                            </List.Content>
                                        </List.Item>

                                        <List.Item className="marginBottomMedium">
                                            <List.Content>
                                                <List.Header>
                                                    <List.Icon name='stopwatch' />Work Time
                                                </List.Header>
                                                <List.Description style={{ marginTop: '10px' }}>
                                                    {job.workTime?.workTimeName}
                                                </List.Description>
                                            </List.Content>
                                        </List.Item>

                                    </List>
                                </Grid.Column>
                                
                            </Grid>

                        </Segment>
                    </Segment.Group>

                    <Button animated as={Link} color="pink"  basic to={`/job/${job.id}`}>
                        <Button.Content visible>Update</Button.Content>
                        <Button.Content hidden>
                            <Icon name="id card outline" />
                        </Button.Content>
                    </Button>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}