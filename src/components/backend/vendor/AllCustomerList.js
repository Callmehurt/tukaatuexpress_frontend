import React, {useEffect, useState} from 'react';
import {Row, Col, Card, Form, Image} from 'react-bootstrap';
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import axios from "axios";
import {getAllCustomerListDisplay} from "../../../redux/actions/vendor";
import {useDispatch, useSelector} from "react-redux";
import Fuse from "fuse.js";
import logoImage from "../../../logo.svg";
const options = {
      shouldSort: true,
      includeMatches: true,
      threshold: 0.0,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      findAllMatches: true,
      keys: ["name", "phone","address"],
    };
const AllCustomerList=()=>{
     const dispatch = useDispatch();
     const vendor = useSelector((state) => state.vendor);
     const allCustomerListDisplay=vendor.allCustomerListDisplay;
     const [query, setQuery] = useState("");
     const fuse = new Fuse(allCustomerListDisplay, options);
      const results = fuse.search(query);
      const characterResults = query
        ? results.map((character) => character.item)
        : allCustomerListDisplay;
      const onSearch = ({ currentTarget })=>{
       setQuery(currentTarget.value);
       console.log(currentTarget.value);
    }
    useEffect(()=>{
        let vendorDetail = JSON.parse(localStorage.getItem('vendorDetail'));
        console.log(vendorDetail);
        // console.log('staff_admin');
        console.log('hello use');
        if (vendorDetail) {
            setAuthorizationToken(vendorDetail.token);
        }
         getCustomerList();
    },[]);
    const getCustomerList=()=>{
        axios.get('/partner/customer/list')
            .then((res) => {
                console.log(res)
                dispatch(getAllCustomerListDisplay(res.data));

            })
            .catch((err) => {
                console.log(err.response)
            })
    }

    return(
        <>

             <Row>
                 <Col xs={12}>
                      <div className="pt-2 pb-2 ">
                      <Card style={{borderRadius:'30px',border:'none'}}>
                          <Card.Body className="p-2">
                               <Form className="search">
                                   <Form.Control type="text" value={query} placeholder="Search customer ..." onChange={onSearch} style={{borderRadius:'15px',}} />
                                  {/*<input type="text" value={query} onChange={onSearch} />*/}
                              </Form>
                          </Card.Body>
                      </Card>

                       {/*<ReactDashboardMainSearch />*/}
                  </div>
                 </Col>
                 <Col xs={4}>
                     <div style={{display:'flex',placeContent:'center'}}>
                         <h6>Name</h6>
                     </div>

                 </Col>
                 <Col xs={4}>
                      <div style={{display:'flex',placeContent:'center'}}>
                        <h6>Number</h6>
                      </div>
                 </Col>
                 <Col xs={4}>
                      <div style={{display:'flex',placeContent:'center'}}>
                         <h6>Address</h6>
                      </div>
                 </Col>
             </Row>
             <Row style={{height:'71vh',overflowX:'hidden',overflowY:'auto'}}>
                 {
                     query.length > 0 ?
                         <>
                             <Col lg={12} style={{paddingLeft:'17px',paddingRight:'17px',paddingBottom:'7px'}}>
                                 {characterResults.length?
                                     <>
                                          <div>
                                  {characterResults.map((character) => {
                                      const {name, phone, address} = character;
                                      return (
                                          <>
                                              <Card>
                                                 <Card.Body className="p-2">
                                                     <Row>
                                                         <Col xs={4}>
                                                             <p className="mb-0">{character.name.length>12?<span>{character.name.substring(0,12)}..</span>:<span>{character.name}</span>}</p>
                                                         </Col>
                                                         <Col xs={4}>
                                                             <p className="mb-0">{character.phone.length>12?<span>{character.phone.substring(0,12)}..</span>:<span>{character.phone}</span>}</p>


                                                         </Col>
                                                         <Col xs={4}>
                                                             <p className="mb-0">{character.address.length>12?<span>{character.address.substring(0,12)}..</span>:<span>{character.address}</span>}</p>

                                                         </Col>
                                                     </Row>
                                                 </Card.Body>
                                                </Card>

                                          </>
                                      )
                                  })
                                  }
                              </div>
                                     </>:
                                     <>
                                         <div style={{height:'60vh',display:'grid',placeContent:'center',fontSize:'16px',fontWeight:'500'}}>No Customer Here...</div>

                                     </>
                                     }

                           </Col>
                         </> :
                         <>
                             <div>
                                    {
                                        allCustomerListDisplay.length?
                                            <>
                                                {
                                                    allCustomerListDisplay.map((items)=>(
                                                        <>
                                                            <Col xs={12} style={{paddingLeft:'5px',paddingRight:'5px'}}>
                                                                <Card>
                                                                 <Card.Body className="p-2">
                                                                     <Row>
                                                                         <Col xs={4}>
                                                                             <p className="mb-0">{items.name.length>12?<span>{items.name.substring(0,12)}..</span>:<span>{items.name}</span>}</p>
                                                                         </Col>
                                                                         <Col xs={4}>
                                                                             <p className="mb-0">{items.phone.length>12?<span>{items.phone.substring(0,12)}..</span>:<span>{items.phone}</span>}</p>


                                                                         </Col>
                                                                         <Col xs={4}>
                                                                             <p className="mb-0">{items.address.length>12?<span>{items.address.substring(0,12)}..</span>:<span>{items.address}</span>}</p>

                                                                         </Col>
                                                                     </Row>
                                                                 </Card.Body>
                                                                </Card>
                                                            </Col>

                                                        </>
                                                    ))
                                                }
                                            </>:
                                            <>
                                                <Col xs={12}>
                                                        <div style={{height:'60vh',display:'grid',placeContent:'center',fontSize:'16px',fontWeight:'500'}}>No Customer Here...</div>
                                                    </Col>
                                            </>
                                    }
                             </div>
                         </>
                 }


            </Row>

        </>
    )
}
export default AllCustomerList