import React from 'react'

import EmployerList from '../pages/Employers/EmployerList'
import JobList from '../pages/Jobs/JobList'
import JobPositionList from '../pages/JobPositionList'
import JobSeekerList from '../pages/JobSeekers/JobSeekerList'
import { Route } from 'react-router'
import EmployerSignUpPage from '../pages/Employers/EmployerSignUpPage'
import JobAddPage from '../pages/Jobs/JobAddPage'
import EmployerUpdatePage from '../pages/Employers/EmployerUpdatePage'
import EmployerDetailPage from '../pages/Employers/EmployerDetailPage'
import SystemUserSignUpPage from '../pages/SystemUsers/SystemUserSignUpPage'
import JobConfirmationPanel from '../pages/SystemUsers/JobConfirmationPanel'
import JobSeekerSignUpPage from '../pages/JobSeekers/JobSeekerSignUpPage'
import MainPage from '../pages/MainPage'
import JobSeekerDetail from '../pages/JobSeekers/JobSeekerDetail'
import { ToastContainer } from "react-toastify";
import EmployerAdd from '../pages/Employers/EmployerAdd'
import JobDetailPage from '../pages/Jobs/JobDetailPage'
import JobUpdatePage from '../pages/Jobs/JobUpdatePage'
import SignupPage from '../pages/SignupPage'
import LoginForm from '../pages/LoginPage';
import SearchPage from '../pages/SearchPage'
import EmployeeList from '../pages/Employees/EmployeeList'
import EmployeeDetailPage from '../pages/Employees/EmployeeDetailPage'
import EmployeeAddPage from '../pages/Employees/EmployeeAddPage'
import VacationAdd from '../pages/vacation/VacationAdd'
import VacationUpdate from '../pages/vacation/VacationUpdate'
import RoleTable from '../pages/grant/RoleTable'
import EmployeeUpdatePage from '../pages/Employees/EmployeeUpdatePage'
<<<<<<< Updated upstream
import EditProfile from '../pages/edit/EditProfile'
=======
>>>>>>> Stashed changes
export default function Dashboard() {
    return (
        <div id="content-area">
            <ToastContainer position="bottom-right" />
            <Route exact path="/" component={MainPage} />
            <Route exact path="/home" component={MainPage} />
            <Route exact path="/jobs" component={JobList} />
            <Route exact path="/search/:key" component={SearchPage} />
            <Route exact path="/job/:jobId" component={JobUpdatePage} />
            <Route exact path="/jobs/:jobId" component={JobDetailPage} />
            <Route path="/signIn" component={LoginForm} />
            <Route path="/signIn/Employer" component={JobList} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/signup/employer" component={EmployerSignUpPage} />
            <Route path="/signup/systemuser" component={SystemUserSignUpPage} />
            <Route path="/jobAddPage" component={JobAddPage} />
            <Route path="/systemuser/:systemUserId" component={JobConfirmationPanel} />
            <Route path="/signup/jobseeker" component={JobSeekerSignUpPage} />
            <Route exact path="/grant" component={RoleTable} />
<<<<<<< Updated upstream
            <Route exact path="/edit/:userName" component={EditProfile} />
=======
>>>>>>> Stashed changes
            <Route exact path="/employers" component={EmployerList} />
            <Route exact path="/employees" component={EmployeeList} />
            <Route exact path="/employer/:employerId" component={EmployerUpdatePage} />
            <Route exact path="/employers/:employerId" component={EmployerDetailPage} />
            <Route exact path="/employees/:employeeId" component={EmployeeDetailPage} />
            <Route exact path="/employees/update/:employeeId" component={EmployeeUpdatePage} />
            <Route exact path="/vacation/:employeeId" component={VacationAdd} />
            <Route exact path="/vacation/update/:employeeId/:id" component={VacationUpdate} />
            <Route exact path="/jobseekers" component={JobSeekerList} />
            <Route exact path="/jobseekers/:jobSeekerId" component={JobSeekerDetail} />
            <Route exact path="/jobpositions" component={JobPositionList} />
            <Route exact path="/EmployerAdd" component={EmployerAdd} />
            <Route exact path="/EmployeeAdd" component={EmployeeAddPage} />
        </div>
    )
}
