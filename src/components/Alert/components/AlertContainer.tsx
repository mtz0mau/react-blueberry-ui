import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDarkMode } from "hooks/useDarkMode";
import { message } from "antd";
import { useAlertStore } from "components/Alert/stores/Alert.store";
import { useEffect } from "react";

interface Props {
  theme?: any;
}

export const AlertContainer = ({ theme }: Props) => {
  const setNotificationApi = useAlertStore((state) => state.setNotificationApi);
  const [notificationApi, contextHolder] = message.useMessage();
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    setNotificationApi(notificationApi);
  }, [notificationApi]);

  return (
    (
      <>
        {contextHolder}
        <ToastContainer className={'z-[9999999999]'} theme={theme ? theme : isDarkMode ? 'dark' : 'light'}/>
      </>
    )
  );
};
