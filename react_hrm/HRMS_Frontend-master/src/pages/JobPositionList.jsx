import React, { useEffect, useState } from 'react';
import { Table, Header } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import JobPositionService from '../services/JobPositionService';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import swal from 'sweetalert';
export default function JobPositionList() {
  const [jobPositions, setJobPositions] = useState([]);
  const [id, setId] = useState('');
  const [token, setToken] = useState();
  const [positionName, setPositionName] = useState('');
  const [errors, setErrors] = useState({
    id: '',
    positionName: '',
  });

  const jobPositionService = new JobPositionService();
  const history= useHistory()
  useEffect(() => {
    if (Cookies.get("token") !== null && Cookies.get("token") !== undefined) {
      console.log(Cookies.get("token"));
      setToken(Cookies.get("token"));
    }
    else {
        history.push("/signin");
    }if (token != null) {
    jobPositionService
      .getJobPositions(token)
      .then((result) => setJobPositions(result.data.data))
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
  }, [Cookies.get("token"),token,jobPositions])

  const addJobPosition = (e) => {
    e.preventDefault();

    handleBlur('id');
    handleBlur('positionName');
    if(id== '')
    {
      return
    }
    if(positionName== '')
    {
      return
    }
    if (hasErrors()) {
      alert('Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.');
      return;
    }
    jobPositionService.addJobPosition(id, positionName,token)
      .then((response) => {
        alert('The data has been submitted to the form');
        return jobPositionService.getJobPositions(token);
      })
      .then((result) => setJobPositions(result.data.data))
      .catch((error) => {
        alert('Lỗi khi gửi biểu mẫu');
        console.error(error);
      });
  };

  const restJobPosition = () => {
    setId(''); // Đặt lại giá trị của id về rỗng
    setPositionName(''); // Đặt lại giá trị của positionName về rỗng
  };

  const editJobPosition = async (id) => {
    try {
      const response = await jobPositionService.getByIdJobPosition(id,token);
      const editedJobPosition = response.data;

      setId(editedJobPosition.data.id);
      setPositionName(editedJobPosition.data.positionName);

      alert('The data has been submitted to the form');
    } catch (error) {
      alert('Error when submitting form');
      console.error(error);
    }
  };

  const deleteJobPosition = (id) => {
    console.log(id)

    if (window.confirm("Are you sure you want to delete?")) {
      try {
        jobPositionService.deleteByIdJobPosition(id,token);
        alert('Delete successfully');
        jobPositionService.getJobPositions(token)
          .then((result) => setJobPositions(result.data.data))
          .catch((error) => console.error(error));
      } catch (error) {
        alert('Error when submitting form');
        console.error(error);
      }
    }
  };

  const hasErrors = () => {
    return Object.values(errors).some((error) => error !== '');
  };


  // Hàm kiểm tra lỗi
  const handleBlur = (fieldName) => {
    const newErrors = { ...errors };

    switch (fieldName) {
      case 'id':
        const isIdNumber = /^\d+$/.test(id);
        if (!id || !isIdNumber) {
          newErrors.id = 'ID must be a non-null number';
        } else {
          newErrors.id = '';
        }
        break

      case 'positionName':
        if (!positionName || positionName.length > 50) {
          newErrors.positionName = 'Position Name must be a non-null string, not exceeding 50 characters';
        } else {
          newErrors.positionName = '';
        }
        break

      default:
        break;
    }

    // Update the errors state with the new error information
    setErrors(newErrors);
  };



  return (

    <div>
      <form >
        <div>
          <label htmlFor="id">ID</label>
          <input
            type="text"
            id="id"
            name="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            onBlur={() => handleBlur('id')}
          />
          {errors.id && <p style={{ color: 'red' }}>{errors.id}</p>}
        </div>
        <div>
          <label htmlFor="positionName">Position Name</label>
          <input
            type="text"
            id="positionName"
            name="positionName"
            value={positionName}
            onChange={(e) => setPositionName(e.target.value)}
            onBlur={() => handleBlur('positionName')}
          />
          {errors.positionName && <p style={{ color: 'red' }}>{errors.positionName}</p>}
        </div>
        <div className="button-container">
          <button type="submit" onClick={addJobPosition} style={{ display: 'inline-block' }}>Save</button>
          <button type="submit" onClick={addJobPosition} style={{ display: 'inline-block' }}>Update</button>
          <button type="button" onClick={restJobPosition} style={{ display: 'inline-block' }}>Reset</button>
        </div>

      </form>

      <Table celled padded inverted>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell singleLine>Position Name</Table.HeaderCell>
            <Table.HeaderCell>Id of Position</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {jobPositions.map((jobPosition) => (
            <Table.Row key={jobPosition.id}>
              <Table.Cell>
                <Header as='h2' textAlign='center' className='text-white'>
                  {jobPosition.positionName}
                </Header>
              </Table.Cell>
              <Table.Cell singleLine textAlign='center'>
                {jobPosition.id}
              </Table.Cell>
              <Table.Cell singleLine textAlign='center'>
                <button onClick={() => editJobPosition(jobPosition.id)}>Edit</button>
                <button onClick={() => deleteJobPosition(jobPosition.id)}>Delete</button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}