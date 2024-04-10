export default class MessengerService {

    usernameRequired = "Username is required";
<<<<<<< Updated upstream
    nameRequired = "Full Name is required";
=======
>>>>>>> Stashed changes
    vacationNameRequired = "Vacation name is required";
    fromDateRequired = "From date is required";
    toDateRequired = "To date is required";
    dayOffRequired = "Day off or from date and to date is required";
    toDateInvalid = "To date must > from date";

    usernameInvalid = "Username must be email format."

    passwordRequired = "Password is required";

    confirmPass1 = "Confirm Password is required"

    confirmPass2 = "Confirm password must match the password."

    companyRequired = 'Company Name is required.';

    phoneRequired = 'Phone is required.';
    addressRequired = 'Address is required.';

    phone = /^0\d{9}$/;
    dobRequired = 'Date of birth is required.';
    salaryRequired = 'Salary is required.';

    password = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\S+$).{8,}$/;

    email = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

    phoneError = 'Phone must be 10 characters.';

    websiteRequired = 'Website is required.';

    emailInvalid = 'Invalid email address.';
    emailRequired = 'Email is required.';

    emailRequired = 'Email address required.';

    passwordInvalid = 'Password must contain at least 1 uppercase, 1 number, 1 special character, and be at least 8 characters long.';

    numberOfEmptyPosirions = 'You have to indicate the number of empty positions!';

    SalaryError = 'Salary can not be less than 0!';

    minSalayRequired = 'You have to indicate the minimum salary of job!';

    maxSalayRequired = 'You have to indicate the maximum salary of job!';

    descriptionSalayRequired = 'You have to add description!';

    deadLineError = 'deadline must be in the future';

    deadlineRequired = 'Deadline of the job is required!'

    workTimeRequired = 'Work Time must be chosen';

    workPlaceRequired = 'Work Place must be chosen';

    cityRequired = 'City must be chosen!';

    jobpositionRequired = 'Job Position must be chosen!';

    agreeCheckBoxError = 'You must accept the terms and conditions.';



}