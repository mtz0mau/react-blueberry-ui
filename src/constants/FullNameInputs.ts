import { IFormInput } from "components/Form/interfaces/IFormInput";

export const FullNameInputs: IFormInput[] = [
  {
    label: 'Nombre(s)',
    placeholder: 'Ingresa el nombre del paciente...',
    name: 'name',
    isRequired: true,
    colSpan: 12,
    breakpoints: {
      md: 4
    }
  },
  {
    label: 'Primer Apellido',
    placeholder: 'Ingresa el apellido paterno del paciente...',
    name: 'firstLastName',
    isRequired: true,
    colSpan: 6,
    breakpoints: {
      md: 4
    }
  },
  {
    label: 'Segundo Apellido',
    placeholder: 'Ingresa el apellido materno del paciente...',
    name: 'secondLastName',
    colSpan: 6,
    breakpoints: {
      md: 4
    }
  }
];
