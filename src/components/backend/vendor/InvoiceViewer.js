// Core viewer
import { Viewer, SpecialZoomLevel, Worker } from '@react-pdf-viewer/core';

// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import setAuthorizationToken from "../../../utils/setAuthorizationToken";

const InvoiceViewer = () => {

    const {invoiceId} = useParams();
    const [pdfUrl, setPdfUrl] = useState('');

    useEffect(() => {
        let vendorDetail = JSON.parse(localStorage.getItem('vendorDetail'));
        if(vendorDetail){
          setAuthorizationToken(vendorDetail.token);
        }
        if(invoiceId && invoiceId !== ''){
            requestFileUrl(invoiceId)
        }
    }, [invoiceId])

    const requestFileUrl = async (invoice_id) => {
          let vendorDetail = JSON.parse(localStorage.getItem('vendorDetail'));
        if(vendorDetail){
            const res = await axios.get(`/partner/view/invoice/${invoice_id}`, {
            headers: {
                        'Authorization': `Bearer ${vendorDetail.token}`
                }
        }).catch((err) => {
                console.log(err)
            })
        setPdfUrl(await res.data)        }
    }

  const defaultLayoutPluginInstance = defaultLayoutPlugin();
    return(
        <>
            {
                pdfUrl && pdfUrl !== '' ? (
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.9.359/build/pdf.worker.js">
                <div
                    style={{
                        height: '70vh',
                        width: 'auto',
                        marginLeft: 'auto',
                        marginTop:'50px',
                        marginRight: 'auto',
                    }}
                >
                    <Viewer
                        fileUrl={pdfUrl}
                        plugins={[defaultLayoutPluginInstance]}
                    />
                </div>
        </Worker>
                ): (
                    <>
                    <h5>Loading..</h5>
                    </>
                )
            }
        </>
    )
}

export default InvoiceViewer;