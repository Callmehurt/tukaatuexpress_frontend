import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import {Modal,Button,Row,Col} from "react-bootstrap";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import setAuthorizationToken from "./../../../../../utils/setAuthorizationToken";
import { withCookies, Cookies } from "react-cookie";
import { instanceOf } from "prop-types";
import PushHistoryOnly from "../../../account/PushHistoryOnly";
import notification from "../../../includes/notification";

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
       cookies: instanceOf(Cookies).isRequired,
    };
    constructor(props) {
        super(props);
        this.state = {
           openModalAdmin : false,
           deliveries:[],
            returns_id:[],
            partner_ids:null,
        };
  }
  makeStatement=()=>{
        let returns=this.state.returns_id;
        let partner_id=this.state.partner_ids;
        console.log(partner_id,returns)
         axios.post('/admin/make/partner/return/statement',{returns,partner_id})
            .then((res) => {
                console.log(res);
                 if(res.data.status === true) {
                     notification('success', res.data.message);
                 }
                 else{
                      notification('danger', res.data.message);
                 }

            })
            .catch((err) => {
                console.log(err.response.data);
            })
  }
    handleClick = () => {

        // console.log(this.state.openModal,'open modal');
        const {cookies} = this.props;
        this.state.deliveries=[];
        this.state.returns_id=[];
        console.log("click! current selected rows", this.props.selectedRows);
        console.log("Actual data", this.props.displayData);
        let dataLength = this.props.displayData.length;
         for (let i = 0; i <= dataLength; i++) {
             // console.log(this.props.displayData[i].data[8]);
             // let returns_ids =this.props.displayData[i].data[8];
             if(this.props.displayData.length===this.props.selectedRows.data.length)
             {
                 // this.state.deliveries.push(this.props.displayData[i].data);
                 this.state.delivery=[];
                  this.state.deliveries=this.props.displayData;
                  //  this.props.displayData.map((items)=>{
                  //     this.state.deliveries.push(items.data[9]);
                  //   })
                   // this.state.returns_id.push(returns_ids);
             }
             else {
                 let SelectDataIndex = this.props.selectedRows.data[i] ? this.props.selectedRows.data[i].dataIndex : null;
                 console.log(SelectDataIndex);
                 if (SelectDataIndex!=null) {
                     this.state.deliveries.push(this.props.displayData[SelectDataIndex]);
                     // this.state.returns_id.push(this.props.displayData[SelectDataIndex].data[8]);
                 }
             }
              if(this.props.displayData.length===this.props.selectedRows.data.length){
                  let uniqueChars = [...new Set(this.state.deliveries)];
                  this.state.deliveries=uniqueChars;
             }else{
                   let uniqueChars = [...new Set(this.state.deliveries)];
                  this.state.deliveries=uniqueChars;
             }
              // this.setState({partner_ids:this.state.deliveries[0].data[9]});

             console.log(this.state.deliveries[0]);
             console.log('display data Index');
             // this.state.deliveries.push(this.props.displayData[i].dataIndex);
            // if(this.props.selectedRows[i].dataIndex){
            //
            // }
            // this.state.deliveries.push(this.props.displayData[i].data[0]);
            // console.log(this.state.deliveries);
        }

        this.openModalFunc();
    }
    onClickModal = () =>{
        this.setState({openModalAdmin : true});
    }
    onCloseModal = ()=>{
        this.setState({openModalAdmin : false})
    }
    openModalFunc=()=>{

        // console.log(this.props.location);
      this.setState({openModalAdmin : true});
      this.setState({partner_ids:this.state.deliveries[0].data[9]});
      //   console.log(this.state.deliveries[0]?.data[8]);
      console.log("return Deliveries");
      let selectedDataLength=this.state.deliveries.length;
      console.log(this.state.deliveries[0]?.data[8]);
      if(selectedDataLength!=null){
          console.log(this.state.deliveries[0].data[8]);
          let returns_ids=[];
          for (let i = 0; i <= selectedDataLength; i++){
               returns_ids=this.state.deliveries[i]?.data[8];
               this.state.returns_id.push(returns_ids);
          }

          console.log( this.state.returns_id);
          console.log(this.state.partner_ids);
      }
      // console.log(this.state.deliveries[0].data[8]);
      // let returns_ids=[];
      // for (let i = 0; i <= selectedDataLength; i++){
      //      returns_ids=this.state.deliveries[i]?.data[8];
      //      this.state.returns_id.push(returns_ids);
      // }
      //
      // console.log( this.state.returns_id);
      // console.log(this.state.partner_ids);
    }
    render() {
      const { classes } = this.props;
      return (
          <>
              <Modal show={this.state.openModalAdmin} onHide={this.onCloseModal}>
                  <Modal.Header >
                    {/*<Modal.Title>Modal heading</Modal.Title>*/}
                  </Modal.Header>
                  <Modal.Body>
                      <div style={{display:'flex',justifyContent:'center'}}>
                      <h6>Are you really want to make statement ?</h6>
                      </div>
                  </Modal.Body>
                  <Modal.Footer>
                      <Row style={{width:'100%'}}>
                          <Col lg={6}>

                              <Button variant="secondary" style={{backgroundColor:'#147298',border:'1px solid #147298',borderRadius:'5px',width:'100%'}} onClick={this.makeStatement}>Make Statement</Button>

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
                      {/*<FilterIcon className={classes.deleteIcon} />*/}<button onClick={this.handleClick} style={{fontSize:'14px',borderColor:'#147298',borderRadius:'5px',color:'#fff',backgroundColor:'#147298',marginTop:'0px',border:'1px solid #147298',padding:'5px 35px',marginRight:'25px'}}>Make Statement</button>
                  </Tooltip>
              </div>
          </>
      );
    }

}
export default withCookies(CustomToolbarSelect);