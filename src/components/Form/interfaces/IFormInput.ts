import { ISelectOption } from "components/Form/interfaces/ISelectOption";
import { InputTypes } from "components/Form/types/InputTypes";
import { FormInputTypes } from "components/Form/types/FormInputTypes";

export interface IFormInput {
  name: string;
  label: string;
  placeholder?: string;
  colSpan?: number;
  showIcon?: boolean;
  inputType?: InputTypes;
  className?: string;
  type?: FormInputTypes;
  isRequired?: boolean;
  isDisabled?: boolean;
  isMulti?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  isLoading?: boolean;
  options?: ISelectOption[];
  breakpoints?: { sm?: number; md?: number; lg?: number; xl?: number };
  spanComponent?: React.ReactNode;
  icon?: React.ReactNode;
}
