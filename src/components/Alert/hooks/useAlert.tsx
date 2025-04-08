import { toast } from "react-toastify";
import Swal from "sweetalert2";
import colors from "tailwindcss/colors";
import { useAlertStore } from "components/Alert/stores/Alert.store";
import { useDarkMode } from "hooks/useDarkMode";

export const useAlert = () => {
  const notificationApi = useAlertStore((state) => state.notificationApi);
  const { isDarkMode } = useDarkMode();

  const notificationSuccess = (message: string) => {
    notificationApi.open({
      type: 'success',
      content: message
    });
  };

  const toastSuccess = (message: string) => {
    toast.success(message);
  };

  const toastError = (message: string) => {
    const errorMessage = message || 'Ha ocurrido un error inesperado';

    toast.error(errorMessage);
  };

  const toastWarning = (message: string) => {
    toast.warning(message);
  };

  const confirm = (title: string, text: string = '', confirmButtonText: string = 'Aceptar', denyButtonText: string = 'Cancelar') => {
    return new Promise(resolve => Swal.fire({
      title,
      text,
      showDenyButton: true,
      confirmButtonColor: colors.blue["500"],
      background: isDarkMode ? colors.zinc["900"] : colors.white,
      confirmButtonText,
      denyButtonText,
      icon: 'warning'
    }).then((result) => resolve(result.isConfirmed)));
  };

  return {
    toastSuccess,
    toastError,
    toastWarning,
    confirm,
    notificationSuccess
  };
};
