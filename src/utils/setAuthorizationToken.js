import axios from "axios";
// import {useHistory} from "react-router-dom";

const setAuthorizationToken = (token) => {
    // const history = useHistory();
    if(token){
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }else {
        delete axios.defaults.headers.common['Authorization'];
        return{
        };
          // history.push('/');
    }
}

export default setAuthorizationToken;