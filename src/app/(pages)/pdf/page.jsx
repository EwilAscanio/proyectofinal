"use client";
import React from "react";
import Pdf from "@/components/Pdf";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";

const PdfVistas = () => {
  return (
    <div>
      <PDFDownloadLink document={<Pdf />} fileName="archivo.pdf">
        {({ loading, error, url, blob }) =>
          loading ? (
            <button> Descargarndo Documento</button>
          ) : (
            <button> Descargar Documento </button>
          )
        }
      </PDFDownloadLink>
      <PDFViewer>
        <Pdf />
      </PDFViewer>
    </div>
  );
};

export default PdfVistas;
