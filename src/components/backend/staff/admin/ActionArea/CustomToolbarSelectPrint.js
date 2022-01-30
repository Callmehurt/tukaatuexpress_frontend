import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import {Modal,Button} from "react-bootstrap";
import axios from "axios";
import {IoMdPrint} from 'react-icons/io';
import ComponentToPrint from './ComponentToPrint'

import { withStyles } from "@material-ui/core/styles";
import setAuthorizationToken from "./../../../../../utils/setAuthorizationToken";
import { withCookies, Cookies } from "react-cookie";
import { instanceOf } from "prop-types";
// import PushHistoryOnly from "./PushHistoryOnly";


const defaultToolbarSelectStyles = {
  iconButton: {
    marginRight: "24px",
    top: "50%",
    display: "inline-block",
    position: "relative",
    transform: "translateY(-50%)"
  },
  deleteIcon: {
    color: "#000"
  }
};

class CustomToolbarSelectPrint extends React.Component {
    static propTypes = {
       cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
           openModal : false,
           printOrder:[],
        };
      }
       // componentDidMount() {
       //  console.log('component did mount');
       //   // let printSelectedData = JSON.parse(localStorage.getItem('printDataSelect'));
       //  }

    //  state = {
    //      openModal : false,
    //      deliveries:[],
    //      // paymentDeliveryData: this.props.cookies.get("paymentDeliveryData") || ""
    // }
    onClickModal = () =>{
        this.setState({openModal : true});
    }
    onCloseModal = ()=>{
        this.setState({openModal : false})
    }

  handleClick = () => {

         // console.log(this.state.openModal,'open modal');
         const { cookies } = this.props;
        console.log("click! current selected rows", this.props.selectedRows);
         console.log("Actual data", this.props.displayData);
         console.log(this.props.tableMeta,"table Meta",);
        let selectedRowIndex=this.props.selectedRows;
        let selectedRowIndexData=this.props.selectedRows.data;
        console.log(selectedRowIndexData);
        console.log("selectedRowIndexData");

        let actualDataAll=this.props.displayData;
          let printDelivery=[];
          for (let i = 0; i <= actualDataAll.length; i++) {
                 let count=0;
                 if(this.props.displayData.length===this.props.selectedRows.data.length){
                     printDelivery.push(actualDataAll[i]);

                 }
                 else {
                      let SelectDataIndex = this.props.selectedRows.data[i] ? this.props.selectedRows.data[i].dataIndex : null;
                      if (SelectDataIndex) {
                             printDelivery.push(this.props.displayData[SelectDataIndex].data);
                     // this.state.returns_id.push(this.props.displayData[SelectDataIndex].data[8]);
                      }
                 }


            }
           localStorage.setItem('printData',JSON.stringify(printDelivery));

          // this.props.history.push({
          //                   pathname: '/staff/admin/pickups',
          //                   state: PrintDelivery
          //               });

        console.log(actualDataAll);
        console.log(selectedRowIndex);
        console.log(printDelivery);
        console.log('print Delivery');

        // let dataLength = this.props.displayData.length;
        // // let datadeliveries = [];
        // for(let i = 0; i < dataLength; i++) {
        //    this.state.deliveries.push(this.props.displayData[i].data[0]);
        //    console.log(this.state.deliveries);
        // }

    // const formData=dataArray.split(",");
    // console.log(datadeliveries);
    // console.log('data array',datadeliveries)
    // //   this.setState({deliveries:datadeliveries})
    //   this.setDeliveries();
    this.openModalFunc();
    // console.log(this.props.displayData[0].data[0]);
    // let idArray={};
    // dataLength.map((index,displayData) =>{
    //   // console.log(displayData.data[0]);
    //   // let i=0;
    //   // idArray = displayData[i];
    //   // i++;
    // })
    // console.log(idArray);
  };
  // setDeliveries=(deliveries)=>{
  //  const { cookies } = this.props;
  //  let AccountStorage = JSON.parse(localStorage.getItem('Account_storage'));
  //   console.log(AccountStorage);
  //   if(AccountStorage){
  //     setAuthorizationToken(AccountStorage.token);
  //   }
  //   console.log(this.state.deliveries);
  //   this.onClickModal();
  //
  //   axios.post('/account/partner/deliveries/details',{deliveries: [this.state.deliveries]})
  //           .then((res) => {
  //               console.log(res);
  //               // this.props.history.push("/account/paymentcalculation", { state: {UrlId:'hi ram'}});
  //               // console.log('account payment calculation');
  //               // this.props.history.push("/account/paymentcalculation", { state: {UrlId:'hi ram'}});
  //               cookies.set("paymentDeliveryData",res.data, { path: "/" });
  //               this.setState({ paymentDeliveryData: cookies.get("paymentDeliveryData") });
  //               console.log(this.paymentDeliveryData);
  //
  //           })
  //           .catch((err) => {
  //               console.log(err.response);
  //
  //           });
  // }
  openModalFunc=()=>{
      this.setState({openModal : true});
  }

  render() {
    const { classes } = this.props;

    return (
        <>

        {/*<Modal open={this.state.openModal} onClose={this.onCloseModal}>*/}
        {/*     <h1>You Did it!</h1>*/}
        {/*</Modal>*/}
        {/*<Modal show={this.state.openModal} onHide={this.onCloseModal}>*/}
        {/*        <Modal.Header >*/}
        {/*          <Modal.Title>Modal heading</Modal.Title>*/}
        {/*        </Modal.Header>*/}
        {/*        <Modal.Body>*/}
        {/*            <h6>Woohoo, you're reading this text in a modal!</h6>*/}
        {/*            <div></div>*/}
        {/*        </Modal.Body>*/}
        {/*        <Modal.Footer>*/}
        {/*          <Button variant="secondary" style={{backgroundColor:'#147298',border:'1px solid #147298',borderRadius:'5px'}} onClick={this.onCloseModal}>*/}
        {/*            Close*/}
        {/*          </Button>*/}
        {/*          /!*<Button variant="primary" onClick={this.onCloseModal}>*!/*/}
        {/*          /!*  Save Changes*!/*/}
        {/*          /!*</Button>*!/*/}
        {/*        </Modal.Footer>*/}
        {/*</Modal>*/}
      <div className={"custom-toolbar-select"}>
        {/*<Tooltip title={"icon 2"}>*/}
        {/*    /!*<FilterIcon className={classes.deleteIcon} />*!/<Button variant="success" onClick={this.handleClick} style={{fontSize:'14px',borderColor:'#147298',borderRadius:'5px',color:'#fff',backgroundColor:'#198754',marginTop:'20px'}}> <IoMdPrint size={20} /> Print</Button>*/}
        {/*    /!*<Button variant="success" className="mt-3"><IoMdPrint size={20} /> <span className="pt-2" style={{fontSize:'13px'}}>Print All</span></Button>*!/*/}
        {/*</Tooltip>*/}
        {/*<Tooltip title={"icon 1"}>*/}
        {/*  <IconButton className={classes.iconButton} onClick={this.handleClick}>*/}
        {/*    <DeleteIcon className={classes.deleteIcon} />*/}
        {/*  </IconButton>*/}
        {/*</Tooltip>*/}
      </div>

            </>

    );
  }
}

// export default withStyles(defaultToolbarSelectStyles, {
//   name: "CustomToolbarSelect"
// })(CustomToolbarSelect);
export default withCookies(CustomToolbarSelectPrint);