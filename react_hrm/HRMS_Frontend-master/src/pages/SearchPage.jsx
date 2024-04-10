import React, { useEffect, useState } from 'react';
import { Table, Header, Button, Icon } from 'semantic-ui-react';
import { Link, useParams,useHistory } from 'react-router-dom';
import SearchService from '../services/SearchService';
import Cookies from 'js-cookie';
import EmployerService from '../services/EmployerService';
import JobPositionService from '../services/JobPositionService';

export default function SearchPage() {
  const key= useParams();
  const [jobs, setJobs] = useState([]);
  const [jobSeeker, setJobSeeker] = useState([]);
  const [employer, setEmployer] = useState([]);
  const [jobPosition, setJobPosition] = useState([]);
  const [id, setId] = useState('');
  const [positionName, setPositionName] = useState('');
  const jobPositionService = new JobPositionService();
  const history = useHistory();
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
      if (key.key) {
        SearchService(key.key,setEmployer,setJobPosition,setJobSeeker,setJobs,token)
      }
    }
  }, [Cookies.get("token"),token,key])
  const handleDeleteEmployer = (employerId) => {
    const employerService = new EmployerService();

    employerService.deleteEmployers(employerId,token)
      .then(() => {
        const updatedEmployers = employer.filter(employer => employer.id !== employerId);
        setEmployer(updatedEmployers);
      })
      .catch(error => {
        console.error("Error deleting employer:", error);
      });
  };
return (
  <div>
    {jobs && jobs.length > 0 ? (
      <Table celled padded inverted>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Postion</Table.HeaderCell>
            <Table.HeaderCell>Company Name</Table.HeaderCell>
            <Table.HeaderCell>Number of Empty Position</Table.HeaderCell>
            <Table.HeaderCell>City</Table.HeaderCell>
            <Table.HeaderCell>Created date</Table.HeaderCell>
            <Table.HeaderCell>Deadline</Table.HeaderCell>
            <Table.HeaderCell>Other infos</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {jobs?.map((job) => (
            <Table.Row key={job.id} textAlign='center'>
              <Table.Cell>
                <Header as='h2' inverted>
                  {job.positionName}
                </Header>
              </Table.Cell>
              <Table.Cell singleLine>{job.companyName}</Table.Cell>
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
                  <Button.Content visible>Go to Detail<Icon name="right arrow" /></Button.Content>
                  <Button.Content hidden>
                    <Icon name="file alternate" />
                  </Button.Content>
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    ) : (
      <div>
        <p>No jobs available.</p>
        {/* Thêm nội dung khác nếu cần thiết */}
      </div>
    )}
    {jobSeeker && jobSeeker.length > 0 ? (
    <Table celled padded inverted textAlign="center">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>images</Table.HeaderCell>
            <Table.HeaderCell singleLine>Name</Table.HeaderCell>
            <Table.HeaderCell>languages</Table.HeaderCell>
            <Table.HeaderCell>work experiences</Table.HeaderCell>
            <Table.HeaderCell>attended Schools</Table.HeaderCell>
            
            <Table.HeaderCell>description</Table.HeaderCell>
            <Table.HeaderCell>Other infos</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {jobSeeker?.map((jobseeker) => (
            <Table.Row key={jobseeker.id} textAlign='center'>
              <Table.Cell>
                {jobseeker.images.imagePath == null ? (
                  <i className='huge icon'>
                    <i className='user  circle icon'></i>
                  </i>
                ) : (
                  <img src={jobseeker.images.imagePath} alt=''></img>
                )}
              </Table.Cell>
              <Table.Cell>
                <Header
                  as='h4'
                  textAlign='center'
                  className='ui white'
                  id='white-jobseeker'>
                  {jobseeker.firstName + ' ' + jobseeker.lastName}
                </Header>
              </Table.Cell>
              <Table.Cell>
                {jobseeker.languages.length === 0
                  ? 'null'
                  : jobseeker.languages.map(
                      (language) =>
                        language.languageName +
                        ' level : ' +
                        language.languageLevel.id
                    )}
              </Table.Cell>
              <Table.Cell>
                {!(!!jobseeker.workExperiences)
                  ? 'null'
                  : jobseeker.workExperiences.map(
                      (workExperience) =>
                        'Work place : ' +
                        workExperience.workplaceName +
                        ' Position : ' +
                        workExperience.jobPosition.position_name
                    )}
              </Table.Cell>
              <Table.Cell>
                {jobseeker.attendedSchools.length === 0
                  ? 'null'
                  : jobseeker.attendedSchools.map(
                      (school) =>
                        'School : ' +
                        school.school.schoolName +
                        ' Department : ' +
                        null
                    )}
              </Table.Cell>
             
              <Table.Cell>
                {jobseeker.info === null
                  ? 'nothing has been written'
                  : jobseeker.info}
              </Table.Cell>
              <Table.Cell>
                <Button animated color="red" basic inverted as={Link} to={`/jobseekers/${jobseeker.id}`}>
                  <Button.Content visible>Go to infos</Button.Content>
                  <Button.Content hidden>
                    <Icon name="arrow right" />
                  </Button.Content>
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
       ) : (
        <div>
          <p>No job seeker available.</p>
          {/* Thêm nội dung khác nếu cần thiết */}
        </div>
      )}
      {employer && employer.length > 0 ? (
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

          {employer.map(employer => (

            <Table.Row key={employer.id} textAlign='center'>

              <Table.Cell>
                <Header as='h2' textAlign='center' className="ui white" id="white-employername" >
                  {employer.companyName}
                </Header>
              </Table.Cell>
              <Table.Cell singleLine>{employer.webSites}</Table.Cell>
              <Table.Cell singleLine>{employer.phone}</Table.Cell>
              <Table.Cell singleLine>{employer.user.email}</Table.Cell>
              <Table.Cell singleLine>{employer.user.createdDate}</Table.Cell>
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
      ) : (
        <div>
          <p>No employer available.</p>
          {/* Thêm nội dung khác nếu cần thiết */}
        </div>
      )}
      {jobPosition && jobPosition.length > 0 ? (
      <Table celled padded inverted>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell singleLine>Position Name</Table.HeaderCell>
            <Table.HeaderCell>Id of Position</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {jobPosition.map((jobPosition) => (
            <Table.Row key={jobPosition.id}>
              <Table.Cell>
                <Header as='h2' textAlign='center' className='text-white'>
                  {jobPosition.positionName}
                </Header>
              </Table.Cell>
              <Table.Cell singleLine textAlign='center'>
                {jobPosition.id}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      ) : (
        <div>
          <p>No job position available.</p>
          {/* Thêm nội dung khác nếu cần thiết */}
        </div>
      )}
  </div>
);
}
