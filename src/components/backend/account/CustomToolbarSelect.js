import React, {useState} from "react";
import Tooltip from "@material-ui/core/Tooltip";
import {Modal,Button,Row,Col} from "react-bootstrap";
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import { useCookies } from 'react-cookie';
import checkToken from "../../../utils/checkToken";
import {useHistory} from "react-router-dom";


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


const CustomToolbarSelect = (props) => {

    const history = useHistory();

    const [cookies, setCookie] = useCookies(['selected_pickups']);

    const [openModal, setOpenModal] = useState(false);
    const [deliveries, setDeliveries] = useState('');

    const onClickModal = () =>{
        setOpenModal(true);
    }
    const onCloseModal = ()=>{
        setOpenModal(false);
    }

    const handleClick = () => {
        const idArray = [];
        const selectedIndex = props.selectedRows.data
        const datas = props.displayData;
        selectedIndex.map((selected) => {
            datas.map((record) => {
                if(record.dataIndex === selected.dataIndex){
                    idArray.push(record.data[0])
                }
            })
        })
        setDeliveries(idArray);
        onClickModal();
    };




  const continuePayment = () => {
        let AccountStorage = JSON.parse(localStorage.getItem('Account_storage'));
        if(AccountStorage){
            checkToken(AccountStorage.token, 'Account_storage')
            setAuthorizationToken(AccountStorage.token);
        }
        setCookie('selected_pickups', deliveries, { path: '/' });
        history.push('/account/paymentcalculation')
  }

    return (
         <>
        <Modal show={openModal} onHide={onCloseModal}>
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
                            <Button variant="secondary" style={{backgroundColor:'#147298',border:'1px solid #147298',borderRadius:'5px',width:'100%'}} onClick={continuePayment}>Continue</Button>
                        </Col>
                        <Col lg={6}>
                           <Button variant="secondary"  style={{backgroundColor:'red',border:'1px solid red',borderRadius:'5px',width:'100%'}} onClick={onCloseModal}>
                             Cancel
                          </Button>
                        </Col>
                    </Row>

                </Modal.Footer>
        </Modal>
      <div className={"custom-toolbar-select"}>
        <Tooltip title={"icon 2"}>
            <button onClick={handleClick} style={{fontSize:'14px',borderColor:'#147298',borderRadius:'5px',color:'#fff',backgroundColor:'#147298',marginTop:'0px',border:'1px solid #147298',padding:'5px 35px',marginRight:'25px'}}>Settle</button>
        </Tooltip>
      </div>

            </>
    )
}

export default CustomToolbarSelect;