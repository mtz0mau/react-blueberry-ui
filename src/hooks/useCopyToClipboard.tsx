import { useCallback } from "react";
import { copyToClipboard } from "utils/Text.utils";
import { useAlert } from "components/Alert/hooks/useAlert";

export const useCopyToClipboard = (defaultValue?: string) => {
  const alert = useAlert();

  const copy = useCallback((otherValue?: string) => {
    const valueToCopy = otherValue ?? defaultValue;

    copyToClipboard(valueToCopy);

    alert.notificationSuccess('Texto copiado al portapapeles');
  }, [defaultValue]);

  return copy;
};
