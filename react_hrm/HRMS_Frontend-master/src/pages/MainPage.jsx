import React, {useEffect, useState} from 'react';
import { Link,useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
export default function MainPage() {
    const history = useHistory();
  const [token, setToken] = useState();
  useEffect(() => {
    if (Cookies.get("username") !== null && Cookies.get("username") !== undefined && Cookies.get("token") !== null && Cookies.get("token") !== undefined) {
      console.log(Cookies.get("token"));
      setToken(Cookies.get("token"));
    }
    else {
        history.push("/signin");
    }
  }, [Cookies.get("token"),token])
    return (
        <div>
            
        </div>
    )
}
