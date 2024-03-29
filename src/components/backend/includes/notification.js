import {store} from "react-notifications-component";

const showNotification = (type, message) => {
     store.addNotification({
         message: message,
         type: type,
         insert: "top",
         isMobile: true,
         container: "top-right",
         animationIn: ["animate__animated", "animate__fadeIn"],
         animationOut: ["animate__animated", "animate__fadeOut"],
         dismiss: {
             duration: 3000,
             onScreen: true,
             pauseOnHover: true
         }
     });
}

export default showNotification;