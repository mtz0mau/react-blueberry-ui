import { ConfigProvider, theme } from 'antd';
import esES from 'antd/locale/es_ES';
import { Router } from 'components/Router';
import { useDarkMode } from 'hooks/useDarkMode';
import { IRouterProps } from 'components/Router/Router';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { Outlet } from 'react-router-dom';
import { SupabaseContext } from 'components/Supabase/context/SupabaseContext';

interface Props extends IRouterProps {
  colorPrimary?: string;
  supabaseKey: string;
  supabaseUrl: string;
}

export const SharedContext = ({
  configRoutes = [],
  baseLayout = Outlet,
  colorPrimary,
  notFoundElement,
  supabaseUrl,
  supabaseKey,
}: Props) => {
  const { isDarkMode } = useDarkMode();

  dayjs.extend(localizedFormat);

  if (!supabaseUrl || !supabaseKey)
    return (
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: colorPrimary || theme.defaultConfig.token.colorPrimary,
          },
          algorithm: !isDarkMode ? theme.defaultAlgorithm : theme.darkAlgorithm,
        }}
        locale={esES}>
        <Router
          baseLayout={baseLayout}
          configRoutes={configRoutes}
          notFoundElement={notFoundElement}
        />
      </ConfigProvider>
    );

  return (
    <SupabaseContext supabaseUrl={supabaseUrl} supabaseKey={supabaseKey}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: colorPrimary || theme.defaultConfig.token.colorPrimary,
          },
          algorithm: !isDarkMode ? theme.defaultAlgorithm : theme.darkAlgorithm,
        }}
        locale={esES}>
        <Router
          baseLayout={baseLayout}
          configRoutes={configRoutes}
          notFoundElement={notFoundElement}
        />
      </ConfigProvider>
    </SupabaseContext>
  );
};
