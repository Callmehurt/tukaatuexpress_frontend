import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import axios from "axios";
import {Image} from 'react-bootstrap';
import {MdDelete} from 'react-icons/md';

import Avatar from "react-avatar";
import {getPartnerListMarketing} from "../../../redux/actions/Marketing";
import {ImLocation2} from "react-icons/im";
import MUIDataTable from "mui-datatables";
import {getBannerListMarketing} from './../../../redux/actions/Marketing'
import showNotification from "../includes/notification";

const BannerDatatables=()=>{
     const history = useHistory();
     const dispatch = useDispatch();
     const marketingStore = useSelector((state) => state.marketing);
      const appSetting = useSelector((state) => state.appSetting);
      const urlDomain=appSetting.urlDomain;
     const marketingBannerList = marketingStore.marketingBannerList;
     useEffect(() => {
        let marketingAdmin = JSON.parse(localStorage.getItem('marketingAdmin'));
        console.log(marketingAdmin);
        if(marketingAdmin?.token){
          setAuthorizationToken(marketingAdmin.token);
        }else{
            history.push('/marketing/login');
        }
        getBannerList();
    },[]);
     const deleteBanner=(banner_id)=>{
         axios.delete(`/marketing/remove/banner/${banner_id}`)
            .then((res) => {
                console.log(res);
                if(res.data.status === false){
                     showNotification('danger', res.data.message);
                 }else{
                     showNotification('success', res.data.message);
                }
                // dispatch(getBannerListMarketing(res.data));
                getBannerList();
            })
            .catch((err) => {
                console.log(err.response.data);
            })
     }
     const getBannerList=()=>{
            axios.get('/marketing/list/banners')
            .then((res) => {
                console.log(res);
                dispatch(getBannerListMarketing(res.data));
            })
            .catch((err) => {
                console.log(err.response.data);
            })
    }
     const columns = [
         {
            name: 'id',
            label: 'S.No.',
            options: {
                filter: true,
                sort: true,
            }
         },
        {
         name: "banner",
         label: "Image",
         options: {
          filter: false,
          sort: false,
             customBodyRender: (value, tableMeta, updateValue) => {
                 return(
                     <>
                         {/*<Avatar variant="rounded" src={urlDomain+value} >*/}
                         {/*</Avatar>*/}
                         <div style={{width: '100%', display: 'flex', placeContent: 'start'}} style={{cursor: 'pointer'}}>
                              <Image src={urlDomain+value} style={{display: 'flex!important',height:'80px'}} className='img-fluid'
                                 alt="image banner"/>
                         </div>
                     </>
                 )
                 // <>
                 //     {/*<Avatar variant="rounded" src={value} >*/}
                 //     {/*</Avatar>*/}
                 //     {/*<imageDisplay value={value} />*/}
                 //     <div style={{width: '100%', display: 'flex', placeContent: 'start'}} style={{cursor: 'pointer'}}>
                 //         <Image src={value} style={{display: 'flex!important'}} className='img-fluid'
                 //                alt="image banner"/>
                 //     </div>
                 // </>
             }
         }
        },
         {
         name: "description",
         label: "Description",
         options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => (
                  <>
                      <div style={{width:'100%',display:'flex',placeContent:'start'}}>{value}</div>
                  </>
              )
         }
        },
        {
            name: 'id',
            label: 'Actions',
            options: {
              filter: false,
              sort: false,
              customBodyRender: (value, tableMeta, updateValue) => (
                  <>
                      <div style={{width:'100%',display:'flex'}}>

                          <div style={{width:'50%',}}>
                                <button className="deleteBtn" onClick={(event)=>deleteBanner(value)} ><MdDelete /></button>
                          </div>
                      </div>
                  </>
              )
            }
        },

       ];

     const options = {
        searchOpen: false,
        filterType: 'textField',
        rowsPerPage: 50,
        rowsPerPageOptions: [10, 20, 50, 100, 500],
        fixedHeader: false,
        selectableRows: 'none',
        responsive: 'standard',
  }

    return(
        <>

             <MUIDataTable
                data={marketingBannerList}
                columns={columns}
                options={options}
            />
            </>

    )
}
export default BannerDatatables