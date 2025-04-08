import { Select as AntdSelect } from 'antd';
import { ISelectOption } from "components/Form/interfaces/ISelectOption";
import { Label } from "components/Form/components/Label";
import { ErrorMessage } from "components/Form/components/ErrorMessage";
import { isArray } from "lodash";

interface Props {
  name?: string;
  onChange?: (value: string) => void;
  initialValue?: string;
  value?: string;
  options: ISelectOption[];
  placeholder?: string;
  error?: string;
  label?: string;
  isDisabled?: boolean;
  className?: string;
  labelClassName?: string;
  style?: any;
  isClearable?: boolean;
  isMulti?: boolean;
  spanComponent?: React.ReactNode;
}

export const Select = ({
  name,
  onChange = () => {
  },
  initialValue,
  value,
  options,
  placeholder = '---',
  error,
  label,
  isDisabled,
  className,
  labelClassName,
  style,
  isClearable = true,
  isMulti = false,
  spanComponent
}: Props) => {
  return (
    <div className={className} style={style}>
      <div className={'flex justify-between items-center'}>
        {label && (
          <Label htmlFor={name} className={labelClassName}>
            {label}
          </Label>
        )}

        {spanComponent && (
          <div>
            {spanComponent}
          </div>
        )}
      </div>
      <AntdSelect
        onChange={(value) => onChange(value)}
        optionFilterProp={'label'}
        showSearch
        placeholder={placeholder}
        disabled={isDisabled}
        value={value || initialValue}
        options={options}
        allowClear={isClearable}
        style={{ width: '100%', height: isMulti ? isArray(initialValue) && initialValue?.length === 0 ? '40px' :  'auto' : '40px' }}
        {...(isMulti && { mode: 'multiple' })}
      />
      {error && (
        <ErrorMessage message={error}/>
      )}
    </div>
  );
};
