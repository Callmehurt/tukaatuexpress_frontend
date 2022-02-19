import React, {useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import MUIDataTable from "mui-datatables";
import {fetchSelectedReturnStatementDetail, clearSelectedReturnStatementDetail} from "../../../../../redux/actions/partnerReturnStatementAction";
import {Button, Modal, Table} from "react-bootstrap";
import {IoMdPrint} from "react-icons/io";
import ReactToPrint from "react-to-print";
import {PrintDetail} from "./PrintDetail";

const VendorReturnPickupPendingStatement = (props) => {

    const statements = props.statements;

    const dispatch = useDispatch();
    const returnStatementDetail = useSelector((state) => state.partnerReturnDetails.selectedReturnStatement);

    const [openModal, setOpenModal] = useState(false);

    const onClickModal = () =>{
        setOpenModal(true);
    }
    const onCloseModal = ()=>{
        setOpenModal(false);
        dispatch(clearSelectedReturnStatementDetail())
    }

    const viewStatement = (statement_id) => {
        onClickModal();
        dispatch(fetchSelectedReturnStatementDetail(statement_id))
    }

       const columns = [
        {
         name: "statement_num",
         label: "Statement N0.",
         options: {
          filter: true,
          sort: true,
         }
        },
       {
         name: "returns",
         label: "Returned Packet Count",
          options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => (
              <>
                  {
                      value.split(',').length
                  }
              </>
          )
         }
      }, {
         name: "approve_status",
         label: "Approved Status",
         options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => (
              <>
                  <button className="btn btn-sm btn-warning">Pending</button>
              </>
          )
         }
      }, {
         name: "approved_date",
         label: "Approved Date",
         options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => (
              <>
                  {value==null?
                      <>
                      </>:
                      <>
                          {value}
                      </>
                  }

              </>
          )
         }
      },{
         name: "id",
         label: "Action",
         options: {
          filter: true,
          sort: true,
              customBodyRender: (value, tableMeta, updateValue) => (
                  <>
                      <button className='btn btn-sm btn-primary' style={{marginRight: '10px'}} onClick={() => viewStatement(value)}>View</button>
                      <ReactToPrint
                        trigger={() =>  <button className={'btn btn-sm btn-primary'} style={{marginLeft: '10px'}}><IoMdPrint size={20} /> Print</button>}
                        onBeforeGetContent={() => dispatch(fetchSelectedReturnStatementDetail(value))}
                        onAfterPrint={() => dispatch(clearSelectedReturnStatementDetail())}
                        content={() => printRef.current}
                      />
                  </>
              )
         }
      },


       ];
       const options = {
        searchOpen:false,
        filterType:'textField',
        fixedHeader:false,
        rowsPerPage: 100,
        rowsPerPageOptions: [10,20,50,100,500],
        selectableRows:false,
     }

         const printRef = useRef();

    return(
        <>
             <div style={{display:'none',}}>
                  <PrintDetail ref={printRef} returnStatementDetails={returnStatementDetail} />
            </div>
            <MUIDataTable
            data={statements}
            columns={columns}
            options={options}
           />

            <Modal show={openModal} onHide={onCloseModal} size={'xl'} centered>
                <Modal.Header >
                  <Modal.Title>Statement: {
                      Object.keys(returnStatementDetail).length === 0 ? (
                          <>.......</>
                      ): (
                          <>
                              {returnStatementDetail.statement.statement_num}
                          </>
                      )
                  }
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   <Table striped bordered hover size="sm">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Tex Code</th>
                          <th>Customer Details</th>
                          <th>Destination</th>
                          <th>Returned Date</th>
                          <th>Return Charge</th>
                        </tr>
                      </thead>
                      <tbody>
                      {Object.keys(returnStatementDetail).length === 0 ? (
                              <tr>
                                  <td colSpan={6} className='text-center'>Loading...</td>
                              </tr>
                          ): (
                              <>
                                  {returnStatementDetail.returns.map((data, index) => {
                                     return (
                                         <tr key={data.tex_code}>
                                          <td>{index+1}</td>
                                          <td>{data.tex_code}</td>
                                          <td>{data.customer_name} - {data.customer_phone}</td>
                                          <td>{data.customer_address}</td>
                                          <td>{data.delivery_id === null ? data.updated_at : data.prompt_date}</td>
                                          <td>Rs. {data.return_charge}</td>
                                        </tr>
                                     )
                                  })}

                            <tr>
                                <td></td>
                              <td colSpan={4}><strong>Total</strong></td>
                              <td>
                                  <strong>Rs. {
                                      returnStatementDetail.returns.reduce((total, obj) => parseInt(obj.return_charge) + total, 0)
                                  }
                                  </strong>
                              </td>
                            </tr>
                              </>
                          )}
                      </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"  style={{backgroundColor:'red',border:'1px solid red',borderRadius:'5px',width:'100%'}} onClick={onCloseModal}>
                             Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}
export default VendorReturnPickupPendingStatement