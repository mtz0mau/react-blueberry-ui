import { FileTypeEnumToLabel } from "enums/FileTypeEnum";

export const getFormatType = (fileType: string) => {
  return FileTypeEnumToLabel[fileType] || 'Desconocido';
};

export const getMBSize = (size: number): string => {
  return `${(size / (1024 * 1024)).toFixed(2)} MB`;
};

export const urlToFile = async (url: string, filename: string): Promise<File> => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], filename);
};

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const fileToBlob = (file: File): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(new Blob([reader.result as ArrayBuffer]));
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
};

export const downloadByUrl = async (url: string, filename: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("No se pudo descargar el archivo");

    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = filename;

    a.dispatchEvent(new MouseEvent("click"));

    setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
  } catch (error) {
    console.error("Error al descargar el archivo:", error);
  }
};


