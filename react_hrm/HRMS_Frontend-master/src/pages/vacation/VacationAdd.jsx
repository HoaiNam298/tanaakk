import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Cookies from 'js-cookie';
import VacationService from "../../services/VacationService";
import MessengerService from "../../services/MessengerService";
var e = {
    vacationName: '*',
    fromDate: '',
    toDate: '',
    dayOff: '',
};
export default function VacationAdd() {
    const { employeeId } = useParams()
    const [vacationType, setVacationType] = useState('ANNUAL')
    const [vacationName, setVacationName] = useState('')
    const [dayOff, setDayOff] = useState('')
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')
    const [note, setNote] = useState('')
    const [token, setToken] = useState('');

    const history = useHistory();

    const [errors, setErrors] = useState({
        vacationName: '*',
        fromDate: '',
        toDate: '',
        dayOff: '',
    });
    let message = new MessengerService();
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
    }, [Cookies.get("token"), token, errors, e]);
    const handleBlur = (field) => {
        const newErrors = e;
        if (field === 'vacationName') {
            if (!vacationName) {
                newErrors.vacationName = message.vacationNameRequired;

            } else {
                newErrors.vacationName = "*";
            }
        }
        if (toDate) {
            if (field === 'fromDate') {
                if (!fromDate) {
                    newErrors.fromDate = message.fromDateRequired;
                }
                else {
                    newErrors.fromDate = "";
                }
            }
        }
        if (fromDate) {
            if (field === 'toDate') {
                if (!toDate) {
                    newErrors.toDate = message.toDateRequired;
                }
                else {
                    newErrors.toDate = "";
                }
            }
        }
        if (toDate && fromDate) {
            const toDateObj = new Date(toDate);
            const fromDateObj = new Date(fromDate);
            if (toDateObj <= fromDateObj) {
                newErrors.toDate = message.toDateInvalid;
            } else {
                newErrors.toDate = "";
            }
        }
        if (field === 'dayOff') {
            if (!toDate && !fromDate && !dayOff) {
                newErrors.dayOff = message.dayOffRequired;
            } else {
                newErrors.dayOff = "";
            }
        }
        console.log(errors)
        e = { ...newErrors };
        console.log(e)
        setErrors(e);
    }
    const validateForm = () => {
        handleBlur('vacationName');
        handleBlur('fromDate');
        handleBlur('toDate');
        handleBlur('dayOff')
        return errors.vacationName == "*" && !errors.toDate && !errors.fromDate && !errors.dayOff;
    }
    const resetHandle = () => {
        setDayOff("")
        setNote("")
        setFromDate("")
        setToDate("")
        setDayOff("")
        setVacationName("")
        setVacationType("ANNUAL")
    }


    const handleSubmit = () => {
        if (validateForm()) {
            let service = new VacationService();
            var vacationDto = { vacationType, vacationName, dayOff, fromDate, toDate, note }
            console.log(vacationDto)
            console.log(employeeId)
            service.createVacation(vacationDto, employeeId, token).then((result) => {
                if (result?.data === "error") {
                    swal({
                        title: "error",
                        text: "Employee added. After system user's confirmation, it will be listed.",
                        icon: "error",
                    });
                }
                else if (result?.data === "exist") {
                    swal({
                        title: "existed vacation",
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
                    history.push(`/employees/${employeeId}`)
                }
            })
        } else swal({
            title: "Add Error",
            text: "You have pressed the button!",
            icon: "error"
        });
    }
    return <div className="container justify-content-center">
        <div className="row justify-content-center">
            <h1 className="">Create Vacation</h1>
        </div>
        <form>
            <div className="row mt-1">
                <div className="col-md-3">
                    <label>Vacation Type</label>
                </div>
                <div className="col-md-4">
                    <select onChange={((e) => { setVacationType(e.target.value) })} value={vacationType} name="vacationType">
                        <option selected value="ANNUAL">ANNUAL</option>
                        <option value="COMPENSATORY">COMPENSATORY</option>
                        <option value="HOLIDAY">HOLIDAY</option>
                        <option value="UNPAID">UNPAID</option>
                    </select>
                </div>
            </div>
            <div className="row mt-1">
                <div className="col-md-3">
                    <label>Vacation Name</label>
                </div>
                <div className="col-md-4">
                    <input type="text" className="form-control" placeholder="Enter vacation name..." onBlur={(() => { handleBlur('vacationName') })} onChange={((e) => { setVacationName(e.target.value) })} value={vacationName} />
                </div>
                <div className="col-md-2 mt-1">
                    {errors.vacationName && <p style={{ color: 'red' }}>{errors.vacationName}</p>}
                </div>
            </div>
            <div className="row mt-1">
                <div className="col-md-3">
                    <label>Day Off</label>
                </div>
                <div className="col-md-4">
                    <input type="date" className="form-control" id="dayOff" onBlur={(() => { handleBlur('non') })} disabled={fromDate !== "" || toDate !== ""} onChange={((e) => { setDayOff(e.target.value) })} value={dayOff} />
                </div>
                <div className="col-md-2 mt-1">
                    {errors.dayOff && <p style={{ color: 'red' }}>{errors.dayOff}</p>}
                </div>
            </div>
            <div className="row mt-1">
                <div className="col-md-3">
                    <label>From Date</label>
                </div>
                <div className="col-md-4">
                    <input type="date" className="form-control" disabled={dayOff !== ""} onBlur={(() => { handleBlur('fromDate') })} onChange={((e) => { setFromDate(e.target.value) })} value={fromDate} />
                </div>
                <div className="col-md-2 mt-1">
                    {
                        errors.fromDate && <p style={{ color: 'red' }}>{errors.fromDate}</p>}
                </div>

            </div>
            <div className="row mt-1">
                <div className="col-md-3">
                    <label>To Date</label>
                </div>
                <div className="col-md-4">
                    <input type="date" className="form-control" disabled={dayOff !== ""} onBlur={(() => { handleBlur('toDate') })} onChange={((e) => { setToDate(e.target.value) })} value={toDate} />
                </div>
                <div className="col-md-2 mt-1">
                    {errors.toDate && <p style={{ color: 'red' }}>{errors.toDate}</p>}
                </div>

            </div>
            <div className="row mt-1">
                <div className="col-md-3">
                    <label>Note</label>
                </div>
                <div className="col-md-4">
                    <input type="text" className="form-control" placeholder="Enter note..." onChange={((e) => { setNote(e.target.value) })} value={note} />
                </div>

            </div>
            <div className="row mt-3 justify-content-center">
                <div className="col-md-1">
                    <button type="button" style={{ width: "5rem" }} onClick={handleSubmit} className="btn btn-primary p-2">Submit</button>
                </div>
                <div className="col-md-5" >
                    <button type="button" style={{ width: "5rem" }} onClick={resetHandle} className="btn btn-danger p-2">Reset</button>
                </div>

            </div>
        </form>
    </div>
}