import { useCallback } from "react";
import generatePDF, { Resolution, usePDF } from "react-to-pdf";
import ReactDOMServer from "react-dom/server";

interface Props {
  filename?: string;
  margin?: number;
}

const createContainer = (contentHTML: string, margin: number): HTMLDivElement => {
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.top = "-9999px";
  container.style.fontSize = "12pt";
  container.style.fontFamily = "Arial";
  container.style.width = 215.9 - (margin * 2) + "mm";
  container.style.background = "white";
  container.innerHTML = contentHTML;
  document.body.appendChild(container);

  return container;
};

export const useExportToPDF = ({ filename = 'document.pdf', margin = 25 }: Props = {}) => {
  const { toPDF, targetRef } = usePDF({ filename, method: 'save' });

  const downloadPDF = useCallback((content: React.ReactNode, otherFileName?: string) => {
    const contentHTML = ReactDOMServer.renderToStaticMarkup(content);
    const container = createContainer(contentHTML, margin);

    targetRef.current = container;

    generatePDF(targetRef, {
      filename: otherFileName || filename,
      method: 'save',
      page: {
        format: 'letter',
        margin
      },
      resolution: Resolution.NORMAL
    });

    setTimeout(() => {
      document.body.removeChild(container);
    }, 500);
  }, [toPDF]);

  const getFile = useCallback(async (content: React.ReactNode, otherFileName?: string): Promise<File> => {
    const contentHTML = ReactDOMServer.renderToStaticMarkup(content);
    const container = createContainer(contentHTML, margin);

    targetRef.current = container;

    const pdf = await generatePDF(targetRef, {
      filename: otherFileName || filename,
      method: 'build',
      page: {
        format: 'letter',
        margin
      },
      resolution: Resolution.NORMAL
    });

    setTimeout(() => {
      document.body.removeChild(container);
    }, 500);

    const blob = pdf.output('blob');
    return new File([blob], (otherFileName || filename), { type: 'application/pdf' });
  }, []);

  return { downloadPDF, getFile };
};
