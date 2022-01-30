import axios from "axios";

const axiosInterceptor = () => {
    axios.interceptors.request.use(function(config) {
  // Do something before request is sent
    console.log('Start Ajax Call');
    return config;
  }, function(error) {
    // Do something with request error
    console.log('Error');
    return Promise.reject(error);
  });

  axios.interceptors.response.use(function(response) {
    // Do something with response data
    console.log('Done with Ajax call');

    return response;
  }, function(error) {
    // Do something with response error
    console.log('Error fetching the data');
    return Promise.reject(error);
  });
  }

export default axiosInterceptor;