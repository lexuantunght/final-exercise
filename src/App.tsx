import React from 'react';
import { useTranslation } from 'react-i18next';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DispatchType } from './common/constants';
import { RootState } from './utils/redux/store';
import Cookies from 'js-cookie';
import HeaderBar from './common/components/HeaderBar';
import DashboardPage from './screens/Home';
import ProjectList from './screens/ProjectList';
import CreateProjectPage from './screens/CreateProject';
import { Toast } from 'primereact/toast';
import EditProjectPage from './screens/EditProject';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    },
  },
});

function App() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const lang = useSelector((state: RootState) => state.app.lang);
  const isError = useSelector((state: RootState) => state.app.isError);
  const pushInfo = React.useRef<any>(null);

  const changeTheme = (theme: string) => {
    const themeLink = document.getElementById('app-theme') as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = `https://unpkg.com/primereact/resources/themes/lara-${theme}-blue/theme.css`;
    }
  };

  const onChangePalette = (palette: string) => {
    if (palette === 'system') {
      const mode = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      changeTheme(mode);
    } else {
      changeTheme(palette);
    }
    dispatch({ type: DispatchType.APP.PALETTE, data: palette });
  };

  React.useLayoutEffect(() => {
    const language = Cookies.get('lang') || 'en';
    dispatch({
      type: DispatchType.APP.LANG,
      data: language,
    });
    i18n.changeLanguage(language);
    const theme = Cookies.get('palette') || 'dark';
    onChangePalette(theme);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (isError) {
      pushInfo.current.show({
        severity: 'error',
        summary: t('fail'),
        detail: isError,
        life: 3000,
      });
    }
  }, [isError]); // eslint-disable-line react-hooks/exhaustive-deps

  const pageProps = {
    t,
    lang,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="flex flex-col p-4 min-h-screen">
          <HeaderBar onChangeTheme={onChangePalette} />
          <Switch>
            <Route path="/edit-project/:projectNumber" exact>
              <EditProjectPage {...pageProps} />
            </Route>
            <Route path="/create-project" exact>
              <CreateProjectPage {...pageProps} />
            </Route>
            <Route path="/project-list" exact>
              <ProjectList />
            </Route>
            <Route path="/home" exact>
              <DashboardPage {...pageProps} />
            </Route>
            <Route path="/">
              <Redirect to="/home" />
            </Route>
          </Switch>
          <Toast
            ref={pushInfo}
            onHide={() =>
              dispatch({ type: DispatchType.APP.ERROR, data: false })
            }
            position="top-right"
          />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
