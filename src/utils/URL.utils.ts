import CryptoJS from "crypto-js";

export const encodeUrl = (baseUrl: string, secretKey: string, data: Record<string, any>): string => {
  const jsonString = JSON.stringify(data);
  const encrypted = CryptoJS.AES.encrypt(jsonString, secretKey).toString();

  return `${baseUrl}?data=${encodeURIComponent(encrypted)}`;
};

export const decodeUrl = (secretKey: string, encodedUrl: string): Record<string, any> => {
  const urlParams = new URLSearchParams(encodedUrl.split('?')[1]);

  if (!urlParams.has('data')) return null;

  const encrypted = urlParams.get('data');
  if (!encrypted) {
    throw new Error("No data found in the URL");
  }
  const decryptedBytes = CryptoJS.AES.decrypt(decodeURIComponent(encrypted), secretKey);
  const decrypted = decryptedBytes.toString(CryptoJS.enc.Utf8);

  return JSON.parse(decrypted || '{}');
};

export const sharedToWhatsApp = (message: string, phone: string) => {
  window.open(`https://wa.me/?text=${encodeURIComponent(message)}&phone=+52${phone}`, '_blank');
};
