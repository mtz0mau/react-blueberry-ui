import { useCallback } from "react";
import { toPng } from "html-to-image";
import ReactDOMServer from "react-dom/server";

interface Props {
  filename?: string;
}

const createContainer = (contentHTML: string): HTMLDivElement => {
  const container = document.createElement("div");
  container.style.width = "fit-content";
  container.style.position = "fixed";
  container.style.zIndex = "-99999";
  container.innerHTML = contentHTML;
  document.body.appendChild(container);
  return container;
};

export const useExportToImage = ({ filename = "image.png" }: Props = {}) => {
  const downloadImage = useCallback(async (content: React.ReactNode, otherFileName?: string) => {
    const contentHTML = ReactDOMServer.renderToStaticMarkup(content);
    const container = createContainer(contentHTML);

    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      const dataUrl = await toPng(container, { quality: 0.95 });
      document.body.removeChild(container);

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = otherFileName || filename;
      link.click();
    } catch (error) {
      console.error("Error exportando la imagen:", error);
      document.body.removeChild(container);
    }
  }, []);

  const getFile = useCallback(async (content: React.ReactNode, otherFileName?: string): Promise<File> => {
    const contentHTML = ReactDOMServer.renderToStaticMarkup(content);
    const container = createContainer(contentHTML);

    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      const dataUrl = await toPng(container, { quality: 0.95 });
      document.body.removeChild(container);

      const response = await fetch(dataUrl);
      const blob = await response.blob();

      return new File([blob], otherFileName || filename, { type: "image/png" });
    } catch (error) {
      console.error("Error exportando la imagen:", error);
      document.body.removeChild(container);
      throw error;
    }
  }, []);

  return { downloadImage, getFile };
};
