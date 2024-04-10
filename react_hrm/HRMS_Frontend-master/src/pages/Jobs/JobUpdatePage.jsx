import {Formik, Form, useField} from 'formik';
import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router';
import JobService from '../../services/JobService';
import JobPositionService from '../../services/JobPositionService';
import CityService from '../../services/CityService';
import WorkPlaceService from '../../services/WorkPlaceService';
import WorkTimeService from '../../services/WorkTimeService';
import MessengerService from '../../services/MessengerService';
import swal from "sweetalert";
import * as Yup from 'yup';
import { Button, Dropdown, Grid, Header, Label, Checkbox } from 'semantic-ui-react';
import Cookies from 'js-cookie';
export default function JobAddPage() {
  const { jobId } = useParams()
  const [job, setJob] = useState({})

  let messenger= new MessengerService();
  let jobService = new JobService();
  const history = useHistory();

  const [workTimes, setWorkTimes] = useState([]);
  const [workPlaces, setWorkPlaces] = useState([]);
  const [cities, setCities] = useState([]);
  const [jobPositions, setJobPositions] = useState([]);
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
      let workPlaceService = new WorkPlaceService();
    let workTimeService = new WorkTimeService();
    let cityService = new CityService();
    let jobPositionService = new JobPositionService();
    let jobService = new JobService();

    jobService.getJobById(jobId,token)
      .then((result) => setJob(result.data.data)).catch()
  
    workPlaceService
      .getWorkPlaces(token)
      .then((result) => setWorkPlaces(result.data.data));

    workTimeService
      .getWorkTimes(token)
      .then((result) => setWorkTimes(result.data.data));

    cityService
      .getCities(token)
      .then((result) => setCities(result.data.data))
      .catch();

    jobPositionService
      .getJobPositions(token)
      .then((result) => setJobPositions(result.data.data))
      .catch();
    }
  }, [Cookies.get("token"),token,jobId]);
  const workTimeOptions = workTimes.map((workTime, index) => ({
    key: index,
    text: workTime.workTimeName,
    value: workTime.id,
  }));

  const WorkPlaceOptions = workPlaces.map((workPlace, index) => ({
    key: index,
    text: workPlace.workPlaceName,
    value: workPlace.id,
  }));

  const CityOptions = cities.map((city, index) => ({
    key: index,
    text: city.cityName,
    value: city.id,
  }));

  const JobPositionOptions = jobPositions.map((jobPosition, index) => ({
    key: index,
    text: jobPosition.positionName,
    value: jobPosition.id,
  }));

  const InputField = ({label, ...props}) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input>. We can use field meta to show an error
    // message if the field is invalid and it has been touched (i.e. visited)
    const [field, meta] = useField(props);
    return (
      <div>
        <div className='ui input'>
          <label className='labelForJobAddFields' htmlFor={props.id || props.name}>
            {label}
            <br />
          </label>

          <input {...field} {...props} />
        </div>
        <br />
        {meta.touched && meta.error ? (
          <div className='error'>
            <div className='ui pointing red basic label'>{meta.error}</div>
          </div>
        ) : null}
      </div>
    );
  };

  const TrueFalse = ({children, ...props}) => {
    // React treats radios and checkbox inputs differently other input types, select, and textarea.
    // Formik does this too! When you specify `type` to useField(), it will
    // return the correct bag of props for you -- a `checked` prop will be included
    // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
    const [field, meta] = useField({...props, type: 'checkbox'});
    return (
      <div>
        <Checkbox {...field} {...props} />

        {meta.touched && meta.error ? (
          <Label basic color='red' pointing='left'>
            <div className='error'>{meta.error}</div>
          </Label>
        ) : null}
      </div>
    );
  };

  const SelectionFields = ({label, ...props}) => {
    const [field, meta] = useField(props);
    return (
      <div>
        <label htmlFor={props.id || props.name}>{label}</label>
        <Dropdown fluid clearable item search selection {...field} {...props} />

        {meta.touched && meta.error ? (
          <div className='ui pointing red basic label'>{meta.error}</div>
        ) : null}
      </div>
    );
  };

  const handleChangeSemantic = (prop, value, fieldName) => {
    prop.setFieldValue(fieldName, value);
  };

  const handleOnSubmit = (values) => {
    values.createdDate = new Date();
    jobService.addJob(values,token);
    alert("Job added. After system user's confirmation, it will be listed.");
    history.push('/jobs');
  };

  return (
    <div className='marginTop '>
      <Header as='h1' textAlign='center' color='black'>
        Update Job
      </Header>
      <Formik
        initialValues={{
          numberOfEmptyPositions: job.empty_positions || '',
          minimumSalary: job.minimumSalary || '',
          maximumSalary: job.maximumSalary || '',
          description: job.description || '',
          deadline: job.deadline || '',
          cityId: job.cityId || '',
          jobPositionId: job.jobPositionId || '',
          workTimeId: job.workTimeId || '',
          workPlaceId: job.workPlaceId || '',
          agreeCheckBox: job.agreeCheckBox || false,
        }}
        validationSchema={Yup.object({
          numberOfEmptyPositions: Yup.string().required(
            messenger.numberOfEmptyPosirions
          ),
          minimumSalary: Yup.number()
            .min(0, messenger.SalaryError)
            .required(messenger.minSalayRequired),
          maximumSalary: Yup.number()
            .min(0, messenger.SalaryError)
            .required(messenger.maxSalayRequired),
          description: Yup.string().required(),
          deadline: Yup.date()
            .required(messenger.deadlineRequired)
            .min(new Date(), messenger.deadLineError),
          workTimeId: Yup.string().required(messenger.workTimeRequired),
          cityId: Yup.string().required(messenger.cityRequired),
          workPlaceId: Yup.string().required(messenger.workPlaceRequired),
          jobPositionId: Yup.string().required(messenger.jobpositionRequired),
          agreeCheckBox: Yup.boolean()
             .required('Required')
             .oneOf([true], messenger.agreeCheckBoxError),
        })}
        onSubmit={(values) => {
          jobService.updateJob(jobId, values,token);
            swal({
              title: "Good job!",
              text: "Job updated. After system user's confirmation, it will be listed.",
              icon: "success",
            });
            history.push('/jobs');
        }}>
        {(formikprops) => (
          <Form onSubmit={formikprops.handleSubmit}>
          <Grid className="justify-content-center" stackable>
            <Grid.Row columns={1} style={{ marginTop: '20px' }}>
              <Grid.Column width={8} style={{ paddingLeft: '40px'}}>
                <InputField
                  label='Empty Positions'
                  name='numberOfEmptyPositions'
                  type='number'
                  placeholder='1, 2, 3, etc...'
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={1}>
              <Grid.Column width={8} style={{ paddingLeft: '30px'}}>
                <div className='marginLeft'>
                  <InputField
                    label='Description'
                    name='description'
                    size='massive'
                    type='text'
                    placeholder='Looking for game developers, web dev, etc...'
                    value={formikprops.values.description}
                  />
                </div>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={1} style={{ paddingLeft: '10px'}}>
              <Grid.Column width={8}>
                <InputField
                  label='Salary (minimum)'
                  name='minimumSalary'
                  type='number'
                  placeholder='3500, 5000, etc...'
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={1} style={{ paddingLeft: '10px'}}>
              <Grid.Column width={8}>
                <InputField
                  label='Salary (maximum)'
                  name='maximumSalary'
                  type='number'
                  placeholder='5000, 7500, etc...'
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={1}>
              <Grid.Column computer={8}>
                <SelectionFields
                  id='jobPositionId'
                  name='jobPositionId'
                  label='Job Position'
                  options={JobPositionOptions}
                  value={formikprops.values.jobPositionId}
                  placeholder='C# dev, Java Uzmanı etc.'
                  onChange={(event, data) =>
                    handleChangeSemantic(formikprops, data.value, 'jobPositionId')
                  }
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={1}>
              <Grid.Column computer={8}>
                <SelectionFields
                  id='cityId'
                  name='cityId'
                  label='City'
                  placeholder='City'
                  onChange={(event, data) =>
                    handleChangeSemantic(formikprops, data.value, 'cityId')
                  }
                  value={formikprops.values.cityId}
                  item
                  options={CityOptions}
                />
              </Grid.Column>
            </Grid.Row>
              
            <Grid.Row columns={1}>
              <Grid.Column computer={8}>
                <SelectionFields
                  id='workTimeId'
                  name='workTimeId'
                  label='Work Time'
                  options={workTimeOptions}
                  placeholder='part-time / full-time'
                  value={formikprops.values.workTimeId}
                  onChange={(event, data) =>
                    handleChangeSemantic(
                      formikprops,
                      data.value,
                      'workTimeId'
                    )
                  }
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={1}>
              <Grid.Column computer={8}>
                <SelectionFields
                  id='workPlaceId'
                  name='workPlaceId'
                  label='Work Place'
                  options={WorkPlaceOptions}
                  placeholder='At the workplace / remote work'
                  value={formikprops.values.workPlaceId}
                  onChange={(event, data) =>
                    handleChangeSemantic(
                      formikprops,
                      data.value,
                      'workPlaceId'
                    )
                  }
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={1}>
              <Grid.Column computer={16}>
                <InputField
                  style={{width: '100%'}}
                  label='Deadline'
                  name='deadline'
                  type='date'
                  placeholder='2022-06-27, 2022-06-27T13:28:17.707Z etc...'
                  id='deadline'
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid textAlign='center'>
            <Grid.Row columns={1}>
              <Grid.Column>
                <TrueFalse
                  label='I agree to the terms and conditions'
                  name='agreeCheckBox'
                  id='agreeCheckBox'
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <br />

          <Button
            color='green'
            icon='add'
            inverted
            content='Update'
            labelPosition='right'
            type='submit'
          />
        </Form>
        )}
      </Formik>
    </div>
  );
}
