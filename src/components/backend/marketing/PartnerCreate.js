import React, {useEffect, useState} from "react";
import {Row, Col, Form, Button} from "react-bootstrap";
// import VendorLocationMap from "../vendor/VendorLocationMap";
import axios from "axios";
import setAuthorizationToken from "./../../../utils/setAuthorizationToken";
import showNotification from "./../includes/notification";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import Select from "react-select";
import {getPartnerListMarketing} from "../../../redux/actions/Marketing";
// import {loadPartnerList} from "../../../../../redux/actions/loadPartnerList";

const PartnerCreate = (props) => {
     const history = useHistory();
    const toggle = props.toggle;
    const dispatch = useDispatch();
    const [branches, setBranches] = useState([]);
     const [formerrors, setFormerrors ] = useState({});
     const[creatingLead,setCreatingLead]=useState(true);

    useEffect(() => {
        let marketingAdmin = JSON.parse(localStorage.getItem('marketingAdmin'));
        console.log(marketingAdmin);
        if(marketingAdmin?.token){
          setAuthorizationToken(marketingAdmin.token);
        }else{
            history.push('/marketing/login');
        }
        getBranchList()
    },[]);

    const getBranchList=()=>{
             axios.get('marketing/branch/list')
            .then((res) => {
                console.log(res);
                let branchesArr =[];
                res.data.map((data) => {
                    branchesArr.push({
                        value: data.id,
                        label: data.name,
                        name: 'associate_branch'
                    });
                })
                setBranches(branchesArr);
                // dispatch(loadPartnerList(res.data))
            })
            .catch((err) => {
                console.log(err.response.data);
            })

    }

    // const refreshTable = () => {
    //     axios.get('admin/vendor/list')
    //         .then((res) => {
    //             console.log(res);
    //             // dispatch(loadPartnerList(res.data))
    //         })
    //         .catch((err) => {
    //             console.log(err.response.data);
    //         })
    // }

    const [formField, setFormField] = useState({
        partner_name: '',
        partner_email: '',
        partner_phone: '',
        store_name:'',
        store_address:'',
        associate_branch:'',
    });

     const handleForm = event => {
        const newField = {...formField}
        newField[event.target.name] = event.target.value;
        setFormField(newField);
    }
    const selectChange = event => {
        console.log(event)
        if(event){
            const field = {...formField};
            field[event.name] = event.value;
            // if(formField.role===''){
            //     field.role = event.value;
            //
            // }
            setFormField(field);
             if ( !!formerrors[event.name] ) setFormerrors({
             ...formerrors,
             [event.name]: null
            })
        }
    }
    const getPartnerList=()=>{
            axios.get('/marketing/my/registered/leads')
            .then((res) => {
                console.log(res);

                dispatch(getPartnerListMarketing(res.data));
            })
            .catch((err) => {
                console.log(err.response.data);
            })
    }

    const submitForm = async (event) => {
         setCreatingLead(false);
         event.preventDefault();
         console.log(formField);
         await axios.post('marketing/register/lead', formField)
             .then((res) => {
                 console.log(res);
                 if(res.data.status === false){
                     showNotification('danger', res.data.message);
                       setCreatingLead(false);
                 }else{
                     getPartnerList();
                     localStorage.removeItem('vendor_location');
                     toggle(false);
                     // refreshTable();
                     showNotification('success', res.data.message);
                 }
             })
             .catch((err) => {
                 console.log(err.response.data);
             });

    }

    return (
        <>
            <Row>
                <Col lg={12}>
                    <Form onSubmit={(event) => submitForm(event)}>
                     <Form.Group className="mt-4">
                        <Form.Control type="text" name="store_name" onChange={(event) => handleForm(event)} placeholder="store name" required />
                    </Form.Group>
                    <Form.Group className="mt-4">
                        <Form.Control type="email" name="partner_email" onChange={(event) => handleForm(event)} placeholder="partner email" required />
                    </Form.Group>
                    <Form.Group className="mt-4">
                        <Form.Control type="number" name="partner_phone" onChange={(event) => handleForm(event)} placeholder="partner phone" required />
                    </Form.Group >
                        <Form.Group className="mt-4">
                        <Form.Control type="text" name="partner_name" onChange={(event) => handleForm(event)} placeholder="store owner" required />
                    </Form.Group>
                    <Form.Group className="mt-4">
                        <Form.Control type="text" name="store_address" onChange={(event) => handleForm(event)} placeholder="store address" required />
                    </Form.Group>
                    <Form.Group className="mt-4">
                                    <Form.Label className="mb-0">Branch :</Form.Label>
                                    <Select
                                          className="basic-single"
                                          classNamePrefix="select"
                                          isDisabled={false}
                                          isLoading={false}
                                          isClearable={false}
                                          isRtl={false}
                                          isSearchable={true}
                                          name="associate_branch"
                                          placeholder="== Select Branch =="
                                          options={branches}
                                          onChange={(event) => selectChange(event)}
                                        />
                    </Form.Group>
                    <Form.Group className="mt-4">
                        {creatingLead?
                            <>
                                <Button type="submit" className="customBtn" style={{float: 'right'}}>Create</Button>

                            </>:
                            <>
                                <Button  className="customBtn" style={{float: 'right'}}>Creating...</Button>

                            </>
                        }
                        <Button className="customBtn" style={{float: 'right', marginRight: '10px'}} onClick={() => toggle(false)}>Close</Button>
                    </Form.Group>


                </Form>
                </Col>
            </Row>
        </>
    )
}

export default PartnerCreate;