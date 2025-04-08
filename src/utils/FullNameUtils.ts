import { IFullName } from "interfaces/IFullName";
import { capitalizeWords } from "utils/Text.utils";

export const getFullName = (nameObj: IFullName) => {
  if (!nameObj) return '';

  const fullName = `${nameObj.name} ${nameObj.firstLastName || ''} ${nameObj.secondLastName || ''}`;

  return capitalizeWords(fullName);
};
