import React, { useState, useEffect } from 'react';
import swal from "sweetalert";
import { useHistory, useParams, Link } from 'react-router-dom';
import { Container, Grid, Image, Header, Icon } from 'semantic-ui-react';
import Cookies from 'js-cookie';
import MessengerService from '../../services/MessengerService';
import ProfileService from '../../services/ProfileService';
import UserService from '../../services/UserService';
export default function EditProfile() {
    var count = Cookies.get("T120") === NaN || Cookies.get("T120") === "NaN" || !Cookies.get("T120") ? 10 : Cookies.get("T120")
    var errors = {
        phone: '',
        address: '',
        email: '',
        fullname: '',
        dateOfBirth: ''
    };
    const [counter, setCounter] = useState(count);
    const { userName } = useParams();
    const [username, setUserName] = useState(userName);
    const [profile, setProfile] = useState()
    const [description, setDesc] = useState('');
    const [dateOfBirth, setDob] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [fullname, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const history = useHistory();
    const [token, setToken] = useState('');
    const d = "https://i.pinimg.com/1200x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg";
    const [selectedImage, setSelectedImage] = useState(d);
    const [edit, setEdit] = useState(false);
    const [e, setE] = useState({});
    let messenger = new MessengerService();
    let service = new ProfileService();
    let userService = new UserService();
    const handleBlur = (field) => {
        const newErrors = { ...errors };

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

        if (field === 'fullname') {
            if (!fullname) {
                newErrors.fullname = messenger.nameRequired;
            } else {
                newErrors.fullname = "";
            }
        }
        if (field === 'dateOfBirth') {
            if (!dateOfBirth) {
                newErrors.dateOfBirth = messenger.dobRequired;
            } else {
                newErrors.dateOfBirth = "";
            }
        }
        errors = newErrors;
        setE(errors)
    }
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        if (file) {
            // Xử lý file ảnh, ví dụ: hiển thị nó hoặc tải lên máy chủ
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
            reader.onloadend = () => {
                // Lấy dữ liệu base64 từ FileReader
                const base64String = reader.result.split(",")[1];

                // Ở đây, bạn có thể sử dụng base64String theo nhu cầu của bạn, ví dụ: hiển thị hoặc tải lên máy chủ
                console.log("Mã base64 của hình ảnh:", base64String);
                convertBase64ToImage(base64String)
            };
            // Đọc tệp hình ảnh dưới dạng URL data
            reader.readAsDataURL(file);
        }
    };
    const convertBase64ToImage = (base64String) => {
        const isrc = "data:image/png;base64," + base64String;
        setSelectedImage(isrc);
    };
    const validateForm = () => {
        // handleBlur('username');
        handleBlur('email');
        handleBlur('fullname');
        handleBlur('address');
        handleBlur('phone');
        handleBlur('description');
        handleBlur('dateOfBirth');

        // Kiểm tra giá trị mới của errors
        if (!errors.phone && !errors.email && !errors.description && !errors.fullname && !errors.address && !errors.dateOfBirth) {
            return true;
        }
        return false;
    }

    useEffect(() => {
        if (!Cookies.get("T120")) {
            Cookies.set("T120", 10)
        }
        const interval = setInterval(() => {
            setCounter((prevCounter) => prevCounter - 1);
            count = count - 1
            Cookies.set("T120", count, { expires: 1 / 2 / (24 * 60) })
            // if (Cookies.get("T120") === NaN) {
            //     Cookies.set("T120", 120)
            // }
            console.log(Cookies.get("refresh"));
            if (count <= 0) {
                if (Cookies.get("refreshToken") != "NaN" && Cookies.get("refreshToken")&& (Cookies.get("refresh")!="true")) {
                    console.log(Cookies.get("refreshToken"))
                    var rf = {
                        token: Cookies.get("refreshToken")
                    }
                    userService.refreshToken(rf).then((result => {
                        if (result.data) {
                            Cookies.remove("token")
                            Cookies.set("token", result.data.accessToken, { expires: 10 / (24 * 60 * 60) }); // Lưu token nếu nó không bằng null
                            setToken(result.data.accessToken)
                            Cookies.set("username", username, { expires: 10 / (24 * 60 * 60) });
                            Cookies.set("T120", 10, { expires: 1 / 2 / (24 * 60) })
                            count=10;
                            setCounter(10)
                            Cookies.set("refresh",true)
                        }
                    }))
                } else {
                    Cookies.remove("refreshToken")
                    Cookies.remove("refresh")
                    Cookies.remove("token")
                    Cookies.remove("username")
                    Cookies.remove("T120")
                    history.push("/signin");
                }
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    console.log(Cookies.get("T120"))
    useEffect(() => {

        console.log(userName)
        if (Cookies.get("token")) {
            // Cookies.set("120",120, { expires: 1/2 / (24 * 60) })
            setToken(Cookies.get("token"));
        }
        else {
            {
                if (Cookies.get("refreshToken")) {
                    console.log(Cookies.get("refreshToken"))
                    var rf = {
                        token: Cookies.get("refreshToken")
                    }
                    userService.refreshToken(rf).then((result => {
                        if (result.data) {
                            Cookies.set("token", result.data.accessToken, { expires: 10 / (24 * 60 * 60) }); // Lưu token nếu nó không bằng null
                            Cookies.set("username", username, { expires: 10 / (24 * 60 * 60) });
                            Cookies.set("refreshToken", result.data.accessToken, { expires: 1 / 24 })
                        }
                    }))
                } else
                    history.push("/signin");
            }
        }
        if (token) {
            service.findById(userName, token).then(result => {
                setProfile(result.data);
            }).catch((error) => {
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
    }, [Cookies.get("token"), token, userName])
    useEffect(() => {
        if (!Cookies.get("T120")) {
            Cookies.set("T120", 10)
        }
    }, [count, Cookies.get("T120")])
    useEffect(() => {
        if (profile) {
            setAddress(profile.address)
            setDesc(profile.description)
            setDob(profile.dateOfBirth)
            setEmail(profile.email)
            setFullName(profile.fullName)
            setSelectedImage(profile.pathImage)
            setPhone(profile.phone)
        }

    }, [profile])
    const hadleSaveChanges = () => {
        if (validateForm()) {
            var profile = {
                fullName: fullname,
                pathImage: selectedImage === d ? d : selectedImage,
                dateOfBirth: dateOfBirth,
                email: email,
                phone: phone,
                address: address,
                description: description
            }
            console.log(profile)
            service.saveProfile(username, profile, token).then((result => {
                if (!result.data)
                    swal({
                        title: "Your user is not access",
                        text: "Click",
                        icon: "error",
                    });
                else {
                    setProfile(profile)
                    swal({
                        title: "Success",
                        text: "Click",
                        icon: "success",
                    });
                }
            })).catch();
            setEdit(false);
        } else {
            swal({
                title: "error level god",
                text: "Click",
                icon: "error",
            });
        }

    }
    return (
        <Container>
            <Grid columns={2}>
                <Grid.Row className='justify-content-center'>

                    <Grid.Column width={5}>
                        {selectedImage && <img style={{ width: '100%' }} src={selectedImage} alt="Selected Image" />}
                        <input type="file" onChange={handleImageChange} />
                    </Grid.Column>
                    <Grid.Column className='justify-content-center' width={6}>
                        <Header as="h1">Profile</Header>
                        <div className='justify-content-center'>
                            <form>
                                <div className='row'>
                                    <div className='col-md-3 col-lg-3 col-sm-3'>
                                        <label>Full Name:</label>
                                    </div>
                                    <div className='col-md-5 col-lg-5 col-sm-5'>
                                        {edit ? (<input value={fullname} style={{ width: '100%' }} onBlur={() => handleBlur('fullname')} onChange={(e) => { setFullName(e.target.value) }} required />) : (<label>{fullname}</label>)}
                                    </div>
                                    <div className='col-md-4 col-lg-4 col-sm-4'>
                                        {e.fullname && <p style={{ color: 'red' }}>{e.fullname}</p>}
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-3 col-lg-3 col-sm-3'>
                                        <label>Date of Birth:</label>
                                    </div>
                                    <div className='col-md-5 col-lg-5 col-sm-5'>
                                        {edit ? (<input value={dateOfBirth} type='date' style={{ width: '100%' }} onBlur={() => handleBlur('dateOfBirth')} onChange={(e) => { setDob(e.target.value) }} required />) : (<label>{dateOfBirth}</label>)}
                                    </div>
                                    <div className='col-md-4 col-lg-4 col-sm-4'>
                                        {e.dateOfBirth && <p style={{ color: 'red' }}>{e.dateOfBirth}</p>}
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-3 col-lg-3 col-sm-3'>
                                        <label>Email:</label>
                                    </div>
                                    <div className='col-md-5 col-lg-5 col-sm-5'>
                                        {edit ? (<input value={email} style={{ width: '100%' }} onBlur={() => handleBlur('email')} onChange={(e) => { setEmail(e.target.value) }} required />) : (<label>{email}</label>)}
                                    </div>
                                    <div className='col-md-4 col-lg-4 col-sm-4'>
                                        {e.email && <p style={{ color: 'red' }}>{e.email}</p>}
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-3 col-lg-3 col-sm-3'>
                                        <label>Phone:</label>
                                    </div>
                                    <div className='col-md-5 col-lg-5 col-sm-5'>
                                        {edit ? (<input value={phone} style={{ width: '100%' }} onBlur={() => handleBlur('phone')} onChange={(e) => { setPhone(e.target.value) }} required />) : (<label>{phone}</label>)}
                                    </div>
                                    <div className='col-md-4 col-lg-4 col-sm-4'>
                                        {e.phone && <p style={{ color: 'red' }}>{e.phone}</p>}
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-3 col-lg-3 col-sm-3'>
                                        <label>Address:</label>
                                    </div>
                                    <div className='col-md-5 col-lg-5 col-sm-5'>
                                        {edit ? (<input value={address} onBlur={() => handleBlur('address')} style={{ width: '100%' }} onChange={(e) => { setAddress(e.target.value) }} required />) : (<label>{address}</label>)}
                                    </div>
                                    <div className='col-md-4 col-lg-4 col-sm-4'>
                                        {e.address && <p style={{ color: 'red' }}>{e.address}</p>}
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-3 col-lg-3 col-sm-3'>
                                        <label>Description:</label>
                                    </div>
                                    <div className='col-md-5 col-lg-5 col-sm-5'>
                                        {edit ? (<input value={description} onBlur={() => handleBlur('description')} style={{ width: '100%' }} onChange={(e) => { setDesc(e.target.value) }} />) : (<label>{description}</label>)}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row className="justify-content-center">
                    <div className='row justify-content-center'>
                        <button type='button' className='btn btn-secondary' onClick={() => { setEdit(true) }}>
                            <Icon name="edit"></Icon>
                            Edit Profile
                        </button>
                        <button type='button' className='btn btn-success' onClick={hadleSaveChanges} style={{ marginLeft: '2rem' }}>
                            <Icon name="edit"></Icon>
                            Save Profile
                        </button>
                    </div>
                </Grid.Row>
                <Grid.Row className="justify-content-center">{counter}</Grid.Row>
            </Grid>
        </Container>
    )
}