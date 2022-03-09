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
    React.useEffect(() => {
        const language = Cookies.get('lang') || 'en';
        dispatch({
            type: DispatchType.APP.LANG,
            data: language,
        });
        i18n.changeLanguage(language);
        dispatch({
            type: DispatchType.APP.PALETTE,
            data: Cookies.get('palette') || 'dark',
        });
    }, [dispatch, i18n]);
    const pageProps = {
        t,
        lang,
    };
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <div className="flex flex-col p-4 min-h-screen">
                    <HeaderBar />
                    <Switch>
                        <Route path="/create-project">
                            <CreateProjectPage {...pageProps} />
                        </Route>
                        <Route path="/project-list">
                            <ProjectList />
                        </Route>
                        <Route path="/home" exact>
                            <DashboardPage {...pageProps} />
                        </Route>
                        <Route path="/">
                            <Redirect to="/home" />
                        </Route>
                    </Switch>
                </div>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
