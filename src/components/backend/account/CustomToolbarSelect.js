import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import {Modal,Button,Row,Col} from "react-bootstrap";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import { withCookies, Cookies } from "react-cookie";
import { instanceOf } from "prop-types";
import PushHistoryOnly from "./PushHistoryOnly";


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

class CustomToolbarSelect extends React.Component {
    static propTypes = {
       cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
           openModal : false,
           deliveries:[],
        };
      }

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

          this.state.delivery=[];
          console.log(this.state.delivery);
          console.log('array emty');
         // console.log(this.state.openModal,'open modal');
         const { cookies } = this.props;
        console.log("click! current selected rows", this.props.selectedRows);
        console.log("Actual data", this.props.displayData);
         let dataLength = this.props.displayData.length;
         for (let i = 0; i <= dataLength; i++) {
             // console.log(this.props.displayData[i].data[8]);
             // let returns_ids =this.props.displayData[i].data[8];
             if(this.props.displayData.length===this.props.selectedRows.data.length)
             {
                  this.state.delivery=[];
                  console.log(this.state.delivery);
                  console.log('BEFORE MAP');
                  console.log('AFTER MAP');
                 // if( this.state.deliveries.length){
                 //     this.state.delivery=[];
                 //     this.props.displayData.map((items)=>{
                 //      this.state.deliveries.push(items.data[9]);
                 //    })
                 // }else{
                      this.props.displayData.map((items)=>{
                      this.state.deliveries.push(items.data[9]);
                    })
                 let uniqueChars = [...new Set(this.state.deliveries)];
                  console.log(this.state.delivery);
                  console.log('AFTER MAP');
                 // }
                  continue;
                 // this.state.deliveries.push(this.props.displayData[i].data);

                  // this.state.deliveries=this.props.displayData.data[9];
                   // this.state.returns_id.push(returns_ids);
             }
             else {
                 let SelectDataIndex = this.props.selectedRows.data[i] ? this.props.selectedRows.data[i].dataIndex : null;
                 console.log(SelectDataIndex);
                 if (SelectDataIndex!=null) {
                     this.state.deliveries.push(this.props.displayData[SelectDataIndex].data[9]);
                     // this.state.returns_id.push(this.props.displayData[SelectDataIndex].data[8]);
                 }
             }
              // this.setState({partner_ids:this.state.deliveries[0].data[9]});

             // console.log(this.state.deliveries);
             console.log('display data Index');
             // this.state.deliveries.push(this.props.displayData[i].dataIndex);
            // if(this.props.selectedRows[i].dataIndex){
            //
            // }
            // this.state.deliveries.push(this.props.displayData[i].data[0]);
            // console.log(this.state.deliveries);
        }
         if(this.props.displayData.length===this.props.selectedRows.data.length){
              let uniqueChars = [...new Set(this.state.deliveries)];
              this.state.deliveries=uniqueChars;
         }else{
               let uniqueChars = [...new Set(this.state.deliveries)];
              this.state.deliveries=uniqueChars;
         }



    // const formData=dataArray.split(",");
    // console.log(datadeliveries);
    // console.log('data array',datadeliveries)
    //   this.setState({deliveries:datadeliveries})
      this.setDeliveries();
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
    setDeliveries=(deliveries)=>{
   const { cookies } = this.props;
   let AccountStorage = JSON.parse(localStorage.getItem('Account_storage'));
    console.log(AccountStorage);
    if(AccountStorage){
      setAuthorizationToken(AccountStorage.token);
    }
    console.log(this.state.deliveries);
    this.onClickModal();

    axios.post('/account/partner/deliveries/details',{deliveries: [this.state.deliveries]})
            .then((res) => {
                console.log(res);
                let responsePaymentData=res.data;
                cookies.set("paymentDeliveryData",responsePaymentData, { path: "/" });
                cookies.set("DataPayment",'hello', { path: "/" });
                console.log('set cookie data');
                if(localStorage.getItem('paymentDeliveryData')){
                     localStorage.removeItem('paymentDeliveryData');
                      localStorage.setItem('paymentDeliveryData', JSON.stringify(res.data));
                }else{
                     localStorage.setItem('paymentDeliveryData', JSON.stringify(res.data));
                }
                this.setState({ paymentDeliveryData: cookies.get("paymentDeliveryData")});
                let paymentDeliveryDataStore= localStorage.getItem('paymentDeliveryData', JSON.stringify(res.data))
                 this.setState({ paymentDeliveryData: paymentDeliveryDataStore});
                console.log(this.paymentDeliveryData);

            })
            .catch((err) => {
                console.log(err.response);

            });
  }
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
        <Modal show={this.state.openModal} onHide={this.onCloseModal}>
                <Modal.Header >
                  {/*<Modal.Title>Modal heading</Modal.Title>*/}
                </Modal.Header>
                <Modal.Body>
                    <div style={{display:'flex',justifyContent:'center'}}>
                    <h6>Are you really want to settle payment ?</h6>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Row style={{width:'100%'}}>
                        <Col lg={6}>
                            <PushHistoryOnly  />
                        </Col>
                        <Col lg={6}>
                           <Button variant="secondary"  style={{backgroundColor:'red',border:'1px solid red',borderRadius:'5px',width:'100%'}} onClick={this.onCloseModal}>
                             Cancel
                          </Button>
                        </Col>
                    </Row>

                  {/*<Button variant="primary" onClick={this.onCloseModal}>*/}
                  {/*  Save Changes*/}
                  {/*</Button>*/}
                </Modal.Footer>
        </Modal>
      <div className={"custom-toolbar-select"}>
        <Tooltip title={"icon 2"}>
            {/*<FilterIcon className={classes.deleteIcon} />*/}<button onClick={this.handleClick} style={{fontSize:'14px',borderColor:'#147298',borderRadius:'5px',color:'#fff',backgroundColor:'#147298',marginTop:'0px',border:'1px solid #147298',padding:'5px 35px',marginRight:'25px'}}>Settle</button>
        </Tooltip>
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
export default withCookies(CustomToolbarSelect);