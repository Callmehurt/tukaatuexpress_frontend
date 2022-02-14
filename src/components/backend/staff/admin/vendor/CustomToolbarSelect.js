import React, {useState} from "react";
import Tooltip from "@material-ui/core/Tooltip";
import {Modal,Button,Row,Col} from "react-bootstrap";
import { useCookies } from 'react-cookie';
import {useHistory, useParams} from "react-router-dom";
import {makePartnerReturnStatement} from "../../../../../redux/actions/partnerReturnStatementAction";
import {useDispatch} from "react-redux";


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

    const {partner_id} = useParams();
    const dispatch = useDispatch();
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
                    idArray.push(record.data[8])
                }
            })
        })
        setDeliveries(idArray);
        onClickModal();
    };


    const makeStatement = () => {
        const details = {
            returns: deliveries,
            partner_id: partner_id
        }

        dispatch(makePartnerReturnStatement(details)).then((res) => {
            res === true ? onCloseModal() : <></>;
        });

    }



    return (
         <>
        <Modal show={openModal} onHide={onCloseModal}>
                <Modal.Header >
                  {/*<Modal.Title>Modal heading</Modal.Title>*/}
                </Modal.Header>
                <Modal.Body>
                    <div style={{display:'flex',justifyContent:'center'}}>
                    <h6>Are you sure to continue ?</h6>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Row style={{width:'100%'}}>
                        <Col lg={6}>
                            <Button variant="secondary" style={{backgroundColor:'#147298',border:'1px solid #147298',borderRadius:'5px',width:'100%'}} onClick={makeStatement}>Continue</Button>
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
            <button onClick={handleClick} style={{fontSize:'14px',borderColor:'#147298',borderRadius:'5px',color:'#fff',backgroundColor:'#147298',marginTop:'0px',border:'1px solid #147298',padding:'5px 35px',marginRight:'25px'}}>Make Statement</button>
        </Tooltip>
      </div>

            </>
    )
}

export default CustomToolbarSelect;