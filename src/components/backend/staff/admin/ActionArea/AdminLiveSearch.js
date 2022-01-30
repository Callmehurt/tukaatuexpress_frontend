import React, {useState,useEffect} from 'react';
import Fuse from "fuse.js";
import {Card, Col, Form, Image, Row} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {BsStopwatch} from 'react-icons/bs';
import {AiFillCloseCircle} from 'react-icons/ai';
import {getSuperSearchData} from './../../../../../redux/actions/BranchOperation';
import setAuthorizationToken from "../../../../../utils/setAuthorizationToken";
import Avatar from "react-avatar";
const options = {
      shouldSort: true,
      includeMatches: true,
      threshold: 0.0,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      findAllMatches: true,
      keys: ["packet_name", "customer_phone","customer_name", "tex_code","cod","type"],
    };
const AdminLiveSearch=()=>{
     const history=useHistory();
      const dispatch = useDispatch();
       const thisState = useSelector((state) => state.branchOperation);
        const allSuperSearch = thisState.allSuperSearch;
      useEffect(()=>{
        let staff_admin = JSON.parse(localStorage.getItem('staff_admin'));
        // console.log(staff_admin);
        if(staff_admin){
          setAuthorizationToken(staff_admin.token);
        }
        getSuperSearchDataFunc();

    },[]);
     const [query, setQuery] = useState("");
     const fuse = new Fuse(allSuperSearch, options);
      const results = fuse.search(query);
      const characterResults = query
        ? results.map((character) => character.item)
        : allSuperSearch;
      const onSearch = ({ currentTarget })=>{
       setQuery(currentTarget.value);
       console.log(currentTarget.value);
    }

    const getOrderDetail=(id)=>{
       // console.log(id);
        history.push({
            pathname: '/staff/admin/pickup_detail',
           state: {imageDetail: id }
        });
   }
    const getSuperSearchDataFunc=()=>{
        axios.get('/admin/super/search')
                    .then((res)=>{
                        console.log(res);
                        console.log(res.data);
                        dispatch(getSuperSearchData(res.data));
                    })
            .catch((err)=>{
               console.log(err.response);
            })
    }

    return(
        <>
           {/*<h5>Live search</h5>*/}
              <Col xs={12} style={{paddingLeft:'17px',paddingRight:'17px',paddingBottom:'7px'}}>
                  <div className="pt-2 " style={{display:'flex',position:'relative',width:'100%'}}>
                      <Card  style={{borderRadius:'30px',border:'none',width:'100%'}}>
                          <Card.Body className="p-0">
                               <Form className="search" style={{position:'relative'}}>
                                   <Form.Control type="text" value={query} placeholder="Search all orders ..." onChange={onSearch} style={{borderRadius:'15px',}} />
                                   {query.length?
                                       <>
                                           <div style={{position:'absolute',right:'1%',zIndex:'11',top:'17%'}}>
                                            <AiFillCloseCircle style={{cursor:'pointer'}} onClick={(event)=>{setQuery('')}} />
                                           </div>
                                       </>:
                                       <>
                                       </>
                                   }




                                  {/*<input type="text" value={query} onChange={onSearch} />*/}
                              </Form>
                          </Card.Body>
                      </Card>
                      <div style={{display:'flex',position:'absolute',top:'100%',width:'100%',zIndex:'11'}}>
                          {
                              query.length>0?
                                  <>
                                       <Col lg={12} style={{paddingLeft:'0px',paddingRight:'0px',paddingBottom:'7px',maxHeight:'80vh',overflowY:'auto',overflowX:'hidden'}}>
                                          <div>
                                              {characterResults.map((character) => {
                                                  const {packet_name, type, customer_phone, cod,tex_code,customer_name} = character;
                                                  return (
                                                      <>
                                                          <Card className="search_card_hover" onClick={(e)=>{e.preventDefault();getOrderDetail(character.id)}} style={{border:'none',cursor:'pointer'}}>
                                                                  <Card.Body className="p-0">
                                                                      <Row style={{height:'35px'}}>
                                                                          {/*{character.length ?*/}
                                                                              <>
                                                                                  <Col lg={1}>
                                                                                      <div style={{display:'grid',placeContent:'center',alignItems:'center',height:'35px'}}>
                                                                                            <BsStopwatch />
                                                                                      </div>
                                                                                  </Col>
                                                                                   <Col lg={11}>
                                                                                       <div style={{display:'grid',alignItems:'center',height:'35px',padding:'5px 0px'}}>
                                                                                           <h6 className="mb-0" style={{fontSize:'13px'}}>{character.tex_code}(Rs.{character.cod})</h6>
                                                                                           <p className="mb-0" style={{fontSize:'11px'}}><span >p.name:{character.packet_name}</span>{character.customer_phone?<><span className="pl-5" style={{paddingLeft:'30px'}}>c.phone{character.customer_phone}</span></>:<></>} {character.customer_name?<><span className="pl-5" style={{paddingLeft:'30px'}}>c.name: {character.customer_name}</span></>:<></>}
                                                                                               <span className="pl-5" style={{paddingLeft:'30px'}}>
                                                                                                   Status: {character.status}
                                                                                               </span>
                                                                                           </p>
                                                                                       </div>
                                                                                   </Col>
                                                                              </>
                                                                          {/*:*/}
                                                                          {/*    <>*/}
                                                                          {/*        /!*<Col lg={12}>*!/*/}
                                                                          {/*        /!*    <div style={{display:'flex',justifyContent:'center'}}>*!/*/}

                                                                          {/*        /!*    </div>*!/*/}
                                                                          {/*        /!*</Col>*!/*/}
                                                                          {/*    </>*/}
                                                                          {/*}*/}
                                                                          {/*<h5>{character.packet_name}</h5>*/}
                                                                          {/*<Col xs={3} className="pl-0 pr-0">*/}
                                                                          {/*    /!*<Image src={logoImage} roundedCircle />*!/*/}
                                                                          {/*    <div style={{*/}
                                                                          {/*                     display: 'grid',*/}
                                                                          {/*                     placeContent: 'center',*/}
                                                                          {/*                     alignItems: 'center',*/}
                                                                          {/*                     height: '70px'*/}
                                                                          {/*                 }}>*/}
                                                                          {/*                     <Avatar size="50" name={character.customer_name}*/}
                                                                          {/*                             round={true}/>*/}
                                                                          {/*    </div>*/}
                                                                          {/*</Col>*/}
                                                                          {/*<Col xs={9} style={{paddingLeft: '0px', paddingRight: '0px'}}>*/}
                                                                          {/*    <div className="pt-2">*/}
                                                                          {/*        <h6 className="mb-1">{character.tex_code}<span style={{fontSize:'15px',fontWeight:'500',paddingLeft:'5px'}}>(COD Rs.{character.cod})</span></h6>*/}

                                                                          {/*    </div>*/}
                                                                          {/*    <div>*/}
                                                                          {/*        <Row>*/}
                                                                          {/*           <Col xs={6}>*/}
                                                                          {/*             <span style={{fontSize:'15px'}}>{ character.customer_name.length>13 ? <><span>{character.customer_name.substring(0,13)}...</span></>: <><span>{character.customer_name}</span></> }</span>*/}
                                                                          {/*           </Col>*/}
                                                                          {/*           <Col xs={6}>*/}
                                                                          {/*            <span style={{fontSize:'14px'}}>Status: {character.status}</span>*/}
                                                                          {/*        </Col>*/}
                                                                          {/*        </Row>*/}

                                                                          {/*    </div>*/}
                                                                          {/*    /!*<div>*!/*/}
                                                                          {/*    /!*    <p style={{fontSize: '15px'}}>{chatList.message}</p>*!/*/}

                                                                          {/*    /!*</div>*!/*/}
                                                                          {/*    /!*<div>*!/*/}
                                                                          {/*    /!*     <p style={{fontSize:'12px'}}>{chatList.status}</p>*!/*/}

                                                                          {/*    /!*</div>*!/*/}
                                                                          {/*    /!*<Image src="holder.js/171x180" roundedCircle />*!/*/}
                                                                          {/*</Col>*/}
                                                                      </Row>
                                                                  </Card.Body>
                                                              </Card>
                                                      </>
                                                  )
                                              })
                                              }
                                          </div>
                                       </Col>
                                  </>:
                                  <>

                                  </>
                          }
                      </div>

                       {/*<ReactDashboardMainSearch />*/}
                  </div>
              </Col>

              {/*{*/}
              {/*    query.length>0?*/}
              {/*        <>*/}
              {/*             <Col lg={12} style={{paddingLeft:'17px',paddingRight:'17px',paddingBottom:'7px'}}>*/}
              {/*                <div>*/}
              {/*                    {characterResults.map((character) => {*/}
              {/*                        const {packet_name, type, customer_phone, cod,tex_code,customer_name} = character;*/}
              {/*                        return (*/}
              {/*                            <>*/}
              {/*                                <Card onClick={(e)=>{e.preventDefault();getOrderDetail(character.id)}}>*/}
              {/*                                        <Card.Body className="p-0">*/}
              {/*                                            <Row>*/}
              {/*                                                <h5>{character.packet_name}</h5>*/}
              {/*                                                /!*<Col xs={3} className="pl-0 pr-0">*!/*/}
              {/*                                                /!*    /!*<Image src={logoImage} roundedCircle />*!/*!/*/}
              {/*                                                /!*    <div style={{*!/*/}
              {/*                                                /!*                     display: 'grid',*!/*/}
              {/*                                                /!*                     placeContent: 'center',*!/*/}
              {/*                                                /!*                     alignItems: 'center',*!/*/}
              {/*                                                /!*                     height: '70px'*!/*/}
              {/*                                                /!*                 }}>*!/*/}
              {/*                                                /!*                     <Avatar size="50" name={character.customer_name}*!/*/}
              {/*                                                /!*                             round={true}/>*!/*/}
              {/*                                                /!*    </div>*!/*/}
              {/*                                                /!*</Col>*!/*/}
              {/*                                                /!*<Col xs={9} style={{paddingLeft: '0px', paddingRight: '0px'}}>*!/*/}
              {/*                                                /!*    <div className="pt-2">*!/*/}
              {/*                                                /!*        <h6 className="mb-1">{character.tex_code}<span style={{fontSize:'15px',fontWeight:'500',paddingLeft:'5px'}}>(COD Rs.{character.cod})</span></h6>*!/*/}

              {/*                                                /!*    </div>*!/*/}
              {/*                                                /!*    <div>*!/*/}
              {/*                                                /!*        <Row>*!/*/}
              {/*                                                /!*           <Col xs={6}>*!/*/}
              {/*                                                /!*             <span style={{fontSize:'15px'}}>{ character.customer_name.length>13 ? <><span>{character.customer_name.substring(0,13)}...</span></>: <><span>{character.customer_name}</span></> }</span>*!/*/}
              {/*                                                /!*           </Col>*!/*/}
              {/*                                                /!*           <Col xs={6}>*!/*/}
              {/*                                                /!*            <span style={{fontSize:'14px'}}>Status: {character.status}</span>*!/*/}
              {/*                                                /!*        </Col>*!/*/}
              {/*                                                /!*        </Row>*!/*/}

              {/*                                                /!*    </div>*!/*/}
              {/*                                                /!*    /!*<div>*!/*!/*/}
              {/*                                                /!*    /!*    <p style={{fontSize: '15px'}}>{chatList.message}</p>*!/*!/*/}

              {/*                                                /!*    /!*</div>*!/*!/*/}
              {/*                                                /!*    /!*<div>*!/*!/*/}
              {/*                                                /!*    /!*     <p style={{fontSize:'12px'}}>{chatList.status}</p>*!/*!/*/}

              {/*                                                /!*    /!*</div>*!/*!/*/}
              {/*                                                /!*    /!*<Image src="holder.js/171x180" roundedCircle />*!/*!/*/}
              {/*                                                /!*</Col>*!/*/}
              {/*                                            </Row>*/}
              {/*                                        </Card.Body>*/}
              {/*                                    </Card>*/}
              {/*                            </>*/}
              {/*                        )*/}
              {/*                    })*/}
              {/*                    }*/}
              {/*                </div>*/}
              {/*             </Col>*/}
              {/*        </>:*/}
              {/*        <>*/}

              {/*        </>*/}
              {/*}*/}
        </>
    )
}
export default AdminLiveSearch