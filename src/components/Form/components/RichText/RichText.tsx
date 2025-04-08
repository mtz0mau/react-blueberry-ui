import ReactQuill from 'react-quill';
import { useDarkMode } from "hooks/useDarkMode";
import { Label } from "components/Form/components/Label";
import { ErrorMessage } from "components/Form/components/ErrorMessage";
import { useRef } from "react";

import 'react-quill/dist/quill.snow.css';
import './css/styles.css';

interface Props {
  initialValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  label?: string;
  error?: string;
  style?: React.CSSProperties;
  isRequired?: boolean;
  isDisabled?: boolean;
  spanComponent?: React.ReactNode;
}

export const RichText = ({
  initialValue = '',
  value,
  onChange = () => {},
  error,
  label,
  style,
  className,
  isRequired = false,
  isDisabled = false,
  spanComponent
}: Props) => {
  const { isDarkMode } = useDarkMode();

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const range = quillRef.current.getEditor().getSelection();
        quillRef.current.getEditor().insertEmbed(range.index, 'image', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const quillRef = useRef<ReactQuill | null>(null);

  return (
    <div className={className} style={style}>
      <div className={'flex justify-between items-center'}>
        {label && (
          <Label>
            {label}
            {!isRequired && <span className="text-muted"></span>}
          </Label>
        )}

        {spanComponent && (
          <div>
            {spanComponent}
          </div>
        )}
      </div>
      <div className="flex gap-1 items-center relative">
        <ReactQuill
          ref={quillRef}
          theme={'snow'}
          value={value || initialValue}
          onChange={isDisabled ? () => {} : onChange}
          className={`w-full border-[1px] border-[#d9d9d9] dark:border-[#424242] rounded-lg overflow-hidden bg-white dark:bg-[#262626] ${isDarkMode ? 'ql-dark' : ''}`}
          modules={{
            toolbar: [
              [{ 'header': [] }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              ['bold', 'italic', 'underline', 'strike'],
              ['link'],
              [{ 'align': [] }],
              [{ 'color': [] }, { 'background': [] }],
              ['blockquote'],
              ['clean'],
              ['image']
            ]
          }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ position: 'absolute', top: -9999, left: -9999, opacity: 0 }}
        />
      </div>

      {error && <ErrorMessage message={error}/>}
    </div>
  );
};
