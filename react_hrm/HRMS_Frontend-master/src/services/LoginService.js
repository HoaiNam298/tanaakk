// SignInService.jsx
import Cookies from 'js-cookie';
import swal from 'sweetalert';

export default function LogInService(u, p) {
    const axios = require('axios');
    const data = {
        username: u,
        password: p
    };
    return axios.post('http://localhost:8080/api/auth', data)
        .then((response) => {
            console.log(u); // Xử lý token hoặc kết quả đăng nhập thành công
            if (response.data.accessToken) {
                // Cookies.set("token",response.data.accessToken,{ expires: 1 / 24 }); // Lưu token nếu nó không bằng null
                // Cookies.set("username", u, { expires: 1/24 });

                Cookies.set("token",response.data.accessToken,{ expires: 1/2 / (24 * 60) }); // Lưu token nếu nó không bằng null/ 1440
                Cookies.set("refreshToken",response.data.token,{ expires: 1/24 })
                Cookies.set("username", u,{ expires: 1/2 / (24 * 60) });
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
