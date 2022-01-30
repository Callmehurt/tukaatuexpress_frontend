import React, {useEffect, useState} from 'react';
import ReactDOM from "react-dom";
import {Row,Col,Accordion} from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory,{Type} from 'react-bootstrap-table2-editor';

const TransferDatatable=()=>{
    const[dataSave,setDataSave]=useState('');
    const allBranch=[{
          value: 'A',
          label: 'A'
        }, {
          value: 'B',
          label: 'B'
        }, {
          value: 'C',
          label: 'C'
        }, {
          value: 'D',
          label: 'D'
        }, {
          value: 'E',
          label: 'E'
        }];

const columns = [

    {
    dataField: "transferFrom",
    text: "Transfer From",
    // editor: {
    //     type: Type.SELECT,
    //     options: allBranch
    //   }
  },
  {
    dataField: "transferTo",
    text: "Transfer To",
    // editor: {
    //     type: Type.SELECT,
    //     options: allBranch
    // }
  },
    {
    dataField: "transferCount",
    text: "Transfer Count"
  },

];
// let activities = [
//     ['Work', 9],
//     ['Eat', 1],
//     ['Commute', 2],
//     ['Play Game', 1],
//     ['Sleep', 7]
// ];

const students = [
              // {
              //     // 'id':'1',
              //   'transferFrom': 'Select',
              //   'transferTo': '',
              //   'transferCount': ''
              // },
              {
                 // 'id':'2',
                 'transferFrom': 'Itahari',
                'transferTo': 'Damak',
                'transferCount': ''
              },
              {
                   // 'id':'3',
                 'transferFrom': 'Itahari',
                'transferTo': 'Birtamode',
                'transferCount': ''
              },
              {
                   'id':'3',
                 'transferFrom': 'Itahari',
                'transferTo': 'Kathmandu',
                'transferCount': ''
              },
                {
                   // 'id':'3',
                 'transferFrom': 'Itahari',
                'transferTo': 'lahan',
                'transferCount': ''
              },
             {
                   // 'id':'4',
                 'transferFrom': 'Itahari',
                'transferTo': 'Banepa',
                'transferCount': ''
              },

          ];
useEffect(()=>{
    // console.table(activities);
    // activities.forEach((activity) => {
    //     activity.forEach((data) => {
    //         console.log(data);
    //     });
    // });

});

// const products = [
//   {
//     id: 1,
//     name: "Product1",
//     price: 120
//   },
//   {
//     id: 2,
//     name: "Product2",
//     price: 80
//   }
// ];

    return(
        <div>
           {/*<h6> Hello Transfer Datatable</h6>*/}
            {/*<Accordion defaultActiveKey="0">*/}
            {/*      <Accordion.Item eventKey="0">*/}
            {/*        <Accordion.Header>Accordion Item #1</Accordion.Header>*/}
            {/*        <Accordion.Body>*/}
            {/*          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod*/}
            {/*          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim*/}
            {/*          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea*/}
            {/*          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate*/}
            {/*          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat*/}
            {/*          cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id*/}
            {/*          est laborum.*/}
            {/*        </Accordion.Body>*/}
            {/*      </Accordion.Item>*/}
            {/*      <Accordion.Item eventKey="1">*/}
            {/*        <Accordion.Header>Accordion Item #2</Accordion.Header>*/}
            {/*        <Accordion.Body>*/}
            {/*          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod*/}
            {/*          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim*/}
            {/*          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea*/}
            {/*          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate*/}
            {/*          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat*/}
            {/*          cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id*/}
            {/*          est laborum.*/}
            {/*        </Accordion.Body>*/}
            {/*      </Accordion.Item>*/}
            {/*    </Accordion>*/}
            {/* <table className="table table-bordered">*/}
            {/*             <tr>*/}
            {/*                <th>Branch From</th>*/}
            {/*                <th>Branch To</th>*/}
            {/*                <th>Transfer Count</th>*/}
            {/*            </tr>*/}
            {/*{students.map((student, index) => (*/}
            {/*    <>*/}

            {/*          <tr data-index={index}>*/}
            {/*            <td>{student.id}</td>*/}
            {/*            <td>{student.name}</td>*/}
            {/*            <td>{student.email}</td>*/}
            {/*          </tr>*/}
            {/*    </>*/}
            {/*))}*/}
            {/* </table>*/}
            {/*<h6>Data Going to save</h6>*/}
            <Row className="mb-4 mt-2">

                <Col lg={4}>
                     Transfer From:{dataSave.transferFrom}
                </Col>
                <Col lg={4}>
                    Transfer To:{dataSave.transferTo}
                </Col>
                <Col lg={4}>
                    Transfer Count:{dataSave.transferCount}
                </Col>
                <Col lg={12}>
                    {/*{dataSave}*/}
                </Col>

            </Row>
            <BootstrapTable
                  keyField="id"
                  data={ students }
                  columns={ columns }
                  cellEdit={ cellEditFactory({
                    mode: 'dbclick',
                    onStartEdit: (row, column, rowIndex, columnIndex) => { console.log('start to edit!!!'); },
                    beforeSaveCell: (oldValue, newValue, row, column) => { console.log('Before Saving Cell!!');console.log(newValue);console.log(oldValue);console.log(row);setDataSave(row); },
                    afterSaveCell: (oldValue, newValue, row, column) => { console.log('After Saving Cell!!'); }
                  }) }
            />




        </div>
    )
}
export default TransferDatatable