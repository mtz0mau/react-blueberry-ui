export const capitalize = (word: string): string => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

export const getFirstCharacters = (text: string, length: number = 1): string => {
  return text?.slice(0, length).toUpperCase();
};

export const capitalizeWords = (sentence: string): string => {
  if (!sentence) return '';

  return sentence
    .split(' ')
    .map((word) => capitalize(word))
    .join(' ');
};

export const lowerCaseWords = (sentence: string): string => {
  if (!sentence) return '';

  return sentence
    .split(' ')
    .map((word) => word.toLowerCase())
    .join(' ');
};

export const getPhoneFormat = (phone: string): string => {
  return phone?.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '($1) $2 $3 $4');
};

export const copyToClipboard = (value: string): void => {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(value);
  } else {
    const textArea = document.createElement("textarea");
    textArea.value = value;
    textArea.style.position = "fixed";
    textArea.style.top = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand("copy");
    document.body.removeChild(textArea);
  }
};

export const getInitials = (name: string): string => {
  if (!name) return '';
  const words = name.split(' ');
  return words.map((word) => word.charAt(0).toUpperCase()).join('');
};
