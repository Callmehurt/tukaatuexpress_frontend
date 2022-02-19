import React from 'react';
import {Table} from "react-bootstrap";


export const PrintDetail = React.forwardRef((props, ref)=>{

    const returnStatementDetail = props.returnStatementDetails;

    return(
        <>
           <div ref={ref}>
               <style type="text/css" media="print">{"\
                  @page {\ size: landscape;\ }\
                "}</style>
               <style>
                   {getPageMargins()}
               </style>
                <Table striped bordered hover size="sm" style={{width:'100% !important'}}>
                    <thead>
                    <tr>
                        <th colSpan={6} style={{textAlign: 'center'}}>{Object.keys(returnStatementDetail).length === 0 ? (
                            <>
                            </>
                        ): (
                            <span>{returnStatementDetail.statement.statement_num} - {returnStatementDetail.statement.partner}</span>
                        )}</th>
                    </tr>
                    </thead>
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
           </div>
          </>
    )
});

const getPageMargins = () => {
  return `@page { margin: 10px 10px 10px 10px  !important; }`;
};
