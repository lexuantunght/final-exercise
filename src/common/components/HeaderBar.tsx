import React from 'react';
import { Menubar } from 'primereact/menubar';
import { useHistory } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { SelectButton } from 'primereact/selectbutton';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../utils/redux/store';
import { DispatchType } from '../constants';
import { useTranslation } from 'react-i18next';

const HeaderBar: React.FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { i18n, t } = useTranslation();
    const palette = useSelector((state: RootState) => state.app.palette);
    const lang = useSelector((state: RootState) => state.app.lang);
    const [showSetting, setShowSetting] = React.useState(false);

    const changeTheme = (theme: string) => {
        const themeLink = document.getElementById(
            'app-theme'
        ) as HTMLLinkElement;
        if (themeLink) {
            themeLink.href = `https://unpkg.com/primereact/resources/themes/lara-${theme}-blue/theme.css`;
        }
    };

    const onClickSetting = () => {
        setShowSetting(true);
    };

    const onChangeLang = (lang: string) => {
        i18n.changeLanguage(lang);
        dispatch({ type: DispatchType.APP.LANG, data: lang });
    };

    const onChangePalette = (palette: string) => {
        if (palette === 'system') {
            const mode = window.matchMedia('(prefers-color-scheme: dark)')
                .matches
                ? 'dark'
                : 'light';
            changeTheme(mode);
        } else {
            changeTheme(palette);
        }
        dispatch({ type: DispatchType.APP.PALETTE, data: palette });
    };

    const items = [
        {
            label: t('home'),
            icon: 'pi pi-home',
            command: () => history.push('/home'),
        },
        {
            label: t('projectList'),
            icon: 'pi pi-list',
            command: () => history.push('/project-list'),
        },
        {
            label: t('create'),
            icon: 'pi pi-plus',
            command: () => history.push('/create-project'),
        },
    ];

    const themeOptions = [
        { icon: 'pi pi-moon', value: 'dark' },
        { icon: 'pi pi-sun', value: 'light' },
        { icon: 'pi pi-desktop', value: 'system' },
    ];

    return (
        <>
            <Menubar
                model={items}
                className="uppercase"
                start={
                    <img
                        src="/logo192.png"
                        height="36"
                        className="ml-2 mr-3"
                        alt="logo"
                    />
                }
                end={
                    <div className="flex items-center space-x-2 md:space-x-4">
                        <div>{`v${
                            require('../../../package.json').version
                        }`}</div>
                        <Button
                            icon="pi pi-cog"
                            className="p-button-outlined p-button-secondary p-button-sm"
                            onClick={onClickSetting}
                        />
                    </div>
                }
            />
            <Sidebar
                visible={showSetting}
                position="right"
                onHide={() => setShowSetting(false)}
            >
                <div className="mb-4 space-y-2">
                    <label htmlFor="mode">{t('theme')}</label>
                    <SelectButton
                        id="mode"
                        options={themeOptions}
                        value={palette}
                        onChange={(e) => onChangePalette(e.value)}
                        itemTemplate={(option) => (
                            <i className={option.icon}></i>
                        )}
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="lang">{t('language')}</label>
                    <SelectButton
                        id="lang"
                        className="uppercase"
                        options={['en', 'fr']}
                        value={lang}
                        onChange={(e) => onChangeLang(e.value)}
                    />
                </div>
            </Sidebar>
        </>
    );
};

export default HeaderBar;
