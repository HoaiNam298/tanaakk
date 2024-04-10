import React, { useState, useEffect } from 'react';
import EmployeeService from '../../services/EmployeeService';
import MessengerService from '../../services/MessengerService';
import swal from "sweetalert";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Cookies from 'js-cookie';
export default function EmployeeAddPage() {
    var errors = {
        phone: '',
        address: '',
        email: '',
        dateOfBirth: '',
        salary: '',
    };
    const [e, setE] = useState({});
    const [dateOfBirth, setDob] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [salary, setSalary] = useState('');
    const [status, setStatus] = useState('ACTIVE');
    const history = useHistory();
    const [token, setToken] = useState('');

    let messenger = new MessengerService();

    useEffect(() => {
        if (
            Cookies.get("username") !== null &&
            Cookies.get("username") !== undefined &&
            Cookies.get("token") !== null &&
            Cookies.get("token") !== undefined
        ) {
            console.log(Cookies.get("token"));
            setToken(Cookies.get("token"));
        } else {
            history.push("/signin");
        }
    }, [Cookies.get("token"), token]);
    const handleReset=()=>{
        setPhone('');
        setAddress('');
        setEmail('');
        setDob('');
        setSalary('');
    }
    const handleBlur = (field) => {
        const newErrors = { ...errors };
        console.log(errors);

        if (field === 'phone') {
            if (!phone) {
                newErrors.phone = messenger.phoneRequired;
            } else if (!messenger.phone.test(phone)) {
                newErrors.phone = messenger.phoneError;
            } else {
                newErrors.phone = '';
            }
        }

        if (field === 'address') {
            if (!address) {
                newErrors.address = messenger.addressRequired;
            } else {
                newErrors.address = "";
            }
        }

        if (field === 'email') {
            if (!email) {
                newErrors.email = messenger.emailRequired;
            } else if (!messenger.email.test(email)) {
                newErrors.email = messenger.emailInvalid;
            } else {
                newErrors.email = "";
            }
        }

        if (field === 'dateOfBirth') {
            if (!dateOfBirth) {
                newErrors.dateOfBirth = messenger.dobRequired;
            } else {
                newErrors.dateOfBirth = "";
            }
        }

        if (field === 'salary') {
            if (!salary) {
                newErrors.salary = messenger.salaryRequired;
            } else if (salary <= 0) {
                newErrors.salary = messenger.SalaryError;
            } else {
                newErrors.salary = "";
            }
        }

        console.log(newErrors);
        errors = newErrors;
        setE(errors)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(validateForm());
        console.log(errors);

        if (validateForm()) {
            console.log(errors);
            const employee = {
                phone: phone,
                dateOfBirth: dateOfBirth,
                address: address,
                email: email,
                salary: salary,
                status: status
            };

            console.log(employee);

            // Call API
            let employeeService = new EmployeeService();
            employeeService.addEmployees(employee, token)
                .then((response) => {
                    if (response.data === "success") {
                        swal({
                            title: "Good job!",
                            text: "Employee added. After system user's confirmation, it will be listed.",
                            icon: "success",
                        });
                        history.push("/employees");
                    } else if(response.data === "exist") {
                        swal({
                            title: "Email existed",
                            text: "Employee added. After system user's confirmation, it will be listed.",
                            icon: "error",
                        });
                    }
                    else {
                        swal({
                            title: "Add error",
                            text: "Employee added. After system user's confirmation, it will be listed.",
                            icon: "error",
                        });
                    }
                });
        } else {
            swal({
                title: "field error",
                text: "Employee added. After system user's confirmation, it will be listed.",
                icon: "error",
            });
        }
    };

    const validateForm = () => {
        handleBlur('dateOfBirth');
        handleBlur('email');
        handleBlur('salary');
        handleBlur('address');
        handleBlur('phone');

        // Kiểm tra giá trị mới của errors
        if (!errors.phone && !errors.email && !errors.address && !errors.salary && !errors.dateOfBirth) {
            return true;
        }
        return false;
    }

    return (
        <form>
            <div>
                <label>Phone:</label>
                <input
                    type="text"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onBlur={() => handleBlur('phone')}
                    required
                />
                {console.log(errors)}
                {e.phone && <p style={{ color: 'red' }}>{e.phone}</p>}
            </div>
            <div>
                <label>Date of Birth:</label>
                <input
                    style={{ width: '35%' }}
                    type="date"
                    name="dateOfBirth"
                    value={dateOfBirth}
                    onChange={(e) => setDob(e.target.value)}
                    onBlur={() => handleBlur('dateOfBirth')}
                    required
                />
                {e.dateOfBirth && <p style={{ color: 'red' }}>{e.dateOfBirth}</p>}
            </div>
            <div>
                <label>Address:</label>
                <input
                    type="text"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    onBlur={() => handleBlur('address')}
                    required
                />
                {e.address && <p style={{ color: 'red' }}>{e.address}</p>}
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => handleBlur('email')}
                    required
                />
                {e.email && <p style={{ color: 'red' }}>{e.email}</p>}
            </div>
            <div>
                <label>Salary:</label>
                <input
                    type="text"
                    name="salary"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    onBlur={() => handleBlur('salary')}
                    required
                />
                {e.salary && <p style={{ color: 'red' }}>{e.salary}</p>}
            </div>
            <div>
                <label>Status:</label>
                <select onChange={(e) => setStatus(e.target.value)} name='status'>
                    <option selected value="ACTIVE">ACTIVE</option>
                    <option value="TERMINAL">TERMINAL</option>
                    <option value="DELETE">DELETE</option>
                </select>
            </div>
            <div className="form-container">
                <div className="button-container">
                    <button type="button" onClick={handleSubmit}>Submit</button>
                    <button type="button" onClick={handleReset} >Reset</button>
                </div>
            </div>
        </form>
    );
}