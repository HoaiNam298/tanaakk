import Cookies from 'js-cookie';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
export default function SignupService(u, p, cp) {
    const axios = require('axios');
    return axios.post('http://localhost:8080/api/registration', {
        email:u,
        password:p,
        confirmPassword:cp
    })
        .then(response => {
            console.log(response.data); // Xử lý token hoặc kết quả đăng nhập thành công
            const is = response.data;
            if (response.status === 400) {
                Cookies.set("is400",400)
            }
            else if (is !== null) {
                Cookies.set("is",is)
            }
        })
        .catch(error => {
            console.error(error); // Xử lý lỗi đăng nhập
        });
}