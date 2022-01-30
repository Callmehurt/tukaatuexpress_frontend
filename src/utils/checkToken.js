import {isExpired} from "react-jwt";

const checkToken = (token, key) => {

    const isMyTokenExpiredadmin = isExpired(token)
    if(isMyTokenExpiredadmin){
        localStorage.removeItem(key);
        window.location.reload();
    }
}

export default checkToken;