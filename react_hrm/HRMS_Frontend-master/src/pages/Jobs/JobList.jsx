import React, { useEffect, useState } from 'react';
import { Table, Header, Button, Icon } from 'semantic-ui-react';
import JobService from '../../services/JobService';
import { Link, useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import swal from 'sweetalert';
export default function JobList() {
  const [jobs, setJobs] = useState([]);

  const history = useHistory();
  const [token, setToken] = useState("");
  let jobService = new JobService();
  useEffect(() => {
    if (Cookies.get("username") !== null && Cookies.get("username") !== undefined && Cookies.get("token") !== null && Cookies.get("token") !== undefined) {
      setToken(Cookies.get("token"));
    }
    else {
      history.push("/signin");
    }
    if (token != null) {
      jobService
        .getJobs(token)
        .then((result) => setJobs(result.data.data))
        .catch((error) => {
          if (error.response && error.response.status === 403) {
            swal({
              title: "Your user is not access",
              text: "Click",
              icon: "error",
            });
            history.push("/home")
          }
        });
    }
  }, [Cookies.get("token"),token, jobs])

  const handleDeleteJob = (id) => {

    jobService.deleteJob(id, token)
      .then(() => {
        const updateJob = jobs.filter(job => job.id !== id)
        setJobs(updateJob);
      }).catch((error) => {
        if (error.response && error.response.status === 403) {
          swal({
            title: "Your user is not access",
            text: "Click",
            icon: "error",
          });
          history.push("/home")
        }
      });
  }



  return (
    <div>
      <Table celled padded inverted>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Postion</Table.HeaderCell>
            <Table.HeaderCell>Work Place</Table.HeaderCell>
            <Table.HeaderCell>Number of Empty Position</Table.HeaderCell>
            <Table.HeaderCell>City</Table.HeaderCell>
            <Table.HeaderCell>Created date</Table.HeaderCell>
            <Table.HeaderCell>Deadline</Table.HeaderCell>
            <Table.HeaderCell>Other infos</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {jobs.map((job) => (
            <Table.Row key={job.id} textAlign='center'>
              <Table.Cell>
                <Header as='h2' inverted>
                  {job.positionName}
                </Header>
              </Table.Cell>
              <Table.Cell singleLine>{job.workPlaceName}</Table.Cell>
              <Table.Cell>
                {job.number_of_empty_positions == null
                  ? '0'
                  : job.number_of_empty_positions}
              </Table.Cell>
              <Table.Cell singleLine>{job.cityName}</Table.Cell>
              <Table.Cell>{job.createdDate}</Table.Cell>
              <Table.Cell>{job.deadLine}</Table.Cell>
              <Table.Cell>
                <Button animated primary basic inverted as={Link} to={`/jobs/${job.id}`}>
                  <Button.Content visible>Go to infos </Button.Content>
                  <Button.Content hidden>
                    <Icon name="file alternate" />
                  </Button.Content>
                </Button>
                <Button animated primary basic inverted onClick={() => handleDeleteJob(job.id)}>
                  <Button.Content visible>Delete </Button.Content>
                  <Button.Content hidden>
                    <Icon name="trash" />
                  </Button.Content>
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Button animated as={Link} color="black" to={`/jobAddPage`}>
        <Button.Content visible>Add Jobs</Button.Content>
        <Button.Content hidden>
          <Icon name="arrow right" />
        </Button.Content>
      </Button>
    </div>
  );
}
