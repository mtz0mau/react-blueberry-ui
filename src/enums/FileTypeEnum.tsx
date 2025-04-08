import {
  FilePdfOutlined,
  FileWordOutlined,
  FileExcelOutlined,
  FileImageOutlined,
  FileUnknownOutlined,
  FileTextOutlined
} from '@ant-design/icons';

export enum FileTypeEnum {
  PDF = 'application/pdf',
  DOC = 'application/msword',
  DOCX = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  TXT = 'text/plain',
  XLS = 'application/vnd.ms-excel',
  XLSX = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  JPG = 'image/jpeg',
  PNG = 'image/png',
  GIF = 'image/gif',
  SVG = 'image/svg+xml',
  WEBP = 'image/webp',
  UNKNOWN = 'unknown'
}

export const FileTypeValueToEnum = {
  'application/pdf': FileTypeEnum.PDF,
  'application/msword': FileTypeEnum.DOC,
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': FileTypeEnum.DOCX,
  'text/plain': FileTypeEnum.TXT,
  'application/vnd.ms-excel': FileTypeEnum.XLS,
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': FileTypeEnum.XLSX,
  'image/jpeg': FileTypeEnum.JPG,
  'image/png': FileTypeEnum.PNG,
  'image/gif': FileTypeEnum.GIF,
  'image/svg+xml': FileTypeEnum.SVG,
  'image/webp': FileTypeEnum.WEBP,
  'unknown': FileTypeEnum.UNKNOWN
};

export const FileTypeEnumToLabel = {
  [FileTypeEnum.PDF]: 'PDF',
  [FileTypeEnum.DOC]: 'Documento de texto',
  [FileTypeEnum.DOCX]: 'Documento de texto',
  [FileTypeEnum.TXT]: 'Archivo de texto',
  [FileTypeEnum.XLS]: 'Hoja de cálculo',
  [FileTypeEnum.XLSX]: 'Hoja de cálculo',
  [FileTypeEnum.JPG]: 'Imagen',
  [FileTypeEnum.PNG]: 'Imagen',
  [FileTypeEnum.GIF]: 'Imagen',
  [FileTypeEnum.SVG]: 'Imagen',
  [FileTypeEnum.WEBP]: 'Imagen',
  [FileTypeEnum.UNKNOWN]: 'Desconocido'
};

export const FileTypeEnumToColor = {
  [FileTypeEnum.PDF]: '#ff0000',
  [FileTypeEnum.DOC]: '#2b579a',
  [FileTypeEnum.DOCX]: '#2b579a',
  [FileTypeEnum.TXT]: '#333333',
  [FileTypeEnum.XLS]: '#217346',
  [FileTypeEnum.XLSX]: '#217346',
  [FileTypeEnum.JPG]: '#5a0cb9',
  [FileTypeEnum.PNG]: '#5a0cb9',
  [FileTypeEnum.GIF]: '#5a0cb9',
  [FileTypeEnum.SVG]: '#5a0cb9',
  [FileTypeEnum.WEBP]: '#5a0cb9',
  [FileTypeEnum.UNKNOWN]: '#8c8c8c'
};

export const FileTypeEnumToIcon = {
  [FileTypeEnum.PDF]: <FilePdfOutlined/>,
  [FileTypeEnum.DOC]: <FileWordOutlined/>,
  [FileTypeEnum.DOCX]: <FileWordOutlined/>,
  [FileTypeEnum.TXT]: <FileTextOutlined/>,
  [FileTypeEnum.XLS]: <FileExcelOutlined/>,
  [FileTypeEnum.XLSX]: <FileExcelOutlined/>,
  [FileTypeEnum.JPG]: <FileImageOutlined/>,
  [FileTypeEnum.PNG]: <FileImageOutlined/>,
  [FileTypeEnum.GIF]: <FileImageOutlined/>,
  [FileTypeEnum.SVG]: <FileImageOutlined/>,
  [FileTypeEnum.WEBP]: <FileImageOutlined/>,
  [FileTypeEnum.UNKNOWN]: <FileUnknownOutlined/>
};
