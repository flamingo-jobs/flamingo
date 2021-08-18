import React, { Fragment } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import InvoiceMain from "./components/InvoiceMain";

const Invoice = ({ invoice }) => (
  <Fragment>
    <PDFViewer width="100%" height="600" className="app">
      <InvoiceMain invoice={invoice} />
    </PDFViewer>
  </Fragment>
);

export default Invoice;
