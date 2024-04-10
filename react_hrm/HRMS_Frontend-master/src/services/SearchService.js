import Cookies from 'js-cookie';
import swal from 'sweetalert';
import AuthService from './AuthService';
export default function SearchService(s, setEmployer,setJobPosition,setJobSeeker,setJobs,token) {
    const axios = require('axios');
    const data = {
        search: s
    };
    return axios.post('http://localhost:8080/api/search', data, AuthService(token))
        .then((response) => {
            console.log(response.data); // Xử lý token hoặc kết quả đăng nhập thành công
            if (response.data != null) {
                setEmployer(response.data.employer)
                setJobs(response.data.job)
                setJobPosition(response.data.jobPosition)
                setJobSeeker(response.data.jobSeeker)
            }
            else {
                swal({
                    title: "Username or pass is not correct",
                    text: "You clicked the button!",
                    icon: "error"
                });
            }
        })
        .catch(error => {
            console.error(error); // Xử lý lỗi đăng nhập
        });
}