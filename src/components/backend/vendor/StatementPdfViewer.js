import React from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import document from "../../../assets/document.pdf";

const StatementPdfViewer=(props)=>{
     const defaultLayoutPluginInstance = defaultLayoutPlugin();
    return(
        <>
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
                        fileUrl='https://jawaikhana.techxbay.com/paymentStatements/6/STATEMENT-1.pdf'
                        plugins={[defaultLayoutPluginInstance]}
                    />
                </div>
        </Worker>
        </>
    )
}
export default StatementPdfViewer