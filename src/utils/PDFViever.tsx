import React from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

interface IPDFViewerProps {
  fileUrl: string;
}

export const PDFViewer: React.FC<IPDFViewerProps> = ({ fileUrl }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  return (
    <main style={{ height: "85vh", marginBottom: 30 }}>
      <Worker workerUrl={fileUrl}>
        <Viewer
          fileUrl={fileUrl}
          plugins={[defaultLayoutPluginInstance]}
          defaultScale={1}
        />
      </Worker>
    </main>
  );
};
